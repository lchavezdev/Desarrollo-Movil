import { View, Text, TextInput, Button } from 'react-native'
import React, { useState, useContext } from 'react'
import { ContextUniversidad } from '../contexto/Contexto';
import { Maestro } from '../Modelos/Maestro';

export default function AgregarMaestro() {
    const { agregarMaestro } = useContext(ContextUniversidad);
    const [nombre, setNombre] = useState('');

    function handleGuardar() {
        if (!nombre.trim()) return alert('El nombre es obligatorio');
        const nuevoMaestro: Maestro = { nombre: nombre };
        agregarMaestro(nuevoMaestro);
        setNombre('');
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Agregar Nuevo Maestro</Text>
            <TextInput
                placeholder="Nombre Completo"
                value={nombre}
                onChangeText={setNombre}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15, borderRadius: 5 }}
            />
            <Button title="Guardar Maestro" onPress={handleGuardar} />
        </View>
    )
}
