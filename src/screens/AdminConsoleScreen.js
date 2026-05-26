// Screen 4: Admin Console - choose Create or Manage
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import s from '../styles';

export default function AdminConsoleScreen({ navigation }) {
  return (
    <View style={s.screen}>
      <Text style={s.title}>Admin Console</Text>
      <View style={{ marginTop: 60}}>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('CreateEvent')}>
          <Text style={s.btnText}>Create New Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('ManageEvents')}>
          <Text style={s.btnText}>Manage Events</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
        <Text style={s.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
