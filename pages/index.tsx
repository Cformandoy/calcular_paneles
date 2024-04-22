import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const {register, handleSubmit, formState: { errors }} = useForm<FormData>();
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
    const totalPaneles = Math.floor(areaTecho/areaPanel);

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
    setTechoStyle({ width: techo.ancho * SCALE_FACTOR + 'px', height: techo.largo * SCALE_FACTOR + 'px'})

    // Aplica el estilo y dimensiones para los paneles
    setPanelStyle({ width: panel.ancho * SCALE_FACTOR + 'px', height: panel.largo * SCALE_FACTOR + 'px' });

  }
  return(
    <>
      <div className="grid grid-cols-4 gap-4" style={{ height: '100vh', padding: '1rem' }}>

      <div className="col-span-1">
        <Card style={{ width:'100%', height:'100%'}}>
          <CardHeader>
            <CardTitle>¿Cuántos paneles caben?</CardTitle>
            <CardDescription>Ingrese las medidas de los paneles y del techo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <h2>Panel</h2>
                <div className="mt-2">
                  <Label className="text-muted-foreground" htmlFor="largoPanel">Largo</Label>
                  <Input type="number" id="largoPanel" placeholder="Ingrese el largo del panel" {...register("panel.largo", { required: true, valueAsNumber: true })} />
                  {errors.panel?.largo && <span className="text-red-500">El largo del panel es requerido</span>}
                </div>
                <div className="mt-2">
                  <Label className="text-muted-foreground" htmlFor="anchoPanel">Ancho</Label>
                  <Input type="number" id="anchoPanel" placeholder="Ingrese el ancho del panel" {...register("panel.ancho", { required: true, valueAsNumber: true })} />
                  {errors.panel?.ancho && <span className="text-red-500">El ancho del panel es requerido</span>}

                </div>
              </div>
              <div className="mt-6">
                <h2>Techo</h2>
                <div className="mt-2">
                  <Label className="text-muted-foreground" htmlFor="largoTecho">Largo</Label>
                  <Input type="number" id="largoTecho" placeholder="Ingrese el largo del techo" {...register("techo.largo", { required: true, valueAsNumber: true })} />
                  {errors.techo?.largo && <span className="text-red-500">El largo del techo es requerido</span>}

                </div>
                <div className="mt-2">
                  <Label className="text-muted-foreground" htmlFor="anchoTecho">Ancho</Label>
                  <Input type="number" id="anchoTecho" placeholder="Ingrese el ancho del techo" {...register("techo.ancho", { required: true, valueAsNumber: true })} />
                  {errors.techo?.ancho && <span className="text-red-500">El ancho del techo es requerido</span>}

                </div>
              </div>


              <Button type="submit" className="mt-6" style={{width:'100%'}}>Calcular</Button>
            </form>
            <br />
            {`Total Paneles ${totalPaneles}`}
            <br />
            {`Total Paneles Verticales ${totalPanelesVerticales}`}
            <br />
            {`Total Paneles Horizontales ${totalPanelesHorizontales}`}
          </CardContent>
        </Card>

      </div>
      <div className="col-span-3">
        <div 
          id="techo"
          style={{
            width:techoStyle.width,
            height:techoStyle.height,
            outline: '4px solid black',
            display:'flex',
            flexWrap:'wrap'
          }}
        >
          {
            Array.from(Array(totalPanelesVerticales), (e,i) =>{
              return <div
                key={`panel-vertical-${i}`}
                style={{
                  width:panelStyle.width,
                  height:panelStyle.height,
                  backgroundColor:'blue',
                  outline:'1px solid white',
                }}
              />
            })
          }
        </div>
      </div>
      </div>
    </>
  );
}
