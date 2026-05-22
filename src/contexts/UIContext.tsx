import React, { createContext, useContext, useState } from 'react';

interface UIContextValue {
  selectedRoomId: number | null;
  selectRoom: (roomId: number | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectRoom = (roomId: number | null) => {
    setSelectedRoomId(roomId);
    setIsDrawerOpen(false); // Close drawer automatically when a room is selected
  };

  return (
    <UIContext.Provider
      value={{
        selectedRoomId,
        selectRoom,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
