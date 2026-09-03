import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { ContextUniversidad } from '../contexto/Contexto'
import { Maestro } from '../Modelos/Maestro';

export default function Home() {
    const { listaMaestros, setListaMaestros } = useContext(ContextUniversidad);
    const [busqueda, setBusqueda] = useState('');
    const [idEditar, setIdEditar] = useState<number | null>(null);
    const [nombreEditar, setNombreEditar] = useState('');

    async function cargarMaestros() {
        try {
            const res = await fetch('http://localhost:3000/maestros');
            if (res.status === 402) return setListaMaestros([]);
            const data = await res.json();
            setListaMaestros(data);
        } catch (error) {
            alert('Error al cargar: ' + (error as Error).message);
        }
    }

    async function handleBuscar(texto: string) {
        setBusqueda(texto);
        if (!texto.trim()) return cargarMaestros();
        try {
            const res = await fetch(`http://localhost:3000/maestros/buscar?nombreClase=${encodeURIComponent(texto)}`);
            if (res.status === 402) return setListaMaestros([]);
            const data = await res.json();
            setListaMaestros(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleEliminar(id: number) {
        if (!window.confirm('¿Eliminar maestro?')) return;
        try {
            const res = await fetch(`http://localhost:3000/maestros/${id}`, { method: 'DELETE' });
            if (res.ok) { alert('Eliminado'); cargarMaestros(); }
        } catch (error) {
            alert('Error: ' + (error as Error).message);
        }
    }

    async function handleGuardarEdicion() {
        if (!nombreEditar.trim()) return alert('Nombre obligatorio');
        try {
            const res = await fetch(`http://localhost:3000/maestros/${idEditar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: nombreEditar })
            });
            if (res.ok) { alert('Actualizado'); setIdEditar(null); cargarMaestros(); }
        } catch (error) {
            alert('Error: ' + (error as Error).message);
        }
    }

    useEffect(() => { cargarMaestros(); }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Gestion de Maestros</Text>

            <TextInput
                placeholder="Busqueda por clase"
                value={busqueda}
                onChangeText={handleBuscar}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15, borderRadius: 5 }}
            />

            <FlatList
                data={listaMaestros}
                keyExtractor={(item) => item.id?.toString() || ''}
                renderItem={({ item }: { item: Maestro }) => (
                    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            {idEditar === item.id ? (
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput value={nombreEditar} onChangeText={setNombreEditar} style={{ borderWidth: 1, borderColor: '#007bff', padding: 4, flex: 1, marginRight: 5 }} />
                                    <TouchableOpacity onPress={handleGuardarEdicion} style={{ backgroundColor: '#28a745', padding: 6, marginRight: 5 }}><Text style={{ color: 'white' }}>Guardar</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => setIdEditar(null)} style={{ backgroundColor: '#6c757d', padding: 6 }}><Text style={{ color: 'white' }}>X</Text></TouchableOpacity>
                                </View>
                            ) : (
                                <>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ID [{item.id}]: {item.nombre}</Text>
                                    <Text style={{ color: '#666' }}>
                                        Clase: {
                                            (item.Clases || (item as any).clases)?.map((c: any) => c.nombre).join(', ') || 'Ninguna'
                                        }
                                    </Text></>
                            )}
                        </View>
                        {idEditar !== item.id && (
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { setIdEditar(item.id!); setNombreEditar(item.nombre); }} style={{ backgroundColor: '#ffc107', padding: 6, marginRight: 5 }}><Text>Editar</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => item.id && handleEliminar(item.id)} style={{ backgroundColor: '#dc3545', padding: 6 }}><Text style={{ color: 'white' }}>Eliminar</Text></TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    )
}
