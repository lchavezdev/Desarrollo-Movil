import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProviderReceta from "./Providers/ProviderReceta";
import FormularioReceta from "./components/FormularioReceta";
import ListaRecetas from "./components/ListaRecetas";

export default function App() {
  return (
    <View style={styles.container}>
      <ProviderReceta>
        <FormularioReceta />
        <ListaRecetas />
      </ProviderReceta>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 40,
  },
});
