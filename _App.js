/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useDebugValue } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StyleSheet, Button, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux'

import reducer from './src/store/reducer/counterReducer'

import Testcom from './src/components/testcom'

import { Tab, Text, TabView } from '@rneui/themed';
import axios from 'axios';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide()
  })

  const dispatch = useDispatch()

  const [index, setIndex] = React.useState(0);

  const count = useSelector((state) => state.counter.value)

  const press = () => {
    console.log('press call')
    dispatch(reducer.actions.incrementCounter())
    console.log(count)
  }

  const getdata = async (param) => {
    console.log('params fist', param)
    let result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log('js placeholder res', result.data)
  }

  return (
    <SafeAreaProvider>

      <Text>Hello world</Text>

      <Button onPress={press} title="123"/>

      <Text>{count}</Text>

        <Testcom></Testcom>

      <Tab
      value={index}
      onChange={(e) => {
        setIndex(e)
        getdata('hihi')
      }}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Recent"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="favorite"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="cart"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
        <Text h1>Recent</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
        <Text h1>Favorite</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
        <Text h1>Cart</Text>
      </TabView.Item>
    </TabView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
