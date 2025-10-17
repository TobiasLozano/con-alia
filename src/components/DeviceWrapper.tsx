
import React from 'react';

type Props = {
  children: React.ReactNode;
};

// Simple CSS-based wrapper: on desktop, center a mobile-width container; on mobile, full width.
const DeviceWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="device-frame-wrapper">
      <div className="device-frame-phone">
        {children}
      </div>
    </div>
  );
};

export default DeviceWrapper;
