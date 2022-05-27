import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        incrementCounter: state => {
          state.value += 1
        },
        decremented: state => {
          state.value -= 1
        }
    }
})
  
export default counterSlice