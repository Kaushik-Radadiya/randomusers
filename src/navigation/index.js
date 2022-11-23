import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, FavoriteScreen, HomeScreen} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants';
import {StyleSheet, View} from 'react-native';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.primary,
        },
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.red,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabIcon,
                {
                  borderTopColor: focused ? Colors.red : Colors.transparent,
                },
              ]}>
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={25}
                color={Colors.red}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tabIcon,
                {
                  borderTopColor: focused ? Colors.red : Colors.transparent,
                },
              ]}>
              <Icon
                name={focused ? 'star' : 'star-outline'}
                size={25}
                color={Colors.red}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const RootNavigation = () => {
  const userAuth = useSelector(state => state.auth.logIn);
  return (
    <NavigationContainer>
      {userAuth ? <TabBar /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    borderTopWidth: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
