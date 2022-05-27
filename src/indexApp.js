import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import List from './layouts/ListTab';

const IndexApp = () => {
    return (
        <SafeAreaProvider>
            <List></List>
        </SafeAreaProvider>        
    )
}

export default IndexApp