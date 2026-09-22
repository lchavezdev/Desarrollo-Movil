import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useContextProductos } from '../providers/ProductoProvider';

export default function Detalle({ route, navigation }: any) {
    const { producto } = route.params;
    const { eliminarProducto } = useContextProductos();
    
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    const ejecutarEliminar = () => {
        if (producto.id) {
            eliminarProducto(producto.id);
            navigation.goBack(); // Regresa al inventario tras eliminar
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>items</Text>
            <Text style={styles.infoText}>
                {producto.nombre} | ${producto.precio} | {producto.descripcion || 'Sin descripción'}
            </Text>

            {!mostrarDetalle && (
                <TouchableOpacity style={styles.botonVer} onPress={() => setMostrarDetalle(true)}>
                    <Text style={styles.textoBoton}>Ver</Text>
                </TouchableOpacity>
            )}

            {mostrarDetalle && (
                <View style={styles.detalleContainer}>
                    <Text style={styles.titleDetalle}>TITULO DETALLE</Text>
                    <Text style={styles.subtitleDetalle}>ver detalle del item</Text>

                    <View style={styles.imageContainer}>
                        <Image source={{ uri: producto.urlFotografia }} style={styles.image} />
                    </View>

                    <TouchableOpacity style={styles.botonEliminar} onPress={ejecutarEliminar}>
                        <Text style={styles.textoBoton}>eliminar</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
                <Text style={styles.textoBotonVolver}>Volver al Inventario</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    infoText: { fontSize: 16, color: '#444', backgroundColor: '#fff', padding: 12, borderRadius: 6, marginVertical: 10, borderWidth: 1, borderColor: '#ddd' },
    botonVer: { backgroundColor: '#2196F3', padding: 12, borderRadius: 4, alignItems: 'center', marginTop: 5 },
    textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
    
    detalleContainer: { marginTop: 25, paddingTop: 20, borderTopWidth: 2, borderColor: '#ccc' },
    titleDetalle: { fontSize: 24, fontWeight: 'bold', color: '#111', textAlign: 'center' },
    subtitleDetalle: { fontSize: 15, color: '#666', textAlign: 'center', marginVertical: 8 },
    imageContainer: { width: '100%', height: 200, borderColor: '#ccc', borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 15, borderRadius: 6, backgroundColor: '#fafafa', overflow: 'hidden' },
    image: { width: '100%', height: '100%', resizeMode: 'cover' },
    botonEliminar: { backgroundColor: '#F44336', padding: 12, borderRadius: 4, alignItems: 'center', marginTop: 10 },
    
    botonVolver: { padding: 15, alignItems: 'center', marginTop: 30 },
    textoBotonVolver: { color: '#2196F3', fontWeight: 'bold', fontSize: 15 }
});
