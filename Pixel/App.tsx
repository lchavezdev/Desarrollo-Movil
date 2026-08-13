import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Cabecera } from './components/Cabecera';
import { ControlesModo } from './components/Controles';
import { Indicadores } from './components/Indicadores';
import { PanelAcciones } from './components/PanelAccion';
import { Bitacora } from './components/Bitacora';
import ProviderMascota from './context/ProviderMascota';

export default function App() {
  return (
    <ProviderMascota>
      <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
        <Cabecera />
        <ControlesModo />
        <Indicadores />
        <PanelAcciones />
        <Bitacora />
      </ScrollView>
    </ProviderMascota>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  contenido: { paddingVertical: 40, paddingHorizontal: 10 },
});
