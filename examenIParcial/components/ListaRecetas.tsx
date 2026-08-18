
import React, { useState } from 'react'
import { useRecetas } from '../Providers/ProviderReceta'
import { Button, TextInput, View, FlatList, Text } from 'react-native';

export default function ListaRecetas() {
    const { receta, eliminarReceta, buscarReceta } = useRecetas();

    const [numeroReceta, setNumeroReceta] = useState<string>("");

    function buscarHandler() {
        if (numeroReceta.trim() === "") {
            alert("Error, ingrese el numero de la receta");
            return;
        }
        buscarReceta(numeroReceta);
        setNumeroReceta("");
    }

    return (
        <>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Ingrese el numero de receta a ver:</Text>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
                <TextInput
                    placeholder="Ej. 1"
                    value={numeroReceta}
                    onChangeText={setNumeroReceta}
                    keyboardType="numeric"
                    style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, flex: 1, backgroundColor: "#fff", borderRadius: 4 }}
                />
                <Button title="Ver Receta" onPress={buscarHandler} color="#007bff" />
            </View>
            <FlatList
                data={receta}
                renderItem={({ item }) =>
                (
                    <View style={{ padding: 10, backgroundColor: "#e3f2fd", borderRadius: 4 }}>
                        <Text>id: "{item.id}", platillo: "{item.platillo}"</Text>
                        <Text style={{ fontSize: 13, color: "#555", marginVertical: 4 }}>
                            Fecha creada: {item.fecha.toLocaleDateString()}
                        </Text>
                        <Button
                            title="Eliminar"
                            color="#dc3545"
                            onPress={() => eliminarReceta(item.id)}
                        />
                    </View>

                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={() => <Text style={{ fontWeight: "bold", marginVertical: 10 }}>Listado de recetas</Text>}
                ListEmptyComponent={() => <Text>No hay recetas registradas</Text>}
            />
        </>



    )
}
