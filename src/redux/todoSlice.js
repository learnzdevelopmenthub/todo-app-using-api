// const todoReducer = (state = [], action) => {
//     if(action.type === 'SET_TODOS'){
//         return action.payload
//     } else if (action.type === 'CREATE_TODO') {
//         return [action.payload,...state]
//     }
//     return state
// }

// export default todoReducer;

import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: {data: []},
    reducers: {
        getTodos: (state, action) => {
            state.data = action.payload
        },
        createTodo: (state, action) => {
            state.data.unshift(action.payload)
        }
    }
})

export const { getTodos, createTodo } = todoSlice.actions;
export default todoSlice.reducer;