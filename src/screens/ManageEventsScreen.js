
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import s from '../styles';
import { getEvents, deleteEvent } from '../db/database';

export default function ManageEventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  const load = useCallback(async () => {
    setEvents(await getEvents());
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleDelete = (eventId) => {
    Alert.alert('Delete Event', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { await deleteEvent(eventId); load(); } },
    ]);
  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Manage Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => String(item.eventId)}
        renderItem={({ item }) => (
          <View style={s.row}>
            <Text style={s.rowText}>{item.title}</Text>
            <Text style={[s.rowText, { fontSize: 12 }]}>{item.date} · {item.location}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity style={s.small} onPress={() => navigation.navigate('EditEvent', { event: item })}>
                <Text style={s.smallText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.small} onPress={() => handleDelete(item.eventId)}>
                <Text style={s.smallText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.small} onPress={() => navigation.navigate('Participants', { event: item })}>
                <Text style={s.smallText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={s.rowText}>No events. Create one first.</Text>}
      />
      <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
        <Text style={s.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
