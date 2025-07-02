import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskProvider } from './context/TaskContext';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const Stack = createStackNavigator();

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#6F2DA8',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2C',
  },
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <TaskProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Tela Principal',
                headerStyle: { backgroundColor: '#1E1E1E' },
                headerTintColor: '#FFFFFF',
                headerBackground: () => (
                  <View style={{ flex: 1, backgroundColor: '#1E1E1E' }} />
                ),
              }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                title: 'Detalhes',
                headerStyle: { backgroundColor: '#1E1E1E' },
                headerTintColor: '#FFFFFF',
                headerBackground: () => (
                  <View style={{ flex: 1, backgroundColor: '#1E1E1E' }} />
                ),
              }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{
                title: 'Adicionar Tarefa',
                headerStyle: { backgroundColor: '#1E1E1E' },
                headerTintColor: '#FFFFFF',
                headerBackground: () => (
                  <View style={{ flex: 1, backgroundColor: '#1E1E1E' }} />
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </>
  );
}