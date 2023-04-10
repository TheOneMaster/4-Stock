import { useSettings } from "./MainScreen/Settings";

export const useFetchData = <TData, TVariables>(
    query: string,
    options?: RequestInit['headers']
): ((variables?: TVariables) => Promise<TData>) => {
    // it is safe to call React Hooks here.
    const { general } = useSettings();

    return async (variables?: TVariables) => {

        const API_TOKEN = general.apiKey;
        if (!API_TOKEN) throw new Error("API Key not provided",)

        const res = await fetch("https://api.start.gg/gql/alpha", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${API_TOKEN}`,
                "X-Exclude-Invalid": "true",
                ...options
            },
            body: JSON.stringify({ query, variables })
        })

        const json = await res.json()

        if (json.errors) {
            const { message } = json.errors[0] || {}
            throw new Error(message || 'Error…')
        }

        return json.data
    }
}
