import React from 'react';

import {SafeAreaView, StatusBar, View} from 'react-native';

import AppNavigation from './src/navigation';

function App(): React.JSX.Element {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //   }}>
    // {/* <StatusBar backgroundColor="#F59E0B" barStyle="light-content" /> */}
    <AppNavigation />
    // </View>
  );
}

export default App;
