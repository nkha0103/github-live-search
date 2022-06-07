import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import searchUserApi from '../../../api/searchUserApi'

export const searchUsersByInput = createAsyncThunk('seacrch/searchUsersByInput', async ({ searchValue, handleSearchProgress }) => {
    try {
        // Add search logic
        // Get Api response
        const response = await searchUserApi.getUsers(searchValue, 100, {
            onDownloadProgress: progressEvent => {
                handleSearchProgress(progressEvent)
            }
        })
        return response.items
    } catch (error) {
        return error
    }
})

const initialState = {
    searchData: [],
    didSearchStatus: false,
    loadingStatus: false
}

export const searchSlide = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetSearchData: (state) => {
            state.searchData = []
            state.didSearchStatus = false
        },
    },
    extraReducers: (builder) => {
        // (Promise pending)
        builder.addCase(searchUsersByInput.pending, (state) => {
            state.loadingStatus = true
            state.didSearchStatus = true
        })

        // (Promise fulfilled)
        builder.addCase(searchUsersByInput.fulfilled, (state, action) => {
            state.loadingStatus = false
            state.searchData = action.payload
        })

        // (Promise rejected)
        builder.addCase(searchUsersByInput.rejected, (state, action) => {
            state.loadingStatus = false
        })
    },
})

export const { resetSearchData } = searchSlide.actions

export default searchSlide.reducer
