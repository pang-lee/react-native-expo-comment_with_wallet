import React, {useRef, useMemo, useState, useEffect} from 'react';
import { FlatList, StyleSheet, View, useWindowDimensions, SafeAreaView} from 'react-native';
import { getMarketData } from '../../services/cryptoService';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Item from './Item';
import Chart from './Chart';

const ListItem = () => {
    const [data, setData] = useState([]);
    const [selectedCoinData, setSelectedCoinData] = useState(null);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);
   
    const openModal = (item) => {
        setSelectedCoinData(item);
        bottomSheetModalRef.current?.present();
    }

    useEffect(() => {
        const fetchMarketData = async () => {
          const marketData = await getMarketData();
          setData(marketData);
        }
    
        fetchMarketData();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <BottomSheetModalProvider>
                <FlatList
                      keyExtractor={(item) => item.id}
                      data={data}
                      renderItem={({ item }) => (
                        <Item
                          name={item.name}
                          symbol={item.symbol}
                          currentPrice={item.current_price}
                          priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
                          logoUrl={item.image}
                          onPress={() => openModal(item)}
                        />
                      )}
                />
                 <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={0}
                  snapPoints={snapPoints}
                  style={styles.bottomSheet}
                >
                  { selectedCoinData ? (
                    <Chart
                      currentPrice={selectedCoinData.current_price}
                      logoUrl={selectedCoinData.image}
                      name={selectedCoinData.name}
                      symbol={selectedCoinData.symbol}
                      priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
                      sparkline={selectedCoinData?.sparkline_in_7d.price}
                    />
                  ) : null}
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default ListItem