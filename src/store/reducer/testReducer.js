import { createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
    name: 'test',
    initialState: {
        theTest: 0
    },
    reducers: {
        incremented: state => {
          state.theTest += 1
        },
        decremented: state => {
          state.theTest -= 1
        }
    }
})
  
export default testSlice