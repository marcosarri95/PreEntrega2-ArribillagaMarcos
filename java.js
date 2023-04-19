
let fin = false;
let opcion;
let pasajes;
let pago;
let origen;
let destino;
let malaEleccion = false;
let bandera = false;
const arrib = ["BUENOS AIRES", "TENESSE", "NEW YORK", "PARANA","CORDOBA", "ROSARIO", "MOSKU","BARCELONA", "MADRID"];

function localidades(arrib){
    for (let i=0;i<arrib.length;i++){
        console.log(arrib[i]);
    }
}

function PedirDatosPersonales(){
    const nombre = prompt("Ingrese su nombre");
    const apellido = prompt("Ingrese su apellido");
    const DNI = prompt("Ingrese su DNI");
    const fnac = prompt("Ingrese su fecha de nacimiento en formato XX/XX/XXXX")
    const nacionalidad = prompt("Ingrese su nacionalidad");
    const clientex = new Cliente(nombre,apellido,DNI,fnac,nacionalidad);
    return clientex;
                                        // console.log("Datos de los clientes:");
                                        // for(const cliente of clientes){
                                        //     console.log(cliente.nombre);
                                        //     console.log(cliente.apellido);
                                        //     console.log(cliente.DNI);
                                        //     console.log(cliente.fnac);
                                        //     console.log(cliente.nacionalidad);
                                        // }
                        
}

function PedirDatosTarjeta(){
    const nTarjeta = prompt("Ingrese los 16 numeros de su tarjeta sin espacios");
    const fVenc = prompt("Ingrese la fecha de vencimiento en formato XX/XX");
    const NTitular = prompt("Ingrese nombre y apellido del titular");
    const codSeg = prompt("Ingrese el codigo de seguridad de la tarjeta")
    const tarjetax = new Tarjeta(nTarjeta,fVenc,NTitular,codSeg);
    return tarjetax;
}

function MuestraClientesYViaje(clientes, viaje){
console.log("Pasajes para "+viaje.cantidad+" persona/s");
console.log("Origen: "+viaje.origen.toUpperCase());
console.log("Destino: "+viaje.destino.toUpperCase());
for(const cliente of clientes){
        console.log("Nombre: "+cliente.nombre);
        console.log("Apellido: "+cliente.apellido);
        console.log("DNI: "+cliente.DNI);
        console.log("Fecha de nacimiento: "+cliente.fnac);
        console.log("Nacionalidad: "+cliente.nacionalidad);
    }

}

class Cliente{
    constructor(nombre, apellido, DNI, fnac ,nacionalidad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.DNI = DNI;
        this.fnac = fnac;
        this.nacionalidad = nacionalidad;
    }
    
}

class viaje{
    constructor(origen, destino, cantidad){
        this.origen=origen.toUpperCase();
        this.destino=destino.toUpperCase();
        this.cantidad = parseInt(cantidad);
    }

valorViaje(dolarof){

    let valor = Math.round((Math.random()*500 + 1000)*this.cantidad); //obtiene el valor del viaje en dolares.
    
    return Math.round((valor*dolarof*1.3)*1.35);
}

}

class Tarjeta{
    constructor(nTarjeta, fVenc, NTitular, codSeg){
        this.nTarjeta = nTarjeta;
        this.fVenc = fVenc;
        this.NTitular = NTitular;
        this.codSeg = codSeg;
    }
}

do{ 
    console.clear();
    console.log("¡Sea bienvenido a vuelos Dionisio, el mejor lugar para comprar tus pasajes de avión!");
    console.log("¿Desea continuar hacia la compra de los pasajes o consultar nuestra lista de vuelos?");
    opcion = prompt("Para consultar nuestra lista de vuelos ingrese 1, para continuar hacia la compra de pasajes ingrese 2");

    switch(opcion){
            case '1':
                console.log("Lista de destinos diponible");
                localidades(arrib);
            break;


            case '2':
                                console.clear();
                                pasajes = prompt("¿Cuantos pasajes desea comprar?")
                                console.log("¿Desde que localidad desea despegar?");
                                console.log("Lista de localidades disponibles");
                                localidades(arrib);
                                do{
                                origen = prompt("Ingrese alguna localidad dentro de la lista disponible de donde despegar");
                                //aqui evaluaremos si la localidad ingresada por el usuario está dentro de la lista
                                if(arrib.some((el) => el == origen.toUpperCase())){
                                    console.log("¿Hacia que localidad desea ir?");
                                    console.log("Lista de localidades disponibles");
                                    localidades(arrib);
                                    destino = prompt("Ingrese alguna localidad dentro de la lista disponible para destino");
                                    if(arrib.some((el) => el == destino.toUpperCase())){
                                        bandera = true;
                                    }
                                    else{
                                        console.log("No existe la localidad ingresada");    
                                    }
                                }
                                else{
                                    console.log("No existe la localidad ingresada para despegar");
                                }
                            }while (bandera==false);

                            //una vez teniendo la cantidad de pasajes, el origen y el destino se crea el un objeto de la clase viaje
                                const via = new viaje(origen, destino,pasajes);
                                console.clear();

                            //luego se le solicitan al usuario los datos personales, para ello se crea una instancia de la clase Cliente, y se coloca
                            // dentro de un vector de objetos, que en este caso será solamente de clientes.    
                                const clientes = [];
                                for(let i=0;i<pasajes;i++){
                                const clientex = PedirDatosPersonales();
                                clientes.push(clientex);
                                }
                            
                            //luego de cargar los datos personales, se procederá a realizar el cobro mediante tarjeta de crédito/débito.
                                let interes = Math.round((Math.random()*10 + 15)*100)/100; //Genera un interes aleaotorio entre 10 y 25, con 2 decimales
                                let dolarof = Math.round((Math.random()*100 + 200)*100)/100; //genera un valor de dolar oficial entre 200 y 300, con 2 decimales
                                let valor = via.valorViaje(dolarof); //invoca al método de la clase viaje para calcular el precio el viaje, con el dolar oficial y los impuestos
                                let cuotas;
                                let ok = false;
                                bandera = false;

                                do{
                                console.log("Metodo de pago:")
                                console.log("1 - Tarjeta de débito (sin recargo)");
                                console.log("2 - Tarjeta de crédito (con recargo)");
                                const ele = prompt("Elija su método de pago");
                                switch(ele){
            
                                    case '1':
                                        console.log("El valor del viaje es de $" + valor);
                                        bandera = true;
                                        break;
                                    case '2':
                                        do{
                                            cuotas = parseInt(prompt("Indique la cantidad de cuotas a pagar el viaje. La cantidad máxima de cuotas permitida es de 12"));
                                            if(cuotas<=12 && cuotas>=1){console.log("EL interés es de %" + interes);
                                            let pFinal = Math.round(valor*(1 + (interes/100)));
                                            console.log("El valor total del viaje es de $" + pFinal);
                                            console.log("El valor de cada cuota es de $" + Math.round(pFinal/cuotas) +" con una cantidad de "+cuotas+" cuotas");
                                            ok = true;
                                            bandera = true;
                                        }
                                            else{
                                                console.log("La cantidad de cuotas no puede ser mayor a 12, ni menor a 1");
                                                ok = false;
                                            }
                                        }while(ok == false);
                                        
                                    break;
                                    default:
                                            console.log("Opción incorrecta, por favor repita la operación");
                                    break;
                                }
                                }while(bandera==false);

                                const tarjetax = PedirDatosTarjeta();
                                MuestraClientesYViaje(clientes, via);
                                console.log("Disfrute de su viaje!");

                                break;
                     
            
            default:
                                    console.clear();
                                    console.log("Opción errónea, por favor, vuelva a intentar la elección");
                                    malaEleccion=true;
            break;
            }
                if(malaEleccion==false){
                    do{
                        opcion = prompt("¿Desea usted continuar comprando pasajes?, 'S' para comprar nuevamente, 'N' para no");
                        if (opcion.toUpperCase() == 'S'){
                            fin = false;
                            console.clear();
                        }
                        else if (opcion.toUpperCase() == 'N'){
                            fin = true;
                            console.clear();
                            console.log("Gracias por comprar, vuelva pronto!");   
                        }
                        else{
                            console.log("Opcion incorrecta, elija S o N"); 
                        }
                    } while (opcion.toUpperCase()!='S' && opcion.toUpperCase()!='N');
                }
                else{
                    fin = false;
                    malaEleccion=false;
                }
                

}while (fin == false);


