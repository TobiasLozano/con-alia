import React, { useState } from 'react';
import { Card, Button, Rate, List, Empty, Selector, Avatar, Space, Modal, Input, Toast } from 'antd-mobile';
import { serviciosMock, solicitudesMock } from '../mock/data';
import DetalleSolicitud from './DetalleSolicitud';
import { useRol } from '../context/RolContext';

const categorias = [
  { label: 'Plomería', value: 'Plomería' },
  { label: 'Electricidad', value: 'Electricidad' },
  { label: 'Carpintería', value: 'Carpintería' },
];

const getAvatar = (id: number) => {
  // Usar jsonplaceholder para obtener avatar
  return <Avatar src={`https://i.pravatar.cc/150?img=${id}`} />;
};

const Inicio: React.FC = () => {
  const { rolActual } = useRol();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

  if (rolActual === 'Cliente') {
    // Filtrar servicios por categoría si está seleccionada
    const serviciosFiltrados = categoriaSeleccionada
      ? serviciosMock.filter(s => s.titulo === categoriaSeleccionada)
      : serviciosMock;

    const [modalOpen, setModalOpen] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [servicioActual, setServicioActual] = useState<any>(null);

    const handleSolicitar = (servicio: any) => {
      setServicioActual(servicio);
      setModalOpen(true);
    };

    const handleEnviar = () => {
      setModalOpen(false);
      Toast.show({ icon: 'loading', content: 'Enviando solicitud...' });
      setTimeout(() => {
        Toast.clear();
        Toast.show({ icon: 'success', content: 'Solicitud enviada' });
        setDescripcion('');
        setServicioActual(null);
      }, 2000);
    };

    return (
      <div className="app-content" style={{ padding: 12 }}>
        <h2>Servicios que puedes necesitar</h2>
        <span style={{ fontSize: 13, color: '#888' }}>
          Basados en tu ubicación, preferencias y solicitudes anteriores
        </span>
        <div style={{ margin: '16px 0' }}>
          <Selector
            options={categorias}
            value={categoriaSeleccionada ? [categoriaSeleccionada] : []}
            onChange={v => setCategoriaSeleccionada(v[0] || null)}
            style={{ width: '100%' }}
            showCheckMark={false}
            multiple={false}
          />
        </div>
        <List>
          {serviciosFiltrados.length === 0 && <Empty description="No se encontraron servicios" />}
          {serviciosFiltrados.map(servicio => (
            <List.Item key={servicio.id}>
              <Card style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* 3/4 columna: nombre y categoría */}
                  <div style={{ flex: 3, paddingRight: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{servicio.descripcion}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{servicio.descripcion}</div>
                  </div>
                  {/* 1/4 columna: avatar y estrellas */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
                    <div style={{margin:'auto'}}>
                        {getAvatar(servicio.id)}
                    </div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Username</div>

                    <div style={{marginTop: 4 }}>
                      <Rate value={servicio.calificacion} readOnly allowHalf className="custom-rate" />
                    </div>
                  </div>
                </div>
                <div style={{ margin: '12px 0' }}>
                  <div style={{ borderTop: '1px solid #eee', width: '100%' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 13, color: '#888' }}>
                    Precio estimado: ${servicio.precio}
                  </div>
                  <Button color="primary" size="small" onClick={() => handleSolicitar(servicio)}>
                    Solicitar servicio
                  </Button>
                </div>
              </Card>
            </List.Item>
          ))}
        </List>
        <Modal
          visible={modalOpen}
          title="Describe el servicio que necesitas"
          content={
            <Input
              placeholder="Describe tu necesidad"
              value={descripcion}
              onChange={setDescripcion}
              clearable
            />
          }
          closeOnMaskClick
          onClose={() => setModalOpen(false)}
          actions={[{ key: 'enviar', text: 'Enviar', onClick: handleEnviar, disabled: !descripcion }]}
        />
      </div>
    );
  }

  // Prestador
  const [detalleId, setDetalleId] = useState<number | null>(null);
  if (detalleId !== null) {
    const solicitud = solicitudesMock.find(s => s.id === detalleId);
    return <DetalleSolicitud solicitud={solicitud!} onBack={() => setDetalleId(null)} />;
  }
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const handleEspecialidad = (cat: string) => {
    setEspecialidades(prev =>
      prev.includes(cat) ? prev.filter(e => e !== cat) : [...prev, cat]
    );
  };
  return (
    <div className="app-content" style={{ padding: 12 }}>
      <h2>Solicitudes de clientes</h2>
      <List>
        {solicitudesMock.length === 0 && <Empty description="No hay solicitudes" />}
        {solicitudesMock.map(solicitud => (
          <List.Item key={solicitud.id}>
            <Card title={solicitud.servicio} style={{ marginBottom: 12 }}>
              <div>Cliente: {solicitud.cliente}</div>
              <div>Descripción: {solicitud.descripcion}</div>
              <div>Precio: ${solicitud.precio}</div>
              <Button color="primary" size="small" onClick={() => setDetalleId(solicitud.id)}>
                Ver detalle
              </Button>
            </Card>
          </List.Item>
        ))}
      </List>
      <div style={{ marginTop: 24 }}>
        <h3>Selecciona tus especialidades</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {categorias.map(cat => (
            <Button
              key={cat.value}
              color={especialidades.includes(cat.value) ? 'primary' : 'default'}
              onClick={() => handleEspecialidad(cat.value)}
              style={{ minWidth: 120 }}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
