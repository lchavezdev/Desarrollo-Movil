import React, { useState } from "react";
import { useRecetas } from "../Providers/ProviderReceta";
import { Button, TextInput, View, Text } from "react-native";
import { Receta } from "../Modelos/Receta";


export default function FormularioReceta() {
    const [platillo, setPlatillo] = useState<string>("");
    const [ing1, setIng1] = useState<string>("");
    const [ing2, setIng2] = useState<string>("");
    const [ing3, setIng3] = useState<string>("");
    const [ing4, setIng4] = useState<string>("");
    const [ing5, setIng5] = useState<string>("");
    const [fecha, setFecha] = useState<string>("");

    const { receta, agregarReceta } = useRecetas();

    function agregarHandler() {

        if (platillo.trim() === "") {
            alert("Error, ingrese el nombre del platillo");
            return;
        }


        let listaIngredientes: string[] = [ing1, ing2, ing3, ing4, ing5]
        let recetaNueva: Receta = {
            id: (receta.length + 1).toString(),
            platillo: platillo,
            ingredientes: listaIngredientes,
            fecha: new Date()
        }
        agregarReceta(recetaNueva.platillo, recetaNueva.ingredientes, recetaNueva.fecha);
        alert("Receta agregada correctamente");
        setPlatillo("");
        setIng1("");
        setIng2("");
        setIng3("");
        setIng4("");
        setIng5("");
        setFecha(fecha);
    }
    return (
        <>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
                Registro de Recetas
            </Text>

            <TextInput
                placeholder="Ingrese Nombre del Platillo"
                value={platillo}
                onChangeText={setPlatillo}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 10, backgroundColor: "#fff" }}
            />

            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
                Ingredientes
            </Text>

            <TextInput
                placeholder="Ingrediente 1"
                value={ing1}
                onChangeText={setIng1}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 5, backgroundColor: "#fff" }}
            />
            <TextInput
                placeholder="Ingrediente 2"
                value={ing2}
                onChangeText={setIng2}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 5, backgroundColor: "#fff" }}
            />
            <TextInput
                placeholder="Ingrediente 3"
                value={ing3}
                onChangeText={setIng3}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 5, backgroundColor: "#fff" }}
            />
            <TextInput
                placeholder="Ingrediente 4"
                value={ing4}
                onChangeText={setIng4}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 5, backgroundColor: "#fff" }}
            />
            <TextInput
                placeholder="Ingrediente 5"
                value={ing5}
                onChangeText={setIng5}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 5, backgroundColor: "#fff" }}
            />
            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
                Fecha de creacion
            </Text>
            <TextInput
                placeholder="Ej. 2026-08-17"
                value={fecha}
                onChangeText={setFecha}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 10, backgroundColor: "#fff" }}
            />
            <View style={{ marginVertical: 20, marginBottom: 50 }}>
                <Button title="Agregar Receta" onPress={agregarHandler} />
            </View>
        </>
    )
}
