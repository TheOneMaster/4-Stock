import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import { queryAPI, tournamentDetailsQuery } from "../api";
import { convertDateToString } from "../helper";
import { FullTournamentDetails, TournamentAPIQuery } from "../types";

import { useTheme } from "@react-navigation/native";
import ContactButton from "../Buttons/ContactButton";
import EventCard from "./EventCard";

const TopBar = (props) => {

    const { colors } = useTheme();

    const banner_image = props.images.reduce((prev, cur) => {
        if (cur.type === "banner") {
            return cur;
        }
        return prev;
    }, {});
    const profile_image = props.images.reduce((prev, cur) => {
        if (cur.type === "profile") {
            return cur;
        }
        return prev;
    }, {});


    const styles = StyleSheet.create({
        container: {
        },
        profile_only_view: {
            paddingVertical: 10
        },

        banner_container: {
            height: 200,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: colors.border,
        },
        banner_image: {
            flex: 1,
            resizeMode: "cover",
        },

        profile_container: {
            height: 80,
            position: "relative",
            marginHorizontal: 20,
            flexDirection: "row",
        },
        profile_image_container: {
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: 'solid',
            borderRadius: 10,
            overflow: 'hidden',
            width: 80,
            backgroundColor: colors.background
        },
        profile_image: {
            flex: 1,
            resizeMode: "cover",
        },
        profile_text: {
            marginHorizontal: 10,
            flex: 1,
        },
        profile_title: {
            fontWeight: 'bold',
            fontSize: 20,
            flexWrap: 'wrap',
            flexShrink: 1,
            color: colors.text
        },
    })

    // If banner image is provided
    if (Object.keys(banner_image).length !== 0) {
        return (
        <View style={styles.container}>
            <View style={styles.banner_container}>
                <Image source={{uri: banner_image.url}} style={styles.banner_image}></Image>
            </View>
            
            <View style={{...styles.profile_container, marginTop: -20}}>
                <View style={styles.profile_image_container}>
                    <Image source={{uri: profile_image.url}} style={styles.profile_image}></Image>
                </View>
                <View style={{...styles.profile_text, marginTop: 20}}>
                    <Text style={styles.profile_title} adjustsFontSizeToFit={true} numberOfLines={3}>{props.name}</Text>
                </View>
            </View>
        </View>
        ) 
    }

    return (
        <View style={styles.profile_only_view}>
            <View style={styles.profile_container}>
                <View style={styles.profile_image_container}>
                    <Image source={{uri: profile_image.url}} style={styles.profile_image}></Image>
                </View>
                <View style={{...styles.profile_text, justifyContent: 'center'}}>
                    <Text style={styles.profile_title} >{props.name}</Text>
                </View>
            </View>
        </View>
    )


}

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



const TournamentView = ({navigation, route}) => {
    
    const [data, setData] = useState({} as FullTournamentDetails);
    const [loading, setLoading] = useState(false);
    const [dataReady, setdataReady] = useState(false);
    const [failed, setFailedAPI] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    
    const params = route.params;

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
            marginRight: 10,
            marginLeft: 20,
            marginBottom: 10,
            // backgroundColor: 'blue'
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
            const tournamentQuery = tournamentDetailsQuery(params.id);
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
            <TopBar {...params}></TopBar>
                { loading && <ActivityIndicator animating={loading} color='red' size={20} style={styles.activityIndicator}></ActivityIndicator> }    
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
