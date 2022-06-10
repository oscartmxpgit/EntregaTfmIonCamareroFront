export interface Empleado{
    idEmpleado?:number;
    dni?: string;
    pass:string;
    nombre?:string;
    direccion?:string;
    telefono?:string;
    mesas?: Mesa[];
}

export interface Mesa{
    idNegocio?: any;
    idMesa?: number;
    noMesa?:number;
    personas: number;
    consumo?:number;
    comentario?:string;
    fecha:Date;
    pedidos?: Pedido[];
    estadoPedido?: number;
}

export interface Pedido {
  idPedido?:     number;
  idMesa?: number;
  idEmpleado?: number;
  idPlato?: number;
  cantidad?: number;
  precio?: number;
  plato?: string;
  tipo?: number;
}

export interface Plato {
  idPlato?:     number;
  nombre: string;
  precio: number;
  stock:  number;
  imagen?: string;
  tipo?: number;
}

export interface OperacionCaja {
  fecha: Date;
  producto: string;
  cantidad: number;
  precio: number;
  tipoOperacion?:number;
}
