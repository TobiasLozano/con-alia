import React from 'react';
import { Card, Button } from 'antd-mobile';
import { useRol } from '../context/RolContext';

const Cuenta: React.FC = () => {
  const { usuario, rolActual, cambiarRol } = useRol();

  const handleCambiarRol = () => {
    cambiarRol(rolActual === 'Cliente' ? 'Prestador' : 'Cliente');
  };


  return (
    <div style={{ padding: 12 }}>
      <h2>Mi cuenta</h2>
      <Card title={usuario.nombre} style={{ marginBottom: 12 }}>
        <div>ID: {usuario.id}</div>
        <div>Rol actual: {rolActual}</div>
        <Button color="primary" onClick={handleCambiarRol} style={{ marginTop: 8 }}>
          Cambiar a {rolActual === 'Cliente' ? 'Prestador' : 'Cliente'}
        </Button>
      </Card>
    </div>
  );
};

export default Cuenta;
