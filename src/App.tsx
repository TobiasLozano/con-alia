import React from 'react';
import { TabBar } from 'antd-mobile';
import '/src/assets/kufam.css';

import { AppOutline, FileOutline, MessageOutline, UserOutline } from 'antd-mobile-icons';
import Inicio from './views/Inicio';
import Buscar from './views/Buscar';
import Solicitar from './views/Solicitar';
import Notificaciones from './views/Notificaciones';
import Cuenta from './views/Cuenta';
// import eliminado porque ya se importa abajo
import { RolProvider, useRol } from './context/RolContext';
// Tabs dinámicos según rol
const getTabs = (rolActual: string) => [
  { key: 'inicio', title: 'Inicio', icon: <AppOutline /> },
  { key: 'historial', title: 'Historial', icon: <FileOutline /> },
  ...(rolActual === 'Cliente' ? [{ key: 'solicitar', title: 'Solicitar', icon: <AppOutline /> }] : []),
  { key: 'notificaciones', title: 'Notificaciones', icon: <MessageOutline /> },
  { key: 'cuenta', title: 'Cuenta', icon: <UserOutline /> },
];
const palette = {
  colorPrimary: '#05668D',
  colorSecondary: '#AFC2D5',
  colorAccent: '#FFD166',
  colorDanger: '#E94F37',
  colorNeutral: '#131112',
};

const App: React.FC = () => {
  return (
      <RolProvider>
        <div className="device-frame-wrapper">
          <div className="device-frame-phone">
            <AppWithTabs />
          </div>
        </div>
      </RolProvider>
  );
};

const AppWithTabs: React.FC = () => {
  const { rolActual } = useRol();
  const [activeKey, setActiveKey] = React.useState('inicio');
  const tabs = getTabs(rolActual);
  return (
  <div className="app-main-container">
      {/* AppBar */}
      <div style={{
         height: 56,
        background: '#05668D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
 
      }}>
        <img src="/icon.png" alt="Vite Logo" style={{ height: 32, marginLeft: 16, marginRight: 16 }} />
        <div style={{ flex: 1, textAlign: 'center', marginRight: 48 }}>
          <span className="kufam" style={{ fontSize: 24, color: '#FFD166' }}>ConAlía</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', margin: 0, padding: 0 }}>
        {activeKey === 'inicio' && <Inicio />}
        {activeKey === 'historial' && <Buscar />}
        {rolActual === 'Cliente' && activeKey === 'solicitar' && <Solicitar />}
        {activeKey === 'notificaciones' && <Notificaciones />}
        {activeKey === 'cuenta' && <Cuenta />}
      </div>
      <TabBar
        activeKey={activeKey}
        onChange={setActiveKey}
        safeArea
        style={{   left: 0, right: 0, margin: 0, padding: 0 }}
      >
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default App;
