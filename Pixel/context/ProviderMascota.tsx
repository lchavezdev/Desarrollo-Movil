import React, { useContext, useState, useEffect } from 'react';
import { MascotaContext } from './MascotaContext';
import { Indicador, EntradaBitacora } from '../Modelos/MascotaInterface';
import { ViewReact } from '../Modelos/ViewReact';

export default function ProviderMascota({ children }: ViewReact) {
  const [nombre, setNombre] = useState<string>('Pixel');
  const [alimento, setAlimento] = useState<number>(60);
  const [energia, setEnergia] = useState<number>(60);
  const [animo, setAnimo] = useState<number>(60);
  const [modoNoche, setModoNoche] = useState<boolean>(false);
  const [bitacora, setBitacora] = useState<EntradaBitacora[]>([]);
  const [estadoAnimo, setEstadoAnimo] = useState<string>('Normal');
  const [necesitaAyuda, setNecesitaAyuda] = useState<boolean>(false);
  const [puedeJugar, setGridPuedeJugar] = useState<boolean>(true);

  const indicadores: Indicador[] = [
    { tipo: 'Alimento', valor: alimento },
    { tipo: 'Energia', valor: energia },
    { tipo: 'Animo', valor: animo },
  ];

  useEffect(() => {
    const ayuda = alimento === 0 || energia === 0 || animo === 0;
    setNecesitaAyuda(ayuda);
    setGridPuedeJugar(energia >= 15);

    const promedio = (alimento + energia + animo) / 3;
    if (ayuda) setEstadoAnimo('critico');
    else if (promedio < 40) setEstadoAnimo('decaido');
    else if (promedio > 75) setEstadoAnimo('feliz');
    else setEstadoAnimo('Normal');
  }, [alimento, energia, animo]);

  const agregarBitacora = (mensaje: string) => {
    const formatoHora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const nuevaEntrada: EntradaBitacora = { mensaje, hora: formatoHora };
    setBitacora((prev) => [nuevaEntrada, ...prev]);
  };

  const alimentar = () => {
    setAlimento(Math.min(100, alimento + 20));
    setEnergia(Math.max(0, energia - 5));
    setAnimo(Math.min(100, animo + 5));
    agregarBitacora('comio un pescadito');
  };

  const jugar = () => {
    if (!puedeJugar) return;
    setAlimento(Math.max(0, alimento - 10));
    setEnergia(Math.max(0, energia - 15));
    setAnimo(Math.min(100, animo + 20));
    agregarBitacora('Esta feliz jugando');
  };

  const descansar = () => {
    const gananciaEnergia = modoNoche ? 40 : 25;
    setAlimento(Math.max(0, alimento - 10));
    setEnergia(Math.min(100, energia + gananciaEnergia));
    setAnimo(Math.max(0, animo - 5));
    agregarBitacora(modoNoche ? 'Durmio profundamente en modo noche' : 'Tomo una siesta');
  };

  const reiniciar = () => {
    setAlimento(60);
    setEnergia(60);
    setAnimo(60);
    setBitacora([]);
  };

  const alternarModoNoche = () => setModoNoche(!modoNoche);

  return (
    <MascotaContext.Provider
      value={{
        nombre,
        cambiarNombre: setNombre, // Vinculamos setNombre para que sea editable
        indicadores,
        estadoAnimo,
        necesitaAyuda,
        puedeJugar,
        modoNoche,
        alternarModoNoche,
        bitacora,
        alimentar,
        jugar,
        descansar,
        reiniciar,
      }}
    >
      {children}
    </MascotaContext.Provider>
  );
}

export const useMascota = () => {
  return useContext(MascotaContext);
};
