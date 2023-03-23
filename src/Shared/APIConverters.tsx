import { Text } from "react-native";
import { Image } from "../gql/gql";
import { getNumberOrdinal } from "../helper";
import { BasicTournamentDetails, APIImage, League, UserEvent, APIImageType } from "../types";
import { CarouselDataItem } from "./DetailsCarousel/types";
import { MainText } from "./ThemedText";



export function getImageByType<Type extends Pick<Image, "type"|"url">>(images: Type[], type: string| string[]): Type | Pick<Image, "url"> {
    const finalImage = images.reduce<Type|null>((prev, cur) => {
        const typeMatch = typeof type === 'string' ? cur.type === type : type.includes(cur.type ?? '');
        if (typeMatch) return cur
        return prev
    }, null)

    if (finalImage) return finalImage

    return {url: ""}
}

export function convertUserEventToCarouselItem(events: UserEvent[], activeColor?: string): CarouselDataItem[] {
    return events.reduce((prev, cur) => {
        const image = cur.tournament.images.reduce((prev, cur) => {
            return cur
        }, null);

        const subtitleNode = cur.userEntrant.standing
            ? (
                <Text style={{ flexWrap: "wrap", flexShrink: 1 }}>
                    <MainText>{getNumberOrdinal(cur.userEntrant.standing.placement).toString()}</MainText>
                    <MainText> at </MainText>
                    <Text style={{ color: activeColor }}>{cur.name}</Text>
                </Text>
            )
            : <Text style={{ color: activeColor, flexWrap: "wrap", flexShrink: 1 }}>{cur.name}</Text>

        const dataItem: CarouselDataItem = {
            title: cur.tournament.name,
            image: image ?? { url: "" },
            dataType: "tournament",
            subtitleItem: subtitleNode
        }

        prev.push(dataItem);

        return prev
    }, [])



}

export function convertTournamentToCarouselItem(tournaments: Pick<BasicTournamentDetails, "id" | "images" | "name">[]): CarouselDataItem[] {
    return tournaments.reduce((prev, cur) => {
        const image = cur.images.reduce((prev, cur) => cur, null);
        const dataItem: CarouselDataItem = {
            dataType: "tournament",
            image: image ?? { url: "" },
            title: cur.name
        }
        prev.push(dataItem);
        return prev
    }, [])
}

export function convertLeagueToCarouselItem(leagues: League[]): CarouselDataItem[] {
    return leagues.reduce((prev, cur) => {
        const image = cur.images.reduce((prev, cur) => cur, null);
        const item: CarouselDataItem = {
            dataType: "tournament",
            title: cur.name,
            image: image ?? { url: "" }
        }
        prev.push(item);
        return prev
    }, [])
}
