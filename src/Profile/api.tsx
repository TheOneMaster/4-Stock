import { Text } from "react-native";
import { UserDetailsQuery } from "../gql/gql";

import { getNumberOrdinal, truthyFilter } from "../helper";
import { getImageByType } from "../Shared/APIConverters";
import { CarouselDataItem } from "../Shared/DetailsCarousel/types";
import { MainText } from "../Shared/ThemedText";

type UserDetails = Exclude<UserDetailsQuery['user'], null>;

type NodeArray<Type extends { nodes: any[] | null } | null> = Exclude<Exclude<Type, null>['nodes'], null>

type Events = NodeArray<UserDetails['events']>
type Tournaments = NodeArray<UserDetails['tournaments']>
type Leagues = NodeArray<UserDetails['leagues']>

export function convertUserEventToCarouselItem(events: Events, activeColor?: string): CarouselDataItem[] {
    return events.reduce<CarouselDataItem[]>((prevEvent, curEvent) => {

        if (curEvent === null || curEvent.id == null) return prevEvent

        const images = curEvent?.tournament?.images?.filter(truthyFilter) ?? [];
        let image = getImageByType(images, "any");

        const subtitleNode = curEvent?.userEntrant?.standing
            ? (
                <Text style={{ flexWrap: "wrap", flexShrink: 1 }}>
                    <MainText>{getNumberOrdinal(curEvent?.userEntrant?.standing?.placement).toString()}</MainText>
                    <MainText> at </MainText>
                    <Text style={{ color: activeColor }}>{curEvent.name}</Text>
                </Text>
            )
            : <Text style={{ color: activeColor, flexWrap: "wrap", flexShrink: 1 }}>{curEvent?.name}</Text>

        const dataItem: CarouselDataItem = {
            id: curEvent.id,
            title: curEvent?.tournament?.name ?? "",
            image: image.url,
            dataType: "Tournament",
            subtitleItem: subtitleNode
        }

        prevEvent.push(dataItem);

        return prevEvent
    }, [])
}

export function convertTournamentToCarouselItem(tournaments: Tournaments): CarouselDataItem[] {
    return tournaments.reduce<CarouselDataItem[]>((prev, cur) => {

        if (cur === null || cur?.id === null) return prev

        const images = cur.images?.filter(truthyFilter) ?? [];
        const image = getImageByType(images, 'any');

        const dataItem: CarouselDataItem = {
            id: cur.id,
            dataType: "Event",
            image: image.url,
            title: cur.name ?? ""
        }
        prev.push(dataItem);
        return prev
    }, [])
}

export function convertLeagueToCarouselItem(leagues: Leagues): CarouselDataItem[] {
    return leagues.reduce<CarouselDataItem[]>((prev, cur) => {

        if (cur === null || cur.id === null) return prev;

        const images = cur.images?.filter(truthyFilter) ?? [];
        const image = getImageByType(images, 'any');

        const item: CarouselDataItem = {
            id: cur.id,
            dataType: "League",
            title: cur.name ?? "",
            image: image?.url
        }
        prev.push(item);
        return prev
    }, []);
}
