import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import counterSlice from './reducer/counterReducer'
import newsReducer from './reducer/newsReducer'
import testSlice from './reducer/testReducer'

const store = configureStore({
  reducer: combineReducers({
    news: newsReducer.reducer,
    counter: counterSlice.reducer,
    test: testSlice.reducer
  }, applyMiddleware(thunk)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  })
})

export default store