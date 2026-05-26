// App.js - root: sets up Stack Navigator, AppContext, and initialises SQLite DB on launch
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './src/context/AppContext';
import { initDB } from './src/db/database';

import HomeScreen from './src/screens/HomeScreen';
import MemberLoginScreen from './src/screens/MemberLoginScreen';
import EventListScreen from './src/screens/EventListScreen';
import AdminConsoleScreen from './src/screens/AdminConsoleScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';
import ManageEventsScreen from './src/screens/ManageEventsScreen';
import EditEventScreen from './src/screens/EditEventScreen';
import ParticipantsScreen from './src/screens/ParticipantsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);

  // useEffect demonstrates the effect hook - runs once on mount to set up the DB
  useEffect(() => {
    initDB().then(() => setReady(true)).catch(err => {
      console.error('DB init failed', err);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#fff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <AppProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MemberLogin" component={MemberLoginScreen} />
          <Stack.Screen name="EventList" component={EventListScreen} />
          <Stack.Screen name="AdminConsole" component={AdminConsoleScreen} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
          <Stack.Screen name="ManageEvents" component={ManageEventsScreen} />
          <Stack.Screen name="EditEvent" component={EditEventScreen} />
          <Stack.Screen name="Participants" component={ParticipantsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
