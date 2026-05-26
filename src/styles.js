
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', borderWidth: 1, borderColor: '#fff', padding: 12, marginVertical: 30 },
  btn: { borderWidth: 1, borderColor: '#fff', padding: 14, marginVertical: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#fff', color: '#fff', padding: 10, marginVertical: 8 },
  row: { borderWidth: 1, borderColor: '#fff', padding: 10, marginVertical: 6 },
  rowText: { color: '#fff', fontSize: 16 },
  small: { borderWidth: 1, borderColor: '#fff', paddingVertical: 6, paddingHorizontal: 10, marginRight: 6 },
  smallText: { color: '#fff', fontSize: 14 },
  error: { color: '#ff6b6b', textAlign: 'center', marginTop: 10 },
  back: { borderWidth: 1, borderColor: '#fff', padding: 8, alignSelf: 'flex-start', marginTop: 20 },
});
