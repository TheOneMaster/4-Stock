import { useEffect, useState } from "react";
import { ActivityIndicator, Button, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import { queryAPI, tournamentDetailsQuery } from "../api";
import { convertDateToString } from "../helper";
import { FullTournamentDetails, TournamentAPIQuery } from "../types";

import { useTheme } from "@react-navigation/native";
import ContactButton from "../Shared/ContactButton";
import EventCard from "./EventCard";
import { TopBar } from "./TopBar";
import { TournamentViewProps } from "../navTypes";

const RegisterButton = (props) => {

    if (props == undefined) {
        return null
    }

    const open = props.open;
    if (!open) {
        return null;
    }

    const style = StyleSheet.create({
        container: {
            position: "absolute",
            bottom: 20,
            right: 30,
            // backgroundColor: "blue"
        }
    });

    const register = () => {
        console.log("Register")
    }

    return (
        <View style={style.container}>
            <Button title="Register" onPress={register}></Button>
        </View>
        
    )


}

const DetailSection = (props: FullTournamentDetails) => {
    if (Object.keys(props).length === 0) {
        return null;
    }

    const { colors } = useTheme();

    const style = StyleSheet.create({
        container: {
            flex: 1,
        },
        url: {
            color: "blue",
        },
        text: {
            color: colors.text
        }
    });

    const startDate = convertDateToString(props.startAt);
    const lastDateRegister = convertDateToString(props.eventRegistrationClosesAt);

    return (
        <View style={style.container}>
            <View>
                <Text style={style.text}>City: {props.city}</Text>
                <Text style={style.text}>Starting At: {startDate}</Text>
                <Text style={style.text}>Country: {props.countryCode}</Text>
                <Text style={style.text}>Currency: {props.currency}</Text>
                { props.eventRegistrationClosesAt && <Text style={style.text}>Last date for registration: {lastDateRegister}</Text> }
                <Text style={style.text}>Number of attendees: {props.numAttendees}</Text>
                <Text style={style.text}>Venue Address: {props.venueAddress}</Text>
            </View>
        </View>
    )

}



const TournamentView = ({navigation, route}: TournamentViewProps) => {

    // 
    // 
    // TODO: Rewrite this component using FlatList or SectionList instead of using map inside a ScrollView
    // 
    // 
    
    const [data, setData] = useState({} as FullTournamentDetails);
    const [loading, setLoading] = useState(false);
    const [dataReady, setdataReady] = useState(false);
    const [failed, setFailedAPI] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    
    const tournament = route.params.tournamentDetails;

    const { colors } = useTheme();
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
            color: colors.text
        },
        eventCard: {
            marginBottom: 5
        }
    })


    const getTournamentData = async() => {
        try{
            setLoading(true);
            const tournamentQuery = tournamentDetailsQuery(tournament.id);
            const api_data = await queryAPI(tournamentQuery) as TournamentAPIQuery;
            const tournament_data = api_data.tournament;
            setData(tournament_data);
            setdataReady(true);
        } catch(err) {
            setFailedAPI(true);
        }
        
        setLoading(false);
    }

    useEffect(() => {
        getTournamentData();
    }, [])

    const refresh = () => {
        setRefreshing(true);
        getTournamentData();
        setRefreshing(false);
    }

    return (
        <View style={{flex: 1}}>
            
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}></RefreshControl>}>
                <TopBar {...tournament}></TopBar>
                
                { loading && <ActivityIndicator animating={loading} color={colors.primary} size={20} style={styles.activityIndicator}></ActivityIndicator> }    
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <DetailSection {...data}></DetailSection>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Events</Text>
                    { dataReady && data.events.map(event => (
                        <View style={styles.eventCard} key={event.id}>
                            <EventCard event={event}></EventCard>
                        </View>
                        )) }
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact</Text>
                    { dataReady && <ContactButton type={data.primaryContactType} url={data.primaryContact}></ContactButton>}
                </View>
            
            </ScrollView>

            { dataReady && <RegisterButton open={data.isRegistrationOpen}></RegisterButton> }
        </View>
    )
}

export default TournamentView;
