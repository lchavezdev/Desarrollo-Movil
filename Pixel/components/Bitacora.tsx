import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useMascota } from '../context/ProviderMascota';

export const Bitacora = () => {
  const { bitacora } = useMascota();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bitácora</Text>
      <FlatList
        data={bitacora}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.hora}>[{item.hora}]</Text>
            <Text style={styles.mensaje}>{item.mensaje}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>no hay actividades</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, marginTop: 10 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  item: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  hora: { color: '#999', marginRight: 10, fontWeight: '600' },
  mensaje: { color: '#444', flex: 1 },
  vacio: { textAlign: 'center', color: '#999', marginTop: 20 },
});
