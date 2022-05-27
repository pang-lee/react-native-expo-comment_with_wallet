import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Colors from '../constants/Colors';
import CBButton from '../components/CBButton';

// import { WatchlistState } from '../store/reducers/watchlist';
// import { TopmoversState } from '../store/reducers/topmovers';
// import { NewsState } from '../store/reducers/news';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../navigation/AppNavigator';


// import * as watchlistActions from '../store/actions/watchlist';
// import * as topmoversActions from '../store/actions/topmovers';
// import * as newsAction from '../../../store/action/newsAction';
import axios from 'axios'

import cmpData from '../data/CoinMarketCapData'

import Watchlist from '../components/Whatchlist'
import TopMoversList from '../components/TopMoversList';
import NewsList from '../components/NewsList';

const Home = ({ navigation }) => {

  // const watchlistData = useSelector(
  //   (state) => state.watchlist.watchlistData
  // )

  // const topMoversData = useSelector(
  //   (state) => state.topmovers.topMoversData
  // )
  // const dispatch = useDispatch();

  // const newsData = useSelector((state) => state.news.newsData)
  
  // console.log(newsData)



  // const loadData = () => {
  // //     dispatch(watchlistActions.fetchCoinData());
  // //     dispatch(topmoversActions.fetchTopMoversData());
  //   // dispatch(newsAction.fetchNewsData());
  //   newsAction.fetchNewsData()
  // }
  const [newsData, setNewsData] = useState([])

  const [watchlistData, setWatchListData] = useState([])

  const [topMoversData, setTopMoversData] =  useState([])

  const updateCoinData = (newData) => { return setWatchListData(newData) }

  const loadWatchList =  async () => {

    const coins = ['BTC', 'ETH', 'XRP', 'DOGE', 'SHIB', 'MANA'];

    try {
        const cryptoResponse = await axios.get(
            `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
          );
        const cryptoResponseData = await cryptoResponse.data;

        const coinData = [];
        
        coins.forEach(coin => {
            const coinDetails = cryptoResponseData.RAW[coin].USD;
            const cmpDetails = cmpData.data.find(cmp => coinDetails.FROMSYMBOL === cmp.symbol);
            const coinID = cmpDetails?.id ?? 0;
            const coinName = cmpDetails?.name ?? 'N/A';

            coinData.push({
              id: coinID,
              name: coinName,
              symbol: coin,
              price: coinDetails.PRICE,
              percentChange: coinDetails.CHANGEPCT24HOUR
            })
          });
        
        return setWatchListData(coinData)
    } catch (error) {
      throw error
    }
  }

  const loadTopMover = async () => {
      try {
          const cbResponse = await axios.get('https://api.pro.coinbase.com/products');
          const cbResponseData = await cbResponse.data;

          let availableCoins = [];

          const filteredData = cbResponseData.filter(
              (coin) => coin.quote_currency === 'USD'
          )

          filteredData.forEach((coin) => {
              availableCoins.push(coin.base_currency);
          })

          const cryptoResponse = await axios.get( 
              `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${availableCoins.join()}`
          );
          const cryptoResponseData = await cryptoResponse.data;
          
          let dataAsArray = Object.values(cryptoResponseData.RAW);

          dataAsArray.sort((a, b) => 
              Math.abs(a.USD.CHANGEPCT24HOUR) < Math.abs(b.USD.CHANGEPCT24HOUR) ? 1 : -1
          )

          const coinData = [];

          for(const data of dataAsArray) {
              const cryptoData = data;

              const cmpDetails = cmpData.data.find(
                  (cmpCoin) => cryptoData.USD.FROMSYMBOL === cmpCoin.symbol
              );

              const coinID = cmpDetails?.id ?? 0;
              const coinName = cmpDetails?.name ?? 'N/A';

              coinData.push({
                id: coinID,
                name: coinName,
                symbol: cryptoData.USD.FROMSYMBOL,
                price: cryptoData.USD.PRICE,
                percentChange: cryptoData.USD.CHANGEPCT24HOUR
              })

              if( coinData.length === 6 ) {
                  break;
              }
          }

          return setTopMoversData(coinData)
      } catch (error) {
        throw error
      }
    }

  const loadNews = async () => {
    try {
      // Fetch news from cryptocompare API
      const response = await axios('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
      const responseData = await response.data;

      // Get the five latest news articles
      let fetch_newsData = [];
      for (const news of responseData.Data) {
        const formattedDate = new Date(news.published_on * 1000)
          .toString()
          .split(' ')
          .splice(1, 2)
          .join(' ');

        fetch_newsData.push({
          newsOutlet: news.source_info.name,
          date: formattedDate,
          title: news.title,
          image: news.imageurl,
          url: news.url              
        })

        if (newsData.length === 20) {
          break;
        }
      }

      return setNewsData(fetch_newsData)
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    loadNews()
    loadTopMover()
    loadWatchList()
    // loadData()
  }, []);

  const viewMoreHandler = () => {
    navigation.navigate('News');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={{justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.image} source= {{uri: 'https://i.imgur.com/9EEaSaS.png'}} />
            <Text style={styles.title}>歡迎來到我的虛擬錢包!</Text>
            <Text style={styles.subTitle}>今天就來開始投資!</Text>
            <CBButton title="Getting Started" />
            <Watchlist coinData={watchlistData}/>
          </View>

        }
        ListFooterComponent={
          <View>
            <TopMoversList coinData={topMoversData}/>
            <NewsList isHomeScreen={true} newsData={newsData} viewMoreHandler={viewMoreHandler}/>
          </View>
        }
      />
      
      
      {/* <ScrollView contentContainerStyle={{alignItems: 'center'}}> */}
        {/* <Image style={styles.image} source= {{uri: 'https://i.imgur.com/9EEaSaS.png'}} /> */}
        {/* <Text style={styles.title}>歡迎來到我的虛擬錢包!</Text> */}
        {/* <Text style={styles.subTitle}>今天就來開始投資!</Text> */}
        {/* <CBButton title="Getting Started" /> */}
        {/* <Watchlist coinData={watchlistData}/> */}
        {/* <TopMoversList coinData={topMoversData}/> */}
        {/* <NewsList isHomeScreen={true} newsData={newsData} viewMoreHandler={viewMoreHandler}/> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  image: {
    height: 250,
    width: 150,
    marginTop:40,
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: .5,
  },
  subTitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.subtitle,
  }
});

export default Home;
