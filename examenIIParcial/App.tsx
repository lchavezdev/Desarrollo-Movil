import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ProductoProvider from './providers/ProductoProvider'; 
import Home from './pages/Home';
import Detalle from './pages/Detalle';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProductoProvider>
      <StatusBar style="auto" /> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ title: 'Lista de Productos' }} 
          />
          <Stack.Screen 
            name="Detalle" 
            component={Detalle} 
            options={{ title: 'Visualizar Item' }} 
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ProductoProvider>
  );
}
