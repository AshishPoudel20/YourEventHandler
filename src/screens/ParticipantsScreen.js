
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import s from '../styles';
import { getParticipantsForEvent, setAttendance } from '../db/database';

export default function ParticipantsScreen({ navigation, route }) {
  const { event } = route.params;
  const [list, setList] = useState([]);
  const [draft, setDraft] = useState({}); 
  const load = useCallback(async () => {
    const data = await getParticipantsForEvent(event.eventId);
    setList(data);
    const d = {};
    data.forEach(p => { d[p.userid] = p.isAttending === 1; });
    setDraft(d);
  }, [event.eventId]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const toggle = (userid) => {
    setDraft(prev => ({ ...prev, [userid]: !prev[userid] }));
  };

  const submit = async () => {
    for (const userid of Object.keys(draft)) {
      await setAttendance(Number(userid), draft[userid]);
    }
    Alert.alert('Saved', 'Attendance updated.');
  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Participants</Text>
      <Text style={[s.rowText, { marginBottom: 10 }]}>Event: {event.title}</Text>
      <FlatList
        data={list}
        keyExtractor={(item) => String(item.userid)}
        renderItem={({ item }) => (
          <View style={[s.row, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={{ flex: 1 }}>
              <Text style={s.rowText}>{item.name}</Text>
              <Text style={[s.rowText, { fontSize: 12 }]}>{item.email}</Text>
            </View>
            <TouchableOpacity style={s.small} onPress={() => toggle(item.userid)}>
              <Text style={s.smallText}>{draft[item.userid] ? '[attended]' : '[ ]'}</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={s.rowText}>No participants registered yet.</Text>}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
          <Text style={s.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.back} onPress={submit}>
          <Text style={s.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
