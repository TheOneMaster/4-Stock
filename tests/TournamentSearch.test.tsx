import React from "react"
import { fireEvent, render } from "@testing-library/react-native"

import TournamentList from "../src/MainScreen/Tournament Search"
import TournamentCard from "../src/MainScreen/Tournament Search/TournamentCard"


import mockTournamentData from "./tournamentData.json"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

jest.mock("../src/gql/gql", () => {
    return {
        __esModule: true,
        useInfiniteTournamentListDataQuery: () => jest.fn().mockReturnValue({
            data: {
                pages: [{
                    tournaments: {
                        nodes: [mockTournamentData]
                    }
                }]
            }
        })
    }
})

import { useInfiniteTournamentListDataQuery } from "../src/gql/gql"


describe("Tournament search page", () => {



    // jest.mocked(useInfiniteTournamentListDataQuery);

    it("Tournament Card navigates to tournament page", () => {
        const navigation = { push: () => { } };
        jest.spyOn(navigation, "push");

        const tournamentCard = render(<TournamentCard {...mockTournamentData} navigation={navigation} />);
        const touchableCard = tournamentCard.getByTestId("touchableTournamentCard");

        fireEvent.press(touchableCard);
        expect(navigation.push).toHaveBeenCalledWith("Tournament", { id: mockTournamentData.id });
    });


    it("Tournament search filters", () => {

        const queryClient = new QueryClient();
        const searchPage = render(
            <QueryClientProvider client={queryClient}>
                <TournamentList />
            </QueryClientProvider>
        );
        const filterSheet = searchPage.getByTestId("filterBottomSheet");

        // Filter items
        const afterDate = searchPage.getByTestId("afterDateFilter");
        const beforeDate = searchPage.getByTestId("beforeDateFilter");
        const past = searchPage.getByTestId("pastTournamentFilter");
        const online = searchPage.getByTestId("onlineTournamentFilter");
        const open = searchPage.getByTestId("openTournamentFilter");

        expect(filterSheet).toContainElement(afterDate);
        expect(filterSheet).toContainElement(beforeDate);
        expect(filterSheet).toContainElement(past);
        expect(filterSheet).toContainElement(online);
        expect(filterSheet).toContainElement(open);
    })


})
