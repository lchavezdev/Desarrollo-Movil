import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { useEstudiantes } from '../Providers/ProviderEstudiante';
import { Estudiante } from '../Modelos/Estudiante';

export default function FormularioEstudiante() {

    const [nombre, setNombre] = useState<string>('');

    const { agregarEstudiante } = useEstudiantes();

    function agregarEstudianteHandler() {

        if (nombre.trim() === '') {
            Alert.alert('Error', 'El nombre no puede estar vacío');
            return;
        }

        let estudiante: Estudiante = {
            id: Date.now().toString(), 
            name: nombre,
        }
        agregarEstudiante(estudiante.name);
        Alert.alert('Estudiante agregado correctamente');
        setNombre('');
    }

    return (
        <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
                Registro de Estudiantes
            </Text>

            <TextInput 
                placeholder='Ingrese Nombre del Estudiante'
                value={nombre}
                onChangeText={setNombre}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 10, backgroundColor: '#fff' }}
            />

            <Button title='Agregar Estudiante' onPress={agregarEstudianteHandler} />
        </View>
    )
}
