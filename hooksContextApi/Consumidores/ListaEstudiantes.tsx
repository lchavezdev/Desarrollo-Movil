import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useEstudiantes } from '../Providers/ProviderEstudiante';

export default function ListaEstudiante() {

    const { estudiantes } = useEstudiantes();

    return (
        <View>
            <FlatList
                data={estudiantes}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, backgroundColor: '#e3f2fd', borderRadius: 4 }}>
                        <Text>id: '{item.id}', name: '{item.name}'</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListEmptyComponent={() => <Text>No hay estudiantes registrados</Text>}
                ListHeaderComponent={() => <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Listado de estudiantes</Text>}
                ListFooterComponent={() => <Text style={{ textAlign: 'center', color: '#888' }}>Fin del listado</Text>}
                ListFooterComponentStyle={{ height: 50, marginTop: 10 }}
                ListHeaderComponentStyle={{ height: 40 }}
            />
        </View>
    )
}
