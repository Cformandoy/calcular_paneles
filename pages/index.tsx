import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
            <CardTitle>titulo</CardTitle>
            <CardDescription>desc</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button type="submit" style={{width:'100%'}}>Calcular</Button>
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
