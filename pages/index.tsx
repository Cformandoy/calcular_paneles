import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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


export default function Home() {

  const {handleSubmit} = useForm<FormData>();


  const onSubmit = (data: FormData) => {
    console.log(data)
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
                  <Input type="number" id="largoPanel" placeholder="Ingrese el largo del panel" />
                </div>
                <div className="mt-2">
                  <Label className="text-muted-foreground" htmlFor="anchoPanel">Ancho</Label>
                  <Input type="number" id="anchoPanel" placeholder="Ingrese el ancho del panel" />
                </div>
              </div>
              <div className="mt-6">
                <h2>Techo</h2>
                <div className="mt-2">
                  <Label className="text-muted-foreground" htmlFor="largoTecho">Largo</Label>
                  <Input type="number" id="largoTecho" placeholder="Ingrese el largo del techo" />
                </div>
                <div className="mt-2">
                  <Label className="text-muted-foreground" htmlFor="anchoTecho">Ancho</Label>
                  <Input type="number" id="anchoTecho" placeholder="Ingrese el ancho del techo" />
                </div>
              </div>


              <Button type="submit" className="mt-6" style={{width:'100%'}}>Calcular</Button>
            </form>
          </CardContent>
        </Card>

      </div>
      <div className="col-span-3">
        Techo Paneles
      </div>
      </div>
    </>
  );
}
