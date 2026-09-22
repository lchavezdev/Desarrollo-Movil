import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProductosContext } from "../context/ProductosContext"; 

export default function Home({ navigation }: any) {
const { listaProductos, agregarProducto, eliminarProducto } = useProductosContext();

    // Estados del formulario idénticos a tus especificaciones
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [estado, setEstado] = useState<'Disponible' | 'No disponible'>('Disponible');
    const [categoria, setCategoria] = useState('');
    const [selectImage, setSelectImage] = useState<string | null>(null);

    // Método para abrir la galería basado exactamente en tu código
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect:[1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setSelectImage(result.assets[0].uri);
        }
    };

    // Método para tomar foto con la cámara basado exactamente en tu código
    const tomarFoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect:[1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setSelectImage(result.assets[0].uri);
        }
    };

    const manejarEnviar = () => {
        if (!nombre || !precio || !categoria) {
            alert('Por favor complete los campos obligatorios');
            return;
        }

        // Ejecuta la función de tu Provider original
        agregarProducto({
            nombre,
            descripcion,
            precio: parseFloat(precio),
            estado,
            categoria,
            urlFotografia: selectImage || 'https://placeholder.com'
        });

        // Limpieza de campos al finalizar el envío
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setEstado('Disponible');
        setCategoria('');
        setSelectImage(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Administración de Productos</Text>

                <Text style={styles.label}>Nombre (*)</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Ingrese el nombre" 
                    value={nombre}
                    onChangeText={setNombre}
                />

                <Text style={styles.label}>Descripción</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Ingrese la descripción" 
                    value={descripcion}
                    onChangeText={setDescripcion}
                />

                <Text style={styles.label}>Precio (*)</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Ej: 45.50" 
                    value={precio}
                    onChangeText={setPrecio}
                    keyboardType="numeric" 
                />

                <Text style={styles.label}>Categoría (*)</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Ej: Electrónica" 
                    value={categoria}
                    onChangeText={setCategoria}
                />

                <Text style={styles.label}>Estado: {estado}</Text>
                <View style={styles.estadoContainer}>
                    <TouchableOpacity 
                        style={[styles.botonEstado, estado === 'Disponible' && styles.botonEstadoActivo]} 
                        onPress={() => setEstado('Disponible')}
                    >
                        <Text style={styles.textoBotonEstado}>Disponible</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.botonEstado, estado === 'No disponible' && styles.botonEstadoActivo]} 
                        onPress={() => setEstado('No disponible')}
                    >
                        <Text style={styles.textoBotonEstado}>No disponible</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Fotografía del Item</Text>
                <View style={styles.imageContainer}>
                    {selectImage ? (
                        <Image source={{ uri: selectImage }} style={styles.image} />
                    ) : (
                        <Text style={styles.placeholderText}>Añadir foto</Text>
                    )}
                </View>

                <View style={styles.botonSpace}>
                    <Button title="Seleccionar de Galería" onPress={pickImage} />
                </View>
                <View style={styles.botonSpace}>
                    <Button title="Tomar Foto" onPress={tomarFoto} />
                </View>
                
                <TouchableOpacity style={styles.botonEnviar} onPress={manejarEnviar}>
                    <Text style={styles.textoBoton}>Guardar Producto</Text>
                </TouchableOpacity>
            </ScrollView>

            <Text style={styles.listTitle}>Inventario Registrado</Text>
            <FlatList
                data={listaProductos}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.itemCardTitle}>{item.nombre}</Text>
                            <Text style={styles.itemCardSub}>${item.precio} - {item.estado}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity 
                                style={styles.botonDetalle} 
                                onPress={() => navigation.navigate('Detalle', { producto: item })}
                            >
                                <Text style={styles.textoBoton}>Detalle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.botonEliminar} 
                                onPress={() => item.id && eliminarProducto(item.id)}
                            >
                                <Text style={styles.textoBoton}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
    formContainer: { maxHeight: 380, backgroundColor: '#fff', padding: 10, borderRadius: 8 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#555', marginTop: 8, marginBottom: 4 },
    input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 5, marginBottom: 5, fontSize: 15 },
    estadoContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
    botonEstado: { flex: 1, padding: 8, borderWidth: 1, borderColor: '#ccc', marginHorizontal: 2, alignItems: 'center', borderRadius: 4 },
    botonEstadoActivo: { backgroundColor: '#cdf7cd', borderColor: '#4CAF50' },
    textoBotonEstado: { fontSize: 13, fontWeight: '500' },
    imageContainer: { width: 100, height: 100, borderColor: '#ccc', borderWidth: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10, borderRadius: 4, backgroundColor: '#fafafa' },
    image: { width: '100%', height: '100%', borderRadius: 4 },
    placeholderText: { color: '#aaa', fontSize: 13 },
    botonSpace: { marginVertical: 4 },
    botonEnviar: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 4, alignItems: 'center', marginTop: 15 },
    textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
    listTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#333' },
    list: { flex: 1 },
    itemCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, marginVertical: 4, borderRadius: 6, alignItems: 'center', elevation: 1 },
    itemCardTitle: { fontSize: 15, fontWeight: 'bold' },
    itemCardSub: { fontSize: 13, color: '#666' },
    actions: { flexDirection: 'row', alignItems: 'center' },
    botonDetalle: { backgroundColor: '#FF9800', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4, marginRight: 5 },
    botonEliminar: { backgroundColor: '#F44336', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 }
});
