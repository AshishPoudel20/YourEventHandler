
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import s from '../styles';
import { getEvents, isRegistered, registerForEvent, unregisterFromEvent } from '../db/database';
import { AppContext } from '../context/AppContext';

export default function EventListScreen({ navigation }) {
  const { currentMember } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState({}); // { eventId: bool }

  const load = useCallback(async () => {
    const list = await getEvents();
    setEvents(list);
    const reg = {};
    for (const e of list) {
      reg[e.eventId] = await isRegistered(currentMember.memberid, e.eventId);
    }
    setRegistered(reg);
  }, [currentMember]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const toggle = async (eventId) => {
    if (registered[eventId]) {
      await unregisterFromEvent(currentMember.memberid, eventId);
    } else {
      await registerForEvent(currentMember.memberid, eventId);
    }
    load();
  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => String(item.eventId)}
        renderItem={({ item }) => (
          <View style={[s.row, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={{ flex: 1 }}>
              <Text style={s.rowText}>{item.title}</Text>
              <Text style={[s.rowText, { fontSize: 12 }]}>{item.date} · {item.location}</Text>
            </View>
            <TouchableOpacity style={s.small} onPress={() => toggle(item.eventId)}>
              <Text style={s.smallText}>{registered[item.eventId] ? 'Unregister' : 'Register'}</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={s.rowText}>No events available.</Text>}
      />
      <TouchableOpacity style={s.back} onPress={() => navigation.navigate('Home')}>
        <Text style={s.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
