// const todoReducer = (state = [], action) => {
//     if(action.type === 'SET_TODOS'){
//         return action.payload
//     } else if (action.type === 'CREATE_TODO') {
//         return [action.payload,...state]
//     }
//     return state
// }

// export default todoReducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createTodoAsync = createAsyncThunk('todos/createTodo', async(todoData, {rejectWithValue})=>{
    try{
        const response = await fetch('https://gorest.co.in/public/v2/users/7616562/todos', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer cf7dc2a04cbe8334b06d1f884660c74333ca7f1739b4fac557d1f0579dc4c932',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(todoData)
        })

        if(!response.ok){
            throw new Error('Error: Todo is not created')
        }

        return await response.json() // for success
    } catch (error){
        return rejectWithValue(error.message) // return error text as payload
    }
})

export const getTodosAsync = createAsyncThunk('todos/getTodos', async (_, {rejectWithValue})=>{
    try {
        const response = await fetch('https://gorest.co.in/public/v2/users/7616562/todos', {
            headers: {
				'Authorization': 'Bearer cf7dc2a04cbe8334b06d1f884660c74333ca7f1739b4fac557d1f0579dc4c932',
				'Content-Type': 'application/json'
			}
        })

        if (!response.ok) {
            throw new Error('Error: Fetching todos is failed')
        }

        return await response.json()
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        data: [], 
        error: null, 
        loading: false,
        createError: null,
        createLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodoAsync.pending, (state)=>{
                state.createLoading = true
                state.createError = null
            })
            .addCase(createTodoAsync.fulfilled, (state, action)=>{
                state.createLoading = false
                state.data.unshift(action.payload)
            })
            .addCase(createTodoAsync.rejected, (state, action)=>{
                state.createLoading = false
                state.createError = action.payload
            })
            .addCase(getTodosAsync.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(getTodosAsync.fulfilled, (state, action)=>{
                state.loading = false
                state.data = action.payload
            }).addCase(getTodosAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default todoSlice.reducer;