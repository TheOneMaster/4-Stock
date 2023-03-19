import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { queryAPI, userDetailsQuery } from "../api";
import { UserProfileProps } from "../navTypes";
import { User, UserDetails } from "../types";
import EventDetailsCarousel from "./DetailsCarousel";
import ProfileHeader from "./ProfileHeader";

function UserProfilePage({ navigation, route }: UserProfileProps) {
    const [loading, setLoading] = useState(true);
    const [profileDetails, setProfileDetails] = useState<User>(null);

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
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        </View>)

    return (
        <View style={styles.container}>
            <ProfileHeader profileDetails={profileDetails} />

            <View style={styles.infoSection}>
                <EventDetailsCarousel profileDetails={profileDetails.events.nodes} title={"Past Events"} />
            </View>






        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    infoSection: {
        paddingHorizontal: 10,
        marginTop: 10
    }
})

export default UserProfilePage;
