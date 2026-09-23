import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { Comment } from '../../types/comment.ts'

interface CommentState {
    comments: Comment[]
}

const initialState: CommentState = {
    comments: [],
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.unshift(action.payload)
        },
        deleteComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter((c) => c.id !== action.payload)
        },
        deleteCommentsByPost: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter((c) => c.postId !== action.payload)
        },
    },
})

export const {setComments, addComment, deleteComment, deleteCommentsByPost} = commentSlice.actions

export default commentSlice.reducer
