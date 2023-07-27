import { Button, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useTournamentDetailsQuery } from "../gql/gql";

import { RegisterButtonProps } from "./types";
import DetailSection from "./DetailSection";
import EventCard from "./EventCard";
import { TopBar } from "./TopBar";

import { TournamentViewProps } from "../navTypes";
import ContactButton from "../Shared/ContactButton";
import { CustomText } from "../Shared/Text";
import { truthyFilter } from "../helper";
import { useSavedTournaments } from "../Context/SavedTournaments";
import { CenterMessage } from "../Shared";

const RegisterButton = ({ show, disabled = false }: RegisterButtonProps) => {

    if (!show) return null

    const register = () => console.log("Register");

    return (
        <View style={styles.registerButton}>
            <Button title="Register" onPress={register} disabled={disabled} />
        </View>
    )
}

const TournamentView = ({ navigation, route }: TournamentViewProps) => {

    //
    //
    // TODO: Rewrite this component using FlatList or SectionList instead of using map inside a ScrollView
    //
    //

    const tournamentID = route.params.id;
    const queryClient = useQueryClient();
    const { data, isLoading, isError, isFetching } = useTournamentDetailsQuery({ ID: tournamentID });
    const { saved, updateSaved } = useSavedTournaments();

    const favourite = saved.includes(tournamentID);

    function refresh() {
        queryClient.invalidateQueries(useTournamentDetailsQuery.getKey({ ID: tournamentID }));
    }

    function toggleSaved() {
        if (favourite) {
            const newSaved = saved.filter(id => id !== tournamentID);
            updateSaved(newSaved)
        } else {
            const newSaved = [...saved, tournamentID];
            updateSaved(newSaved);
        }
    }

    if (isLoading) {
        return <CenterMessage fill message="Loading..." />
    }

    if (isError || data.tournament === null) {
        return <CenterMessage fill message="Unable to load tournament details from API" />
    }

    const events = data.tournament.events?.filter(truthyFilter) ?? [];

    return (
        <View style={{ flex: 1 }}>

            <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
                <TopBar
                    images={data.tournament.images}
                    name={data.tournament.name}
                    fav={favourite}
                    favFunc={toggleSaved} />

                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>Details</CustomText>
                    <DetailSection {...data.tournament}></DetailSection>
                </View>

                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>Events</CustomText>
                    {events.map(event => {
                        if (event.id === null) {
                            return null
                        }
                        return <EventCard event={event} style={styles.eventCard} key={event.id} />
                    })

                    }
                </View>

                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>Contact</CustomText>
                    <ContactButton type={data.tournament.primaryContactType} url={data.tournament.primaryContact} />
                </View>

            </ScrollView>

            <RegisterButton show={data.tournament.isRegistrationOpen} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    activityIndicator: {
        position: "relative",
        left: 'auto',
        right: 'auto',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    section: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5,
    },
    eventCard: {
        marginBottom: 5
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerButton: {
        position: "absolute",
        bottom: 20,
        right: 30
    }
})

export default TournamentView;
