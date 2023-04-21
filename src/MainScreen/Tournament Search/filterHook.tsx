import { addMonths } from "date-fns";
import { useEffect, useState } from "react";

import { TournamentListDataQueryVariables } from "../../gql/gql";
import { convertDateToUnixSeconds } from "../../helper";
import { DropdownOption } from "../../Shared/types";
import { useSettings } from "../Settings";

export function useFilter() {
    const settings = useSettings();
    const { mainGame } = settings.general;

    const initGame = mainGame ? [mainGame] : []

    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [afterDate, setAfterDate] = useState<Date | undefined>(undefined);
    const [beforeDate, setBeforeDate] = useState<Date | undefined>(addMonths(new Date, 1));
    const [games, setGames] = useState<DropdownOption[]>(initGame)
    const [past, setPast] = useState<boolean | null>(null);

    useEffect(() => {
        if (mainGame) {
            setGames([mainGame])
        }
    }, [mainGame])

    return {
        filters: { name, games, afterDate, beforeDate, past, page },
        setFilters: { setName, setGames, setAfterDate, setBeforeDate, setPast }
    }
}

type TournamentSearchFilters = ReturnType<typeof useFilter>['filters']

export function convertStorageToAPI(filters: TournamentSearchFilters): TournamentListDataQueryVariables {
    const { name, games, afterDate, beforeDate, page, past } = filters;

    return {
        name,
        videogameIds: games.map(game => game.value.toString()),
        afterDate: afterDate ? convertDateToUnixSeconds(afterDate) : afterDate,
        beforeDate: beforeDate ? convertDateToUnixSeconds(beforeDate) : beforeDate,
        past,
        page
    }
}
