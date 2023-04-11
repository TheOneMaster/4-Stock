import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useUserDetailsQuery } from "../gql/gql";

import { UserProfileProps } from "../navTypes";
import DetailsCarousel from "../Shared/DetailsCarousel/DetailsCarousel";
import { convertLeagueToCarouselItem, convertTournamentToCarouselItem, convertUserEventToCarouselItem } from "./api";
import { MainText } from "../Shared/ThemedText";
import ProfileHeader from "./ProfileHeader";

function UserProfilePage({ navigation, route }: UserProfileProps) {
    const { colors } = useTheme();
    const { data, status } = useUserDetailsQuery({ ID: route.params.id.toString(), perPage: 10 });

    if (status !== "success" || data.user === null) return (
        <View style={styles.centerView}>
            <MainText>{status === "loading" ? "Loading..." : "Error loading profile details"}</MainText>
        </View>
    )

    return (
        <View style={styles.container}>
            <ProfileHeader profileDetails={data.user} />

            <View style={styles.infoSection}>
                <DetailsCarousel
                    style={{ marginTop: 10 }}
                    data={convertUserEventToCarouselItem(data.user.events?.nodes ?? [], colors.primary)}
                    title="Previous Events"
                    emptyText="No events found"
                />

                <DetailsCarousel
                    style={styles.carousel}
                    data={convertTournamentToCarouselItem(data.user.tournaments?.nodes ?? [])}
                    title="Tournaments"
                    emptyText="No tournaments found"
                    navigation={(id: string) => {
                        navigation.push("Tournament", { id: id })
                    }}
                />

                <DetailsCarousel
                    style={styles.carousel}
                    data={convertLeagueToCarouselItem(data.user.leagues?.nodes ?? [])}
                    title="Leagues"
                    emptyText="No leagues found"
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    infoSection: {
        paddingHorizontal: 10,
        flexGrow: 1,
    },
    carousel: {
        marginTop: 30
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default UserProfilePage;
