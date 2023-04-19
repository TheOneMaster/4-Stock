import { addMonths, subYears } from "date-fns";
import { useEffect, useState } from "react";

import { convertDateToUnixSeconds } from "../../helper";
import { useSettings } from "../Settings";

export function useFilter() {

    const settings = useSettings();
    const { debug, mainGame } = settings.general

    const [name, setName] = useState(debug ? "Genesis" : "");

    const [page, setPage] = useState(1);
    const [afterDate, setAfterDate] = useState(subYears(new Date, 1));
    const [beforeDate, setBeforeDate] = useState(addMonths(new Date, 1));

    useEffect(() => {
        if (debug) setName("Genesis");
        else setName("");
    }, [debug])



    return {
        filters: {
            name: name,
            videogameIds: mainGame ? [mainGame.value.toString()] : [],
            afterDate: convertDateToUnixSeconds(afterDate),
            beforeDate: convertDateToUnixSeconds(beforeDate),
            page: page
        },
        setFilters: {
            setName, setAfterDate, setBeforeDate
        }
    }

}
