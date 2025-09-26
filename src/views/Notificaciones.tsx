import { Card } from 'antd-mobile';
import { useRol } from '../context/RolContext';
const notificacionesCliente = [
  { id: 1, mensaje: 'Tu servicio fue aceptado', fecha: '2025-09-25' },
  { id: 2, mensaje: 'Nuevo curso disponible', fecha: '2025-09-24' },
  { id: 3, mensaje: 'El prestador está en camino', fecha: '2025-09-23' },
  { id: 4, mensaje: 'Tu pago fue procesado', fecha: '2025-09-22' },
  { id: 5, mensaje: 'Nueva promoción disponible', fecha: '2025-09-21' },
  { id: 6, mensaje: 'Servicio finalizado con éxito', fecha: '2025-09-20' },
  { id: 7, mensaje: 'Califica tu experiencia', fecha: '2025-09-19' },
  { id: 8, mensaje: 'Actualización de términos y condiciones', fecha: '2025-09-18' },
];
const notificacionesPrestador = [
  { id: 1, mensaje: 'Nueva solicitud disponible', fecha: '2025-09-25' },
  { id: 2, mensaje: 'Has sido calificado por un cliente', fecha: '2025-09-24' },
  { id: 3, mensaje: 'Pago recibido por servicio', fecha: '2025-09-23' },
  { id: 4, mensaje: 'Actualización de perfil', fecha: '2025-09-22' },
  { id: 5, mensaje: 'Nuevo curso para prestadores', fecha: '2025-09-21' },
  { id: 6, mensaje: 'Servicio finalizado con éxito', fecha: '2025-09-20' },
  { id: 7, mensaje: 'Promoción para prestadores', fecha: '2025-09-19' },
  { id: 8, mensaje: 'Actualización de términos y condiciones', fecha: '2025-09-18' },
];
import { RightOutline } from 'antd-mobile-icons';

const Notificaciones: React.FC = () => {
  const { rolActual } = useRol();
  const notificaciones = rolActual === 'Prestador' ? notificacionesPrestador : notificacionesCliente;
  return (
    <div style={{ padding: 12 }}>
      <h2>Notificaciones</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notificaciones.map(notif => (
          <Card key={notif.id} style={{ width: '100%', padding: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{notif.mensaje}</div>
                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{notif.fecha}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <RightOutline style={{ fontSize: 20, color: '#bbb' }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notificaciones;
