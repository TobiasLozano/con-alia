import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Rol = 'Cliente' | 'Prestador';

interface Usuario {
  id: number;
  nombre: string;
  rol: Rol;
}

interface RolContextType {
  rolActual: Rol;
  cambiarRol: (rol: Rol) => void;
  usuario: Usuario;
}

const usuarioMock: Usuario = {
  id: 1,
  nombre: 'Juan Pérez',
  rol: 'Cliente',
};

const RolContext = createContext<RolContextType | undefined>(undefined);

export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error('useRol debe usarse dentro de RolProvider');
  return ctx;
};

export const RolProvider = ({ children }: { children: ReactNode }) => {
  const [rolActual, setRolActual] = useState<Rol>(usuarioMock.rol);
  const [usuario, setUsuario] = useState<Usuario>(usuarioMock);

  const cambiarRol = (rol: Rol) => {
    setRolActual(rol);
    setUsuario((u) => ({ ...u, rol }));
  };

  return (
    <RolContext.Provider value={{ rolActual, cambiarRol, usuario }}>
      {children}
    </RolContext.Provider>
  );
};
