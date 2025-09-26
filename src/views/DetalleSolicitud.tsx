import React, { useState } from 'react';
import { Card, Button, Input } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface DetalleSolicitudProps {
  solicitud: {
    id: number;
    cliente: string;
    servicio: string;
    descripcion: string;
    precio: number;
  };
  onBack: () => void;
}

const DetalleSolicitud: React.FC<DetalleSolicitudProps> = ({ solicitud, onBack }) => {
  const [oferta, setOferta] = useState('');
  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <Button fill="none" onClick={onBack} style={{ marginRight: 8 }}>
          <LeftOutline style={{ fontSize: 22 }} />
        </Button>
        <span style={{ fontWeight: 600, fontSize: 18 }}>Detalle de solicitud</span>
      </div>
      <Card style={{ marginBottom: 12 }}>
        <div><b>Cliente:</b> {solicitud.cliente}</div>
        <div><b>Servicio:</b> {solicitud.servicio}</div>
        <div><b>Descripción:</b> {solicitud.descripcion}</div>
        <div><b>Precio sugerido:</b> ${solicitud.precio}</div>
      </Card>
      <div style={{ marginBottom: 12 }}>
        <MapContainer center={[10.96854, -74.78132]} zoom={13} style={{ height: 200, width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[10.96854, -74.78132]}>
            <Popup>Barranquilla</Popup>
          </Marker>
        </MapContainer>
      </div>
      <Card>
        <div style={{ marginBottom: 8 }}><b>Ofrecer precio</b></div>
        <Input
          value={oferta}
          onChange={setOferta}
          placeholder="Escribe tu oferta..."
          type="number"
        />
        <Button color="primary" style={{ marginTop: 12 }}>Enviar oferta</Button>
      </Card>
    </div>
  );
};

export default DetalleSolicitud;