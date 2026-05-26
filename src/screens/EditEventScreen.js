
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import s from '../styles';
import { updateEvent } from '../db/database';

export default function EditEventScreen({ navigation, route }) {
  const { event } = route.params;
  const [title, setTitle] = useState(event.title || '');
  const [date, setDate] = useState(event.date || '');
  const [location, setLocation] = useState(event.location || '');

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Event title is required.');
      return;
    }
    await updateEvent(event.eventId, title.trim(), date.trim(), location.trim());
    Alert.alert('Success', 'Event updated.');
    navigation.goBack();
  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Edit Event</Text>
      <Text style={s.rowText}>Event's Title</Text>
      <TextInput style={s.input} value={title} onChangeText={setTitle} />
      <Text style={s.rowText}>Date</Text>
      <TextInput style={s.input} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor="#888" />
      <Text style={s.rowText}>Location</Text>
      <TextInput style={s.input} value={location} onChangeText={setLocation} />

      <TouchableOpacity style={s.btn} onPress={handleUpdate}>
        <Text style={s.btnText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
        <Text style={s.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
