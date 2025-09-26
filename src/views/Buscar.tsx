import React from 'react';
import { List, Card, Empty, Avatar } from 'antd-mobile';
import { solicitudesMock } from '../mock/data';

const getAvatar = (id: number) => {
  // Usar jsonplaceholder para obtener avatar
  return <Avatar src={`https://i.pravatar.cc/150?img=${id}`} />;
};

const Buscar: React.FC = () => {
  return (
    <div style={{ padding: 12 }}>
      <h2>Historial de servicios solicitados</h2>
      <List>
        {solicitudesMock.length === 0 && <Empty description="No hay servicios solicitados" />}
        {solicitudesMock.map(solicitud => (
          <List.Item key={solicitud.id}>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{solicitud.descripcion}</div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Persona: {solicitud.cliente}</div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Fecha: 2025-09-26</div>
                </div>
                <div style={{ marginLeft: 12 }}>
                  {getAvatar(solicitud.id)}
                </div>
              </div>
            </Card>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Buscar;
