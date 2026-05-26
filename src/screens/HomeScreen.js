// Home - app entry, choose Member or Admin
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import s from '../styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={s.screen}>
      <Text style={s.title}>YourEventHandler</Text>
      <View style={{ marginTop: 60 }}>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('MemberLogin')}>
          <Text style={s.btnText}>Member Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('AdminConsole')}>
          <Text style={s.btnText}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
