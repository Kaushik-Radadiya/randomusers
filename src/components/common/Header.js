import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.jpeg')} style={styles.logo} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  logo: {
    height: 30,
    width: 30,
  },
});
