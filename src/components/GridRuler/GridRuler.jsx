import React from 'react';
import './GridRuler.css';

export default function GridRuler() {
  return (
    <div className="grid-ruler-wrapper" aria-hidden="true">
      <div className="grid-ruler-line left-line"></div>
      <div className="grid-ruler-line center-line"></div>
      <div className="grid-ruler-line right-line"></div>
    </div>
  );
}
