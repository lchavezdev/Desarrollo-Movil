import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProductosContext } from "../context/ProductosContext";

export default function Home({ navigation }: any) {
    const { listaProductos, agregarProducto } = useProductosContext();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState<'Disponible' | 'No disponible'>('Disponible');
    
    const [categoria, setCategoria] = useState<'Electrónica' | 'Ropa' | 'Hogar'>('Electrónica');
    const [precio, setPrecio] = useState('');
    const [selectImage, setSelectImage] = useState<string | null>(null);

    const cambiarCategoria = () => {
        if (categoria === 'Electrónica') {
            setCategoria('Ropa');
        } else if (categoria === 'Ropa') {
            setCategoria('Hogar');
        } else {
            setCategoria('Electrónica');
        }
    };

    const tomarOFotoGaleria = () => {
        Alert.alert(
            "Cargar Fotografía",
            "Selecciona el origen de la imagen",
            [
                { text: "Cámara", onPress: abrirCamara },
                { text: "Galería", onPress: abrirGaleria },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    const abrirGaleria = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect:[1,1],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectImage(result.assets[0].uri);
        }
    };

    const abrirCamara = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect:[1,1],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectImage(result.assets[0].uri);
        }
    };

    const manejarGuardar = () => {
        if (!nombre || !precio || !categoria) {
            alert('Por favor complete los campos obligatorios');
            return;
        }

        agregarProducto({
            nombre,
            descripcion,
            precio: parseFloat(precio),
            estado,
            categoria,
            urlFotografia: selectImage || 'https://placeholder.com'
        });

        setNombre('');
        setDescripcion('');
        setPrecio('');
        setCategoria('Electrónica');
        setEstado('Disponible');
        setSelectImage(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Nombre"
                    placeholderTextColor="#555"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Descripcion"
                    placeholderTextColor="#555"
                    value={descripcion}
                    onChangeText={setDescripcion}
                />
                <TouchableOpacity 
                    style={styles.selectorStyle}
                    onPress={() => {
                        setEstado(estado === 'Disponible' ? 'No disponible' : 'Disponible');
                    }}
                >
                    <Text style={styles.selectorText}>{estado ? `Estado: ${estado}` : 'Estado'}</Text>
                    <View style={styles.triangle} />
                </TouchableOpacity>

                {/* Modificado a Selector de 3 de forma interactiva */}
                <TouchableOpacity 
                    style={styles.selectorStyle} 
                    onPress={cambiarCategoria}
                >
                    <Text style={styles.selectorText}>{`Categoria: ${categoria}`}</Text>
                    <View style={styles.triangle} />
                </TouchableOpacity>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Precio"
                    placeholderTextColor="#555"
                    value={precio}
                    onChangeText={setPrecio}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.imageContainer} onPress={tomarOFotoGaleria}>
                    {selectImage ? (
                        <Image source={{ uri: selectImage }} style={styles.imageFull} />
                    ) : (
                        <View style={styles.placeholderIconContainer}>
                            <View style={styles.iconSun} />
                            <View style={styles.iconMountainLeft} />
                            <View style={styles.iconMountainRight} />
                        </View>
                    )}
                </TouchableOpacity>
                <Text style={styles.imageLabel}>Fotografía Item</Text>

                <TouchableOpacity style={styles.botonGuardar} onPress={manejarGuardar}>
                    <Text style={styles.textoBoton}>Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.botonDetalleItems}
                    onPress={() => {
                        if(listaProductos.length > 0) {
                            navigation.navigate('Detalle', { producto: listaProductos[listaProductos.length - 1] });
                        } else {
                            alert('No hay productos guardados en el inventario para ver el detalle');
                        }
                    }}
                >
                    <Text style={styles.textoBoton}>Detalle Items</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingTop: 20 },
    formContainer: { alignItems: 'center', paddingBottom: 30 },
    inputStyle: {
        width: '100%',
        height: 42,
        borderWidth: 1.5,
        borderColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginBottom: 15,
        backgroundColor: '#fff'
    },
    selectorStyle: {
        width: '100%',
        height: 42,
        borderWidth: 1.5,
        borderColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        position: 'relative'
    },
    selectorText: { fontSize: 16, color: '#000', textAlign: 'center' },
    triangle: {
        position: 'absolute',
        right: 15,
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        borderTopWidth: 12,
        borderTopColor: '#b0c4de',
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderWidth: 2,
        borderColor: '#ff7f00',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        position: 'relative',
        backgroundColor: '#fff'
    },
    imageFull: { width: '100%', height: '100%', resizeMode: 'cover' },
    imageLabel: { fontSize: 11, color: '#333', marginTop: 5, marginBottom: 20 },
    placeholderIconContainer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    iconSun: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#ff7f00', position: 'absolute', top: 25, left: 35 },
    iconMountainLeft: { width: 0, height: 0, borderLeftWidth: 30, borderLeftColor: 'transparent', borderRightWidth: 30, borderRightColor: 'transparent', borderBottomWidth: 40, borderBottomColor: '#ff7f00', position: 'absolute', bottom: 10, left: 10 },
    iconMountainRight: { width: 0, height: 0, borderLeftWidth: 35, borderLeftColor: 'transparent', borderRightWidth: 35, borderRightColor: 'transparent', borderBottomWidth: 50, borderBottomColor: '#ff7f00', position: 'absolute', bottom: 10, right: 5, opacity: 0.8 },
    botonGuardar: {
        width: '55%',
        height: 42,
        backgroundColor: '#005ed3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2
    },
    botonDetalleItems: {
        width: '55%',
        height: 42,
        backgroundColor: '#2ca84c',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    textoBoton: { color: '#fff', fontWeight: '500', fontSize: 16 }
});
