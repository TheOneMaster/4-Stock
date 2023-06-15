import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsProvider } from "./Settings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface GlobalProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();


export function GlobalProvider(props: GlobalProviderProps) {
    return (
        <SettingsProvider>
            <QueryClientProvider client={queryClient}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {props.children}
                </GestureHandlerRootView>
            </QueryClientProvider>
        </SettingsProvider>
    )
}
