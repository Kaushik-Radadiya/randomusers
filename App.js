import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {RootNavigation} from './src/navigation';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from './src/constants';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};
export default App;
