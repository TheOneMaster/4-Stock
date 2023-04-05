import { API_TOKEN } from "@env"

export const fetchData = <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers']
): (() => Promise<TData>) => {
    return async () => {
        const res = await fetch("https://api.start.gg/gql/alpha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`,
                "X-Exclude-Invalid": "true",
                ...options
            },
            body: JSON.stringify({ query, variables })
        })

        const json = await res.json();

        if (json.errors) {
            const { message } = json.errors[0];
            throw new Error(message || "Error...")
        }

        return json.data
    }
} 
