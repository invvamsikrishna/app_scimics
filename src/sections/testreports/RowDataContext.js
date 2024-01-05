import React, { createContext, useContext, useState } from 'react';

const RowDataContext = createContext();

export const RowDataProvider = ({ children }) => {
  const [rowData, setRowData] = useState(null);
  const setRowDataValue = (data) => {
    setRowData(data);
  };
  return (
    <RowDataContext.Provider value={{ rowData, setRowData: setRowDataValue }}>
      {children}
    </RowDataContext.Provider>
  );
};

export const useRowData = () => {
  const context = useContext(RowDataContext);
  if (!context) {
    throw new Error('useRowData must be used within a RowDataProvider');
  }
  return context;
};