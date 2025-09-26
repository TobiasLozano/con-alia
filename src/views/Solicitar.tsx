import React, { useState } from 'react';
import { Card, Form, Input, Selector, ImageUploader, Button, Toast, TextArea, Rate } from 'antd-mobile';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const categorias = [
  { label: 'Plomería', value: 'Plomería' },
  { label: 'Electricidad', value: 'Electricidad' },
  { label: 'Carpintería', value: 'Carpintería' },
];

const mockPersonas = [
  { id: 1, nombre: 'Ana López', categoria: 'Plomería', foto: 'https://i.pravatar.cc/150?img=1', puntuacion: 4.8 },
  { id: 2, nombre: 'Carlos Ruiz', categoria: 'Electricidad', foto: 'https://i.pravatar.cc/150?img=2', puntuacion: 4.6 },
  { id: 3, nombre: 'María Torres', categoria: 'Carpintería', foto: 'https://i.pravatar.cc/150?img=3', puntuacion: 4.9 },
  { id: 4, nombre: 'Luis Gómez', categoria: 'Plomería', foto: 'https://i.pravatar.cc/150?img=4', puntuacion: 4.7 },
];

const Solicitar: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [showPersonas, setShowPersonas] = useState(false);
  const [ubicacion, setUbicacion] = useState<[number, number] | null>(null);

  function LocationSelector() {
    useMapEvents({
      click(e) {
        setUbicacion([e.latlng.lat, e.latlng.lng]);
      },
    });
    return ubicacion ? <Marker position={ubicacion} /> : null;
  }

  const handleFinish = (values: any) => {
    if (!ubicacion) {
      Toast.show({ icon: 'fail', content: 'Selecciona tu ubicación en el mapa.' });
      return;
    }
    Toast.show({ icon: 'success', content: 'Solicitud enviada!' });
    setShowPersonas(true);
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Solicitar servicio</h2>
      <Card style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 16 }}>
          <b>Selecciona tu ubicación en el mapa</b>
          <MapContainer center={[10.96854, -74.78132]} zoom={13} style={{ height: 200, width: '100%', marginTop: 8 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSelector />
          </MapContainer>
        </div>
        <Form layout="vertical" onFinish={handleFinish} footer={<Button block type="submit" color="primary">Solicitar</Button>}>
          <Form.Item name="categoria" label="Categoría" rules={[{ required: true }]}> 
            <Selector options={categorias} multiple={false} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="titulo" label="Título del servicio" rules={[{ required: true }]}> 
            <Input placeholder="Ej: Reparación de fuga" />
          </Form.Item>
          <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}> 
            <TextArea placeholder="Describe el problema o lo que necesitas" rows={3} />
          </Form.Item>
          <Form.Item name="imagenes" label="Imágenes relacionadas">
            <ImageUploader
              value={files}
              onChange={setFiles}
              upload={file => Promise.resolve({ url: URL.createObjectURL(file) })}
              maxCount={3}
            />
          </Form.Item>
        </Form>
      </Card>
      {showPersonas && (
        <div style={{ marginTop: 24 }}>
          <h3>Personas que podrían coincidir</h3>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 12, paddingBottom: 8 }}>
            {mockPersonas.map(persona => (
              <Card key={persona.id} style={{ minWidth: 180, maxWidth: 200, flex: '0 0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={persona.foto} alt={persona.nombre} style={{ width: 64, height: 64, borderRadius: '50%' }} />
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 8 }}>{persona.nombre}</div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{persona.categoria}</div>
                  <Rate value={persona.puntuacion} readOnly allowHalf className="custom-rate" style={{ marginTop: 4 }} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitar;
