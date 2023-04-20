import { addMonths, subYears } from "date-fns";
import { after } from "node:test";
import { useEffect, useState } from "react";

import { convertDateToUnixSeconds } from "../../helper";
import { useSettings } from "../Settings";

export function useFilter() {

    const settings = useSettings();
    const { debug, mainGame } = settings.general

    const [name, setName] = useState(debug ? "Genesis" : "");

    const [page, setPage] = useState(1);
    const [afterDate, setAfterDate] = useState<Date | undefined>(undefined);
    const [beforeDate, setBeforeDate] = useState<Date | undefined>(addMonths(new Date, 1));

    useEffect(() => {
        if (debug) setName("Genesis");
        else setName("");
    }, [debug])



    return {
        filters: {
            name: name,
            videogameIds: mainGame ? [mainGame.value.toString()] : [],
            afterDate: afterDate ? convertDateToUnixSeconds(afterDate) : afterDate,
            beforeDate: beforeDate ? convertDateToUnixSeconds(beforeDate) : beforeDate,
            page: page
        },
        setFilters: {
            setName, setAfterDate, setBeforeDate
        }
    }

}
