//Our reducers and initial state that pertains to our authentication will reside here
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
//Get user from localStorage - NB: when we register or login, we get a some user data
// but also a token. So we want to store the token in local storage
const user = JSON.parse(localStorage.getItem('user'))//Local storage can only have strings and thus we need to JSON.parse()

//initial state only pertaining to authentication
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Register user - an async thunk function - a function that will deal with async data and the backend
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => { 
    try {
        return await authService.register(user)
    } catch (error) { 
        const message = (error.response && error.response.data
            && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //will reject and send the message as the payload
    }
})

//Login user - an async thunk function - a function that will deal with async data and the backend
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => { 
    try {
        return await authService.login(user)
    } catch (error) { 
        const message = (error.response && error.response.data
            && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //will reject and send the message as the payload
    }
})

//Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})
  
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { //Anything we put in here are not going to be async (not thunk functions)
        reset: (state) => { 
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }// will be dispatched and user to reset values after registration/login etc
    },
    extraReducers: (builder) => { 
        builder
            .addCase(register.pending, (state) => { 
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => { 
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload    
            })
            .addCase(register.rejected, (state, action) => { 
                state.isLoading = false
                state.isError = true
                state.message = action.payload //which is the message passed in the catch by the thunk API and is added as the payload
                state.user = null
            })
            .addCase(login.pending, (state) => { 
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => { 
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload    
            })
            .addCase(login.rejected, (state, action) => { 
                state.isLoading = false
                state.isError = true
                state.message = action.payload //which is the message passed in the catch by the thunk API and is added as the payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
             })
    } //async/thunk functions will go here
})

export const { reset } = authSlice.actions
export default authSlice.reducer