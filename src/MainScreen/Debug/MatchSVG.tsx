import { G, Line, Rect, Svg, Text } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { reduceSets } from "./Main";

export const MATCH_WIDTH = 150;
export const MATCH_HEIGHT = 50;
const ROW_HEIGHT = MATCH_HEIGHT / 2;

const SCORE_WIDTH = 20

interface MatchResultProps {
    match: ReturnType<typeof reduceSets>[number]
    offsetX?: number
    offsetY?: number
}

export function MatchResult(props: MatchResultProps) {

    const {
        offsetX = 0,
        offsetY = 0,
        match
    } = props;

    const winnerSlot = match.slots?.find(slot => slot?.standing?.placement === 1);
    const loserSlot = match.slots?.find(slot => slot?.standing?.placement !== 1);


    return (
        <>

        <G x={offsetX} y={offsetY}>
            
            <EntrantRow x={0} y={0} entrantName={winnerSlot?.standing?.entrant?.name} score={winnerSlot?.standing?.stats?.score?.value} scoreColor="green" />
            <EntrantRow x={0} y={ROW_HEIGHT} entrantName={loserSlot?.standing?.entrant?.name} score={winnerSlot?.standing?.stats?.score?.value} scoreColor="red" />

            <Rect x={0} y={0} width={MATCH_WIDTH} height={MATCH_HEIGHT} stroke="grey" />
            <Line x1={0} x2={MATCH_WIDTH} y={ROW_HEIGHT} stroke="grey" />
        </G>
        
        </>
    )
}

interface EntrantRowProps {
    x: number
    y: number
    entrantName?: string | null
    score?: number | null
    scoreColor: string
}

function EntrantRow(props: EntrantRowProps) {

    const {colors} = useTheme();


    const textOffsetY = props.y + (ROW_HEIGHT / 2) + 2;
    const scoreTextOffset = props.x + (MATCH_WIDTH - SCORE_WIDTH) + (SCORE_WIDTH/2);

    const name = props.entrantName ? props.entrantName : "N/A";
    const score = props.score ? props.score : "N/A";
    
    return (
        <>
        
        <Text x={props.x + 5} y={textOffsetY} fontSize="16" fill={colors.text} alignmentBaseline="middle">{name}</Text>
        <Rect 
            x={MATCH_WIDTH - SCORE_WIDTH}
            y={props.y}
            width={SCORE_WIDTH}
            height={ROW_HEIGHT}
            fill={props.scoreColor}
            />
        <Line x={MATCH_WIDTH - SCORE_WIDTH} y1={props.y} y2={props.y + (ROW_HEIGHT)} stroke="grey" />
        <Text x={scoreTextOffset} y={textOffsetY} fontSize="15" fill="white" alignmentBaseline="middle" textAnchor="middle" >{score}</Text>

        </>
    )
}
