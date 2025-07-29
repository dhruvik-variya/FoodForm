import React from 'react';
import { useIsMobile } from './hooks/useIsMobile';

const ExampleComponent = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? "Mobile view" : "Desktop view"}
    </div>
  );
};

export default ExampleComponent;
