import React from "react"
import { Phase } from "../types"

export interface User {
    id?: number,
    images?: API_Image[],
    genderPronoun?: string
}

export interface API_Image {
    id?: number,
    url: string,
    type?: string
}

export interface Standing {
    id?: number,
    placement: number
    player?: {
        id: number
        prefix: string,
        gamerTag: string,
        user: User
    },
    entrant?: {
        id: number,
        name: string,
        participants: {
            user: User
        }[]
    }
}
export interface BracketPhasesProps {
    phases: Phase[]
    value: Phase
    selectPhase: React.Dispatch<React.SetStateAction<Phase>>
}
