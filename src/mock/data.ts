export interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  calificacion: number;
}

export interface SolicitudCliente {
  id: number;
  cliente: string;
  servicio: string;
  descripcion: string;
  precio: number;
}

export interface Notificacion {
  id: number;
  mensaje: string;
  fecha: string;
}

export const serviciosMock: Servicio[] = [
  {
    id: 1,
    titulo: 'Plomería',
    descripcion: 'Reparación de fugas y tuberías',
    precio: 500,
    calificacion: 4.7,
  },
  {
    id: 2,
    titulo: 'Electricidad',
    descripcion: 'Instalaciones y reparaciones eléctricas',
    precio: 700,
    calificacion: 4.5,
  },
  {
    id: 3,
    titulo: 'Carpintería',
    descripcion: 'Muebles y arreglos de madera',
    precio: 600,
    calificacion: 4.8,
  },
];

export const solicitudesMock: SolicitudCliente[] = [
  {
    id: 1,
    cliente: 'Ana López',
    servicio: 'Plomería',
    descripcion: 'Fuga en el baño',
    precio: 500,
  },
  {
    id: 2,
    cliente: 'Carlos Ruiz',
    servicio: 'Electricidad',
    descripcion: 'No funciona un enchufe',
    precio: 700,
  },
];

export const notificacionesMock: Notificacion[] = [
  {
    id: 1,
    mensaje: 'Tu servicio fue aceptado',
    fecha: '2025-09-25',
  },
  {
    id: 2,
    mensaje: 'Nuevo curso disponible',
    fecha: '2025-09-24',
  },
];
