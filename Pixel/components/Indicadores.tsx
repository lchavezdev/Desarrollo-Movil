import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMascota } from '../context/ProviderMascota';

export const Indicadores = () => {
  const { indicadores } = useMascota();

  return (
    <View style={styles.container}>
      {indicadores.map((ind) => (
        <View key={ind.tipo}>
          <Text >{ind.tipo}</Text>
          <Text style={styles.valor}>{ind.valor}%</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  valor: { fontSize: 18, fontWeight: 'bold', marginTop: 4 },
});
