"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import useFloorPlanStore from '/store/useFloorPlanStore';

const FloorPlan = dynamic(() => import('/components/FloorPlan'), { ssr: false });

const HomePage = () => {
  const { tables, moveTable, saveLayout, loadLayout, addTable, renameTable, setGuests, deleteTable } = useFloorPlanStore();

  useEffect(() => {
    loadLayout();
  }, [loadLayout]);

  const handleSave = () => {
    saveLayout();
  };

  const handleAddTable = () => {
    addTable();
  };

  return (
    <div>
      <h1>Floor Plan</h1>
      <button onClick={handleSave}>Save Layout</button>
      <button onClick={handleAddTable}>Add Table</button>
      <FloorPlan
        tables={tables}
        moveTable={moveTable}
        renameTable={renameTable}
        setGuests={setGuests}
        deleteTable={deleteTable}
      />
    </div>
  );
};

export default HomePage;
