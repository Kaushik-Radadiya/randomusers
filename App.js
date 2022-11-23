import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {RootNavigation} from './src/navigation';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from './src/constants';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <StatusBar
          translucent
          backgroundColor={Colors.primary}
          barStyle="light-content"
        />
        <RootNavigation />
      </SafeAreaView>
    </Provider>
  );
};
export default App;
