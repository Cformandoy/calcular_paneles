import { useState } from "react";
import { useForm } from "react-hook-form";
import FormPaneles from "./formPaneles";

export interface FormData {
  panel: {
    largo: number;
    ancho: number;
  };
  techo: {
    largo: number;
    ancho: number;
  };
}


export interface renderStyle {
  width: string;
  height: string
}

const SCALE_FACTOR = 100; // Factor de escala para aumentar visualmente el tamaño del techo



export default function Home() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [totalPaneles, setTotalPaneles] = useState(0);
  const [totalPanelesVerticales, setTotalPanelesVerticales] = useState(0)
  const [totalPanelesHorizontales, setTotalPanelesHorizontales] = useState(0)

  const [techoStyle, setTechoStyle] = useState<renderStyle>({ width: '0px', height: '0px' });
  const [panelStyle, setPanelStyle] = useState<renderStyle>({ width: '0px', height: '0px' });

  const onSubmit = (data: FormData) => {
    const { techo, panel } = data;

    //Calcula el area del techo en metros cuadrados
    const areaTecho = techo.ancho * techo.largo;

    //Calcula el area del panel en metros cuadrados
    const areaPanel = panel.ancho * panel.largo;

    //Calcula el numero total de paneles que caben en el techo
    const totalPaneles = Math.floor(areaTecho / areaPanel);

    // Calcula el area en relacion a la direccion de los paneles
    const areaTechoPanelesVerticales = (techo.ancho * Math.trunc(techo.largo / panel.largo)) * panel.largo;
    const areaTechoPanelesHorizontales = areaTecho - areaTechoPanelesVerticales

    // Calcula la cantidad total de paneles verticales
    setTotalPanelesVerticales(Math.trunc(areaTechoPanelesVerticales / areaPanel))

    // Calcula la cantidad total de paneles horizontales
    setTotalPanelesHorizontales(Math.trunc(areaTechoPanelesHorizontales / areaPanel))

    // Setea el numero total de paneles
    setTotalPaneles(totalPaneles)

    // Aplica el estilo y dimensiones para el techo
    setTechoStyle({ width: techo.ancho * SCALE_FACTOR + 'px', height: techo.largo * SCALE_FACTOR + 'px' })

    // Aplica el estilo y dimensiones para los paneles
    setPanelStyle({ width: panel.ancho * SCALE_FACTOR + 'px', height: panel.largo * SCALE_FACTOR + 'px' });

  }
  return (
    <>
      <div className="grid grid-cols-4 gap-4" style={{ height: '100vh', padding: '1rem' }}>

        <div className="col-span-1">
          {FormPaneles(handleSubmit, onSubmit, register, errors, totalPaneles, totalPanelesVerticales, totalPanelesHorizontales)}

        </div>
        <div className="col-span-3">
          {
            techoStyle.width !== '0px' ?
              <div
                id="techo"
                style={{
                  width: techoStyle.width,
                  height: techoStyle.height,
                  outline: '4px solid black',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {
                  Array.from(Array(totalPanelesVerticales), (e, i) => {
                    return <div
                      key={`panel-vertical-${i}`}
                      style={{
                        width: panelStyle.width,
                        height: panelStyle.height,
                        backgroundColor: 'blue',
                        outline: '1px solid white',
                      }}
                    />
                  })
                }
                {
                  Array.from(Array(totalPanelesHorizontales), (e, i) => {
                    return <div
                      key={`panel-horizontal-${i}`}
                      style={{
                        width: panelStyle.height,
                        height: panelStyle.width,
                        backgroundColor: 'blue',
                        outline: '1px solid white',
                      }}
                    />
                  })
                }
              </div> : <></>
          }

        </div>
      </div>
    </>
  );
}


