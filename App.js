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
import { createStackNavigator } from '@react-navigation/stack';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live';
import { setLocalNotification } from './utils/helpers';

const Stack = createStackNavigator();
const Tab = Platform.OS === 'ios'
          ? createBottomTabNavigator() 
          : createMaterialBottomTabNavigator()

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
  };

  const Home =() => (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case 'History':
            return <Ionicons name="ios-bookmarks" size={size} color={color} />;
          case 'AddEntry':
            return <FontAwesome name="plus-square" size={size} color={color} />;
          case 'Live':
            return (
              <Ionicons name="ios-speedometer" size={size} color={color} />
            );
        }
      },
    })}
    // tabBarOptions={{
    //   activeTintColor: 'tomato',
    //   inactiveTintColor: 'gray',
    // }}
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
  >
   
    <Tab.Screen name="History" component={History} />
    <Tab.Screen name="AddEntry" component={AddEntry} />
    <Tab.Screen name="Live" component={Live} />
  </Tab.Navigator>
  )

  export default class App extends React.Component {
    componentDidMount() {
      setLocalNotification()
    }
    render() {
      return (
        <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
              <NavigationContainer>
                <Stack.Navigator>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen
                          name="EntryDetail"
                          component={EntryDetail}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: purple },

                          }}
                        />
                      </Stack.Navigator>
              </NavigationContainer> 
          </View>
        </Provider>
  );
}
}
