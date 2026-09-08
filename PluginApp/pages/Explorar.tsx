import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Explorar() {
    const [selectImage, setSelectImage] = useState<string | null>(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect:[1,1],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setSelectImage(result.assets[0].uri);
        }
    };

    const tomarFoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect:[1,1],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setSelectImage(result.assets[0].uri);
        }
    };

    const manejarEnviar = () => {
        console.log('datos:', { nombre, apellido, edad, selectImage });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reservar Paquete</Text>
            <Text style={styles.subtitle}>Complete sus datos y suba su foto de la DNI</Text>

            <Text style={styles.label}>Nombre</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Ingrese su nombre" 
                value={nombre}
                onChangeText={setNombre}
            />

            <Text style={styles.label}>Apellido</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Ingrese su apellido" 
                value={apellido}
                onChangeText={setApellido}
            />

            <Text style={styles.label}>Edad</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Ej: 25" 
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric" 
            />

            <Text style={styles.label}>Foto de DNI</Text>
            <View style={styles.imageContainer}>
                {selectImage ? (
                    <Image source={{ uri: selectImage }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholderText}>Añadir foto</Text>
                )}
            </View>

            <View style={styles.botonSpace}>
                <Button title="Seleccionar de Galeria" onPress={pickImage} />
            </View>
            <View style={styles.botonSpace}>
                <Button title="Tomar Foto" onPress={tomarFoto} />
            </View>
            
            <TouchableOpacity style={styles.botonEnviar} onPress={manejarEnviar}>
                <Text style={styles.textoBoton}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50,         
        paddingHorizontal: 20,   
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
        width: '100%',
        height: 120,         
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        overflow: 'hidden',
    },
    placeholderText: {
        color: '#888888',
        fontSize: 14,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    botonSpace: {
        marginBottom: 10,       
    },
    botonEnviar: {
        backgroundColor: '#22c55e', 
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBoton: {
        color: '#FFFFFF',          
        fontSize: 16,
        fontWeight: 'bold',
    }
});
