import React from 'react';
import '../../styles/stack.css';

export default function StackSection({ id, number, title, zIndex, children, className = '' }) {
  return (
    <div 
      id={id} 
      className={`stack-section-wrapper ${className}`}
      style={{ zIndex: zIndex }}
    >
      <div className="stack-section-inner">
        {children}
      </div>
    </div>
  );
}
