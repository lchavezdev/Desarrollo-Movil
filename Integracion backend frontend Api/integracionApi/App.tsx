import { StyleSheet } from 'react-native';
import Provider from './Providers/Provider'; 
import NavDrawer from './Components/Nav';

export default function App() {
  return (
    <Provider>
      <NavDrawer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
