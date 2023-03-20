import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { queryAPI, userDetailsQuery } from "../api";
import { UserProfileProps } from "../navTypes";
import { convertLeagueToCarouselItem, convertTournamentToCarouselItem, convertUserEventToCarouselItem } from "../Shared/APIConverters";
import DetailsCarousel from "../Shared/DetailsCarousel/DetailsCarousel";
import { MainText } from "../Shared/ThemedText";
import { User, UserDetails } from "../types";
import ProfileHeader from "./ProfileHeader";

function UserProfilePage({ navigation, route }: UserProfileProps) {
    const [loading, setLoading] = useState(true);
    const [profileDetails, setProfileDetails] = useState<User>(null);
    const { colors } = useTheme();

    useEffect(() => {
        // Get user details from ID

        const body = userDetailsQuery(route.params.id);
        const query = queryAPI(body) as Promise<UserDetails>;

        query.then(userDetails => {
            setProfileDetails(userDetails.user);
            setLoading(false);
        })
    }, [])

    if (loading) return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <MainText>Loading...</MainText>
        </View>
    )

    return (
        <View style={styles.container}>
            <ProfileHeader profileDetails={profileDetails} />

            <View style={styles.infoSection}>
                <DetailsCarousel
                    style={{ marginTop: 10 }}
                    data={convertUserEventToCarouselItem(profileDetails.events.nodes, colors.primary)}
                    title="Previous Events"
                    emptyText="No events found"
                />

                <DetailsCarousel
                    style={styles.carousel}
                    data={convertTournamentToCarouselItem(profileDetails.tournaments.nodes)}
                    title="Tournaments"
                    emptyText="No tournaments found"
                />

                <DetailsCarousel
                    style={styles.carousel}
                    data={convertLeagueToCarouselItem(profileDetails.leagues.nodes)}
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
    }
})

export default UserProfilePage;
