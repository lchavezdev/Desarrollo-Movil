import { View, Text, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ContextUniversidad } from '../contexto/Contexto';
import { Maestro } from '../Modelos/Maestro';
import { ClaseLista } from '../Modelos/ClasesLista';



export default function AsignarClase() {
    const { listaMaestros, setListaMaestros } = useContext(ContextUniversidad);
    const [maestroId, setMaestroId] = useState('');
    const [claseId, setClaseId] = useState('');
    

    const [listaClases, setListaClases] = useState<ClaseLista[]>([]);

    async function cargarDatosPantalla() {
        try {

            const resMaestros = await fetch('http://localhost:3000/maestros');
            if (resMaestros.ok) setListaMaestros(await resMaestros.json());


            const resClases = await fetch('http://localhost:3000/clases');
            if (resClases.ok) {
                const datosClases = await resClases.json();
                setListaClases(datosClases); // 
            } else if (resClases.status === 402) {
                setListaClases([]);
            }
        } catch (error) {
            console.error('Error al conectar con las APIs de referencia:', error);
        }
    }

    async function handleAsignar() {
        if (!maestroId || !claseId) return alert('Todos los campos son obligatorios');
        try {
            const res = await fetch('http://localhost:3000/maestros/asignar-clase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ maestroId: parseInt(maestroId), claseId: parseInt(claseId) })
            });
            
            if (res.ok) {
                alert('La clase ha sido asignada con exito');
                setMaestroId(''); 
                setClaseId('');
                cargarDatosPantalla(); 
            } else {
                const errorData = await res.json();
                alert('Atencion: ' + (errorData.message || 'No se pudo asignar la clase'));
            }
        } catch (error) {
            alert('Error: ' + (error as Error).message);
        }
    }

    useEffect(() => {
        cargarDatosPantalla(); 
    }, []);

    return (
        <View style={{ padding: 20, flex: 1, flexDirection: 'row' }}>
            
            <View style={{ flex: 1, marginRight: 20, paddingRight: 20, borderRightWidth: 1, borderRightColor: '#eee' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Asignar Materia</Text>
                
                <TextInput placeholder="ID del Maestro" value={maestroId} onChangeText={setMaestroId} style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 }} />
                <TextInput placeholder="ID de la Clase" value={claseId} onChangeText={setClaseId} style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 15, borderRadius: 5 }} />
                
                <Button title="Vincular Clase" onPress={handleAsignar} />

                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 25, marginBottom: 10 }}>Asignaciones</Text>
                <FlatList
                    data={listaMaestros}
                    keyExtractor={(item) => 'asig-' + (item.id?.toString() || '')}
                    renderItem={({ item }: { item: Maestro }) => (
                        <View style={{ paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                            <Text style={{ fontWeight: '600' }}>{item.nombre} (ID: {item.id})</Text>
                            <Text style={{ color: '#666', fontSize: 13 }}>Clase: {(item.Clases || (item as any).clases)?.map((c: any) => c.nombre).join(', ') || 'Ninguna'}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Clases</Text>
                
                <FlatList
                    data={listaClases}
                    keyExtractor={(item) => 'clase-cat-' + item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10, backgroundColor: '#f8f9fa', marginBottom: 8, borderRadius: 5, borderWidth: 1, borderColor: '#e9ecef' }}>
                            <Text style={{ fontWeight: 'bold', color: '#007bff' }}>ID de Clase: {item.id}</Text>
                            <Text style={{ fontSize: 15, color: '#333' }}>Clase: {item.nombre}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={{ color: '#888', fontStyle: 'italic' }}>No hay clases registradas</Text>}
                />
            </View>

        </View>
    )
}
