import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useMascota } from '../context/ProviderMascota';

export const PanelAcciones = () => {
  const { alimentar, jugar, descansar, reiniciar, puedeJugar } = useMascota();

  return (
    <View style={styles.container}>
      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={alimentar}>
          <Text style={styles.textoBoton}>Alimentar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.boton, !puedeJugar && styles.botonDeshabilitado]} 
          onPress={jugar}
          disabled={!puedeJugar}
        >
          <Text style={styles.textoBoton}>Jugar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={descansar}>
          <Text style={styles.textoBoton}>Descansar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, styles.botonReiniciar]} onPress={reiniciar}>
          <Text style={styles.textoBoton}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, marginVertical: 10 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  boton: { flex: 1, backgroundColor: '#3498db', padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  botonReiniciar: { backgroundColor: '#e74c3c' },
  botonDeshabilitado: { backgroundColor: '#bdc3c7', opacity: 0.6 },
  textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
