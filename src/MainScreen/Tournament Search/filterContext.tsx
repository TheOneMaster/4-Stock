import React, { createContext, useContext, useEffect, useState } from "react";
import { addMonths } from "date-fns";

import { TournamentListDataQueryVariables } from "../../gql/gql";

import { DropdownOption } from "../../Shared/types";
import { convertDateToUnixSeconds } from "../../helper";
import { useSettings } from "../../Context";

interface SearchFilterType {
    name: string
    afterDate?: Date
    beforeDate?: Date
    games: DropdownOption[]
    past: boolean
    online: boolean
    regOpen: true | null
    page: number
}

interface FilterContextType {
    filters: SearchFilterType,
    updateFilter: <Key extends keyof SearchFilterType>(key: Key, value: SearchFilterType[Key]) => void
}

interface FilterProviderProps {
    children: React.ReactNode
}

export const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider(props: FilterProviderProps) {

    const { settings } = useSettings();
    const [filters, setFilters] = useState<SearchFilterType>({
        name: "",
        games: settings.mainGame ? [settings.mainGame] : [],
        beforeDate: addMonths(new Date(), 1),
        past: false,
        online: false,
        regOpen: null,
        page: 1
    });

    useEffect(() => {
        setFilters((prevFilter) => {
            const newFilters = Object.assign({}, prevFilter);

            if (settings.mainGame) {
                newFilters.games = [settings.mainGame]
            } else {
                newFilters.games = []
            }

            return newFilters
        })
    }, [settings.mainGame])


    function updateFilter<Key extends keyof SearchFilterType>(key: Key, value: SearchFilterType[Key]) {
        setFilters((prevFilters) => {
            const newFilters = Object.assign({}, prevFilters);
            newFilters[key] = value;
            return newFilters
        })
    }

    return (
        <FilterContext.Provider value={{ filters: filters, updateFilter }}>
            {props.children}
        </FilterContext.Provider>
    )
}

export function useFilters() {

    const filterValues = useContext(FilterContext);

    if (!filterValues) {
        throw new Error("No filters provided")
    }

    return filterValues
}

export function convertFiltersForAPI(filters: SearchFilterType): TournamentListDataQueryVariables {
    return {
        name: filters.name,
        afterDate: filters.afterDate ? convertDateToUnixSeconds(filters.afterDate) : filters.afterDate,
        beforeDate: filters.beforeDate ? convertDateToUnixSeconds(filters.beforeDate) : filters.beforeDate,
        videogameIds: filters.games.map(game => game.value.toString()),
        online: filters.online,
        past: filters.past,
        regOpen: filters.regOpen,
        page: filters.page
    }
}
