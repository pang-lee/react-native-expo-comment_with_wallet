import React, {useState} from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import ListItem from '../components/ListItem/ListItem';
import Comment from '../components/Comment/index';
import Wallet from '../components/Wallet/index'
import { Tab } from '@rneui/themed';
import { TabView, SceneMap } from 'react-native-tab-view';

const List = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const [routes] = useState([
    { key: 'first', title: 'coin' },
    { key: 'second', title: 'comment' },
    { key: 'third', title: 'wallet' }
  ]);

  const renderScene = SceneMap({
    first: ListItem,
    second: Comment,
    third: Wallet
  })

  return (
    <TabView
      renderTabBar={() => {
        return (
          <View style={styles.titleWrapper}>
            <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              indicatorStyle={{
                backgroundColor: 'lightblue',
                height: 3,
              }}
              variant="primary"
              >
              <Tab.Item
                title="虛擬貨幣"
                titleStyle={{ fontSize: 12, color: 'white' }}
                icon={{ name: 'logo-bitcoin', type: 'ionicon', color: 'white' }}
              />
              <Tab.Item
                title="爆料"
                titleStyle={{ fontSize: 12 }}
                icon={{ name: 'chatbubbles', type: 'ionicon', color: 'white' }}
              />
              <Tab.Item
                title="錢包"
                titleStyle={{ fontSize: 12 }}
                icon={{ name: 'wallet', type: 'ionicon', color: 'white' }}
              />
            </Tab>
          </View>
        )
      }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

const styles = StyleSheet.create({
    titleWrapper: {
        marginTop: 30
    }
})

export default List