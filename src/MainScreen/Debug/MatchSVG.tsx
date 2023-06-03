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
    const {colors} = useTheme();

    const winnerSlot = match.slots?.find(slot => slot?.standing?.placement === 1);
    const loserSlot = match.slots?.find(slot => slot?.standing?.placement !== 1);

    const winnerName = winnerSlot?.standing?.entrant?.name ?? "N/A";
    const winnerScore = winnerSlot?.standing?.stats?.score?.value;

    const loserName = loserSlot?.standing?.entrant?.name ?? "N/A";
    const loserScore = loserSlot?.standing?.stats?.score?.value;


    return (
        <>

            <G x={offsetX} y={offsetY}>

                <EntrantRow x={0} y={0} entrantName={winnerName} score={winnerScore} scoreColor="green" />
                <EntrantRow x={0} y={ROW_HEIGHT} entrantName={loserName} score={loserScore} scoreColor="red" />

                <Rect x={0} y={0} width={MATCH_WIDTH} height={MATCH_HEIGHT} stroke={colors.border} strokeWidth={2} />
                <Line x1={0} x2={MATCH_WIDTH} y={ROW_HEIGHT} stroke={colors.border} />
                <Line x={MATCH_WIDTH - SCORE_WIDTH} y1={0} y2={MATCH_HEIGHT} stroke={colors.border} strokeWidth={2} />

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

    const { colors } = useTheme();

    const textOffsetY = props.y + (ROW_HEIGHT / 2) + 2;
    const scoreTextOffset = props.x + (MATCH_WIDTH - SCORE_WIDTH) + (SCORE_WIDTH / 2);

    const name = props.entrantName ?? "N/A"
    const score = props.score?.toString() ?? "N/A"

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
            <Text x={scoreTextOffset} y={textOffsetY} fontSize="15" fill="white" alignmentBaseline="middle" textAnchor="middle">{score}</Text>

        </>
    )
}
