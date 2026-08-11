import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

// 1. TUS NUEVAS IMPORTACIONES (Agrégalas aquí abajo)
import FormularioEstudiante from './Consumidores/FormEstudiante';
import ProviderEstudiante from './Providers/ProviderEstudiante';
import ListaEstudiante from './Consumidores/ListaEstudiantes';

export default function App() {


  return (
    <ScrollView style={styles.container}> 
      <ProviderEstudiante>
        <FormularioEstudiante />
        <ListaEstudiante />
      </ProviderEstudiante>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
