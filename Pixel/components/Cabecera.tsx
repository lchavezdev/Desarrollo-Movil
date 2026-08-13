import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { useMascota } from '../context/MascotaContext';

export const Cabecera = () => {
  const { nombre, cambiarNombre, estadoAnimo } = useMascota();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/gatito.png')}
        style={styles.imagenMascota}
      />

      <TextInput
        style={styles.inputNombre}
        value={nombre}
        onChangeText={cambiarNombre}
        placeholder="nombre de mascota"
      />

      <Text style={styles.animo}>Estado: {estadoAnimo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 15 },
  imagenMascota: {
    width: 140,
    height: 140,
    borderRadius: 70, // La hace redonda de forma estetica
    marginBottom: 15,
    resizeMode: 'cover'
  },
  inputNombre: { fontSize: 26, fontWeight: 'bold', color: '#333', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 10, textAlign: 'center', minWidth: 150 },
  animo: { fontSize: 16, color: '#666', marginTop: 8 },
});
