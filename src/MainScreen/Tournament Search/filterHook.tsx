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
    const [past, setPast] = useState(false);
    const [online, setOnline] = useState(false);
    const [regOpen, setRegOpen] = useState<true | null>(null);

    useEffect(() => {

        console.log(mainGame);

        if (games.length > 0 && mainGame === null) {
            setGames([]);
            return
        }

        const gameInFilters = games.some(game => game.value === mainGame?.value);
        if (mainGame !== null && !gameInFilters) setGames([mainGame]);
        
    }, [mainGame])

    return {
        filters: { name, games, afterDate, beforeDate, past, online, regOpen, page },
        setFilters: { setName, setGames, setAfterDate, setBeforeDate, setPast, setOnline, setRegOpen }
    }
}

type TournamentSearchFilters = ReturnType<typeof useFilter>['filters']

export function convertStorageToAPI(filters: TournamentSearchFilters): TournamentListDataQueryVariables {
    const { name, games, afterDate, beforeDate, page, past, online, regOpen } = filters;

    return {
        name,
        videogameIds: games.map(game => game.value.toString()),
        afterDate: afterDate ? convertDateToUnixSeconds(afterDate) : afterDate,
        beforeDate: beforeDate ? convertDateToUnixSeconds(beforeDate) : beforeDate,
        past,
        online,
        regOpen,
        page
    }
}
