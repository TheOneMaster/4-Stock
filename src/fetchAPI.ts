import { useCallback, useEffect } from "react";
import { useSettings } from "./Context";
import { useMMKV } from "react-native-mmkv";

export const useFetchData = <TData, TVariables>(
    query: string,
    options?: RequestInit['headers']
): ((variables?: TVariables) => Promise<TData>) => {
    // it is safe to call React Hooks here.

    const storage = useMMKV();

    return async (variables?: TVariables) => {

        const authKey = storage.getString("settings.apiKey") ?? "";

        const res = await fetch("https://api.start.gg/gql/alpha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Exclude-Invalid": "true",
                "Authorization": `Bearer ${authKey}`,
                ...options
            },
            body: JSON.stringify({ query, variables })
        });

        const json = await res.json();

        if (json.errors) {
            const { message } = json.error[0] || {};
            throw new Error(message || "Error");
        }

        if (json.success === false) {
            const message = json.message;
            throw new Error(message)
        }

        return json.data;
    }
}
