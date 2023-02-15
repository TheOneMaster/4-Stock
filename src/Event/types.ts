export interface User {
    id?: number
    images?: API_Image[]
}

export interface API_Image {
    id?: number,
    url: string,
    type?: string
}
