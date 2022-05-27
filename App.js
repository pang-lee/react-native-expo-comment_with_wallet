import React, {useRef, useMemo, useState, useEffect} from 'react';
import store from './src/store/configureStore';
import { Provider } from 'react-redux'
import IndexApp from './src/indexApp';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import './global';
// import Web3 from 'web3'

// import { useSelector, useDispatch } from 'react-redux'
// import reducer from './src/store/reducer/counterReducer'

export default function App() {
  // const count = useSelector((state) => state.counter.value)

  // const dispatch = useDispatch()

  useEffect(() => {
    SplashScreen.hideAsync()
    // return () => {
    //   const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
      
    //   web3.eth.getBlock('latest').then(console.log)      
    //   }
  }, [])

  // const press = () => {
  //   console.log('press call')
  //   dispatch(reducer.actions.incrementCounter())
  //   console.log(count)
  // }

  // const getdata = async (param) => {
  //   console.log('params fist', param)
  //   let result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  //   console.log('js placeholder res', result.data)
  // }

  return (
    <Provider store = { store }>
    <SafeAreaProvider>
      <IndexApp />
    </SafeAreaProvider>
  </Provider>
  );
}