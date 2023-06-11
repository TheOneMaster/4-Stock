import React, { createContext, useContext, useEffect, useState } from "react";
import { DropdownOption } from "../../Shared/types";
import { useSettings } from "../Settings";
import { TournamentListDataQueryVariables } from "../../gql/gql";
import { convertDateToUnixSeconds } from "../../helper";
import { addMonths } from "date-fns";

interface SearchFilterType {
    name: string
    afterDate?: Date
    beforeDate?: Date
    games: DropdownOption[]
    past: boolean
    online: boolean
    regOpen: true|null
    page: number
} 

interface FilterContextType {
    filters: SearchFilterType,
    updateFilter: <Key extends keyof SearchFilterType>(key: Key, value: SearchFilterType[Key]) => void
}

interface FilterProviderProps {
    children: React.ReactNode
}

export const FilterContext = createContext<FilterContextType|null>(null);

export function FilterProvider(props: FilterProviderProps) {

    const {general} = useSettings()
    const {mainGame} = general


    const [filters, setFilters] = useState<SearchFilterType>({
        name: "",
        games: mainGame ? [mainGame] : [],
        beforeDate: addMonths(new Date(), 1),
        past: false,
        online: false,
        regOpen: null,
        page: 1
    });

    useEffect(() => {
        setFilters((prevFilter) => {
            const newFilters = Object.assign({}, prevFilter);

            if (mainGame) {
                newFilters.games = [mainGame]
            } else {
                newFilters.games = []
            }

            return newFilters
        })
    }, [mainGame])


    function updateFilter<Key extends keyof SearchFilterType>(key: Key, value: SearchFilterType[Key]) {
        setFilters((prevFilters) => {
            const newFilters = Object.assign({}, prevFilters);
            newFilters[key] = value;
            return newFilters
        })
    }

    return (
        <FilterContext.Provider value={{filters: filters, updateFilter}}>
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
