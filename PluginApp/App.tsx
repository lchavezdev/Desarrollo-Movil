import { StyleSheet, View } from 'react-native';
import Explorar from './pages/Explorar';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <Explorar />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
