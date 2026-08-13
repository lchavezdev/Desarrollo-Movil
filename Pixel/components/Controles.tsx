import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useMascota } from '../context/ProviderMascota';

export const ControlesModo = () => {
  const { modoNoche, alternarModoNoche } = useMascota();

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Modo Noche: {modoNoche ? 'Encendido' : 'apagado'}</Text>
      <Switch value={modoNoche} onValueChange={alternarModoNoche} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginVertical: 10 },
  texto: { fontSize: 16, fontWeight: '500', color: '#444' },
});
