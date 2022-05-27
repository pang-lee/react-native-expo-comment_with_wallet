import { createSlice } from '@reduxjs/toolkit'

const newsReducer = createSlice({
    name: 'news',
    initialState: {
      newsData: []
    },
    reducers: {
      setNews: (state, action) => {
        return state.newsData = action.payload
      },
      decremented: state => {
        state.theTest -= 1
      }
    }
})

export default newsReducer