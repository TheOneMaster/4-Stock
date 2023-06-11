import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { SecondaryCard } from "../../Shared";
import { BottomSheet } from "../../Shared/BottomSheet/BottomSheet";
import { BottomSheetRefProps } from "../../Shared/BottomSheet/types";
import { TitleText } from "../../Shared/Text";
import { FilterCheckbox, FilterDate, StaticFilterItem } from "./FilterItem";
import { useFilters } from "./filterContext";

interface FilterListProps {
    minSize: number
    maxSize: number
    style?: StyleProp<ViewStyle>
}

export interface FilterListRefProps {
    close: () => void
    open: () => void
    toggle: () => void
}


export const FilterList = forwardRef<FilterListRefProps, FilterListProps>((props, ref) => {
    const { filters, updateFilter } = useFilters();
    
    const bottomSheetRef = useRef<BottomSheetRefProps>(null);
    const [show, setShow] = useState(false);

    const close = () => {
        bottomSheetRef.current?.scrollTo(0);
        setShow(false)
    }

    const open = () => {
        bottomSheetRef.current?.scrollTo(props.minSize);
        setShow(true)
    }

    const toggle = () => {
        show ? close() : open();
    }

    useImperativeHandle(ref, () => ({ close, open, toggle }), [close, open, toggle])

    return (
        <>

            {show ? <Pressable style={styles.overlay} onPress={close} /> : null}

            <BottomSheet ref={bottomSheetRef} maxSize={props.maxSize} minSize={props.minSize} setOverlay={setShow} style={[styles.container, props.style]}>

                <SecondaryCard style={styles.inner}>

                    <TitleText style={styles.title}>Filters</TitleText>

                    <FilterDate title="From" date={filters.afterDate} setDate={(newDate) => updateFilter("afterDate", newDate)} />
                    <FilterDate title="Till" date={filters.beforeDate} setDate={(newDate) => updateFilter("beforeDate", newDate)} />

                    <FilterCheckbox title="Past Events" value={filters.past} setValue={(past) => updateFilter("past", past)} />
                    <FilterCheckbox title="Has Online Events" value={filters.online} setValue={(online) => updateFilter("online", online)} />
                    <FilterCheckbox nullValue title="Open for Registration" value={filters.regOpen} setValue={(open) => updateFilter("regOpen", open)} />

                    <StaticFilterItem title="Game Filter" value={filters.games.map(game => game.label).join(", ")} />

                </SecondaryCard>

            </BottomSheet>

        </>
    )
})

const styles = StyleSheet.create({
    container: {
        zIndex: 3
    },
    inner: {
        // flex: 1,
        flexGrow: 1,
        borderRadius: 10,
        overlayColor: "hidden"
    },
    title: {
        padding: 10,
        
    },
    overlay: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        opacity: 0.6,
        zIndex: 2
    }
})
