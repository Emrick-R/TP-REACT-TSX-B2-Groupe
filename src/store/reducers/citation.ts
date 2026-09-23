import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Citation } from '../../types/citation.ts'

interface CitationState {
    citations: Citation[]
}

const initialState: CitationState = {
    citations: [],
}

export const citationSlice = createSlice({
    name: 'citation',
    initialState,
    reducers: {
        setCitations: (state, action: PayloadAction<Citation[]>) => {
            state.citations = action.payload
        },
    },
})

export const { setCitations } = citationSlice.actions

export default citationSlice.reducer