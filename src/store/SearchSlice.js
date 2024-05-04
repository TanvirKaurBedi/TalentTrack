import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 0
}
export const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducer: {

    }
})
// Action Creators
export const { } = searchSlice.actions
export default searchSlice.reducer
