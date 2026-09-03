import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../pages/Home';
import AgregarMaestro from '../pages/AgregarMaestro';
import AsignarClase from '../pages/AsignarClase';

export default function NavDrawer() {
    const Drawer = createDrawerNavigator();
    
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen 
                    name="Home" 
                    component={Home} 
                    options={{ title: 'Inicio / Buscar' }}
                />
                <Drawer.Screen 
                    name="AgregarMaestro" 
                    component={AgregarMaestro} 
                    options={{ title: 'Agregar Maestro' }}
                />
                <Drawer.Screen 
                    name="AsignarClase" 
                    component={AsignarClase} 
                    options={{ title: 'Asignar Clase' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
