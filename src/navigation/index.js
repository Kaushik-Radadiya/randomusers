import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, FavoriteScreen, HomeScreen} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: Colors.primary,
        },
        tabBarActiveTintColor: Colors.lightRed,
        tabBarInactiveTintColor: `${Colors.white}70`,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={25}
              color={focused ? Colors.lightRed : `${Colors.white}70`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="heart"
              size={25}
              color={focused ? Colors.lightRed : `${Colors.white}70`}
            />
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
