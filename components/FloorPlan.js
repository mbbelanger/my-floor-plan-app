"use client";

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  TABLE: 'table',
};

const Table = ({ id, left, top, name, guests, moveTable, renameTable, setGuests, deleteTable }) => {
  const [, ref] = useDrag({
    type: ItemTypes.TABLE,
    item: { id, left, top },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TABLE,
    hover(item, monitor) {
      if (item.id !== id) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const newLeft = Math.round(item.left + delta.x);
        const newTop = Math.round(item.top + delta.y);
        moveTable(item.id, newLeft, newTop);
      }
    },
  });

  const handleNameChange = (e) => {
    renameTable(id, e.target.value);
  };

  const handleGuestsChange = (e) => {
    setGuests(id, parseInt(e.target.value));
  };

  const handleDelete = () => {
    deleteTable(id);
  };

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{ position: 'absolute', left, top, border: '1px solid black', padding: '10px', backgroundColor: 'white' }}
    >
      <input type="text" value={name} onChange={handleNameChange} />
      <input type="number" value={guests} onChange={handleGuestsChange} />
      <div>Table {id}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const FloorPlan = ({ tables, moveTable, renameTable, setGuests, deleteTable }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TABLE,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveTable(item.id, left, top);
    },
  });

  return (
    <div ref={drop} style={{ width: '100%', height: '600px', position: 'relative', border: '1px solid black' }}>
      {tables.map((table) => (
        <Table key={table.id} {...table} moveTable={moveTable} renameTable={renameTable} setGuests={setGuests} deleteTable={deleteTable} />
      ))}
    </div>
  );
};

export default FloorPlan;
