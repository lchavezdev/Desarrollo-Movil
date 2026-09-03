import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import Home from '../pages/Home';
import AgregarMaestro from '../pages/AgregarMaestro';
import AsignarClase from '../pages/AsignarClase';

export default function Nav() {
    const Tab = createBottomTabNavigator();
    
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{ title: 'Inicio / Buscar' }} 
                />
                <Tab.Screen 
                    name="AgregarMaestro" 
                    component={AgregarMaestro} 
                    options={{ title: 'Agregar Maestro' }} 
                />
                <Tab.Screen 
                    name="AsignarClase" 
                    component={AsignarClase} 
                    options={{ title: 'Asignar Clase' }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
