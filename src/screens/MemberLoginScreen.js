
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import s from '../styles';
import { getMemberByName } from '../db/database';
import { AppContext } from '../context/AppContext';

export default function MemberLoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setCurrentMember } = useContext(AppContext);

  const handleLogin = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    const member = await getMemberByName(username);
    if (member) {
      setCurrentMember(member);
      setError('');
      navigation.navigate('EventList');
    } else {
      setError('Username not found. Try: alice, bob, charlie or diana');
    }
  };

  return (
    <View style={s.screen}>
      <Text style={s.title}>Member Login</Text>
      <Text style={s.rowText}>Username</Text>
      <TextInput
        style={s.input}
        value={username}
        onChangeText={setUsername}
        placeholder="abc123xyz"
        placeholderTextColor="#888"
        autoCapitalize="none"
      />
      <TouchableOpacity style={s.btn} onPress={handleLogin}>
        <Text style={s.btnText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={s.error}>{error}</Text> : null}
      <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
        <Text style={s.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
