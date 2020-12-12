import React from 'react';
import { StyleSheet, Text, View , Platform,StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons' 
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

 const Tab = Platform.OS === 'ios'
          ? createBottomTabNavigator() 
          : createMaterialBottomTabNavigator()

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
  }
  export default class App extends React.Component {
    render() {
      return (
        <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
            <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'History':
                return <Ionicons name="ios-bookmarks" size={size} color={color} />;
              case 'AddEntry':
                return <FontAwesome name="plus-square" size={size} color={color} />;
              // case 'Live':
              //   return (
              //     <Ionicons name="ios-speedometer" size={size} color={color} />
              //   );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
       
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="AddEntry" component={AddEntry} />
      </Tab.Navigator>
    </NavigationContainer>
          </View>
        </Provider>
  );
}
}
