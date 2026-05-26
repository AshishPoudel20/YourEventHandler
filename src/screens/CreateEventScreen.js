
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import s from '../styles';
import { createEvent } from '../db/database';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Event title is required.');
      return;
    }
    await createEvent(title.trim(), date.trim(), location.trim());
    Alert.alert('Success', 'Event created.');
    navigation.goBack();
  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Create New Event</Text>
      <Text style={s.rowText}>Event's Title</Text>
      <TextInput style={s.input} value={title} onChangeText={setTitle} placeholderTextColor="#888" />
      <Text style={s.rowText}>Event's Date</Text>
      <TextInput style={s.input} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor="#888" />
      <Text style={s.rowText}>Event's Location</Text>
      <TextInput style={s.input} value={location} onChangeText={setLocation} placeholderTextColor="#888" />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
          <Text style={s.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.back} onPress={handleCreate}>
          <Text style={s.btnText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
