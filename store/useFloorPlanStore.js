"use client";

import create from 'zustand';

const useFloorPlanStore = create((set, get) => ({
  tables: [
    { id: 1, left: 100, top: 100, name: "Table 1", guests: 4 },
    { id: 2, left: 200, top: 200, name: "Table 2", guests: 4 },
  ],
  moveTable: (id, left, top) => set((state) => ({
    tables: state.tables.map(table =>
      table.id === id ? { ...table, left, top } : table
    ),
  })),
  addTable: () => set((state) => {
    const newTable = {
      id: state.tables.length + 1,
      left: 50,
      top: 50,
      name: `Table ${state.tables.length + 1}`,
      guests: 4,
    };
    return { tables: [...state.tables, newTable] };
  }),
  renameTable: (id, newName) => set((state) => ({
    tables: state.tables.map(table =>
      table.id === id ? { ...table, name: newName } : table
    ),
  })),
  setGuests: (id, guests) => set((state) => ({
    tables: state.tables.map(table =>
      table.id === id ? { ...table, guests } : table
    ),
  })),
  deleteTable: (id) => set((state) => ({
    tables: state.tables.filter(table => table.id !== id),
  })),
  saveLayout: () => {
    const state = get().tables;
    localStorage.setItem('floorPlan', JSON.stringify(state));
  },
  loadLayout: () => {
    const savedState = JSON.parse(localStorage.getItem('floorPlan'));
    if (savedState) {
      set({ tables: savedState });
    }
  },
}));

export default useFloorPlanStore;
