import { Button, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useTournamentDetailsQuery } from "../gql/gql";

import { TournamentViewProps } from "../navTypes";
import ContactButton from "../Shared/ContactButton";
import { MainText } from "../Shared/ThemedText";
import DetailSection from "./DetailSection";
import EventCard from "./EventCard";
import { TopBar } from "./TopBar";
import { RegisterButtonProps } from "./types";


const RegisterButton = ({ show , disabled = false }: RegisterButtonProps) => {
    if (!show) {
        return null;
    }

    const register = () => {
        console.log("Register")
    }

    return (
        <View style={styles.registerButton}>
            <Button title="Register" onPress={register} disabled={disabled}></Button>
        </View>

    )


}

const TournamentView = ({ navigation, route }: TournamentViewProps) => {

    // 
    // 
    // TODO: Rewrite this component using FlatList or SectionList instead of using map inside a ScrollView
    // 
    // 

    const tournamentID = route.params.tournamentDetails.id.toString();
    const queryClient = useQueryClient();
    const { data, isLoading, isError, isFetching } = useTournamentDetailsQuery({ ID: tournamentID })

    function refresh() {
        queryClient.invalidateQueries(useTournamentDetailsQuery.getKey({ ID: tournamentID }));
    }

    if (isLoading) {
        return (
            <View style={styles.centerView}>
                <MainText>Loading...</MainText>
            </View>
        )
    }

    if (isError || data.tournament === null) {
        return (
            <View>
                <MainText>Unable to load Tournament details from API</MainText>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}>
                <TopBar images={data.tournament.images} name={data.tournament.name}></TopBar>

                <View style={styles.section}>
                    <MainText style={styles.sectionTitle}>Details</MainText>
                    <DetailSection {...data.tournament}></DetailSection>
                </View>

                <View style={styles.section}>
                    <MainText style={styles.sectionTitle}>Events</MainText>
                    {data?.tournament?.events?.map(event => {
                        if (event === null) {
                            return null
                        }
                        return (
                            <View style={styles.eventCard} key={event.id}>
                                <EventCard event={event} />
                            </View>
                        )
                    })

                    }
                </View>

                <View style={styles.section}>
                    <MainText style={styles.sectionTitle}>Contact</MainText>
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
