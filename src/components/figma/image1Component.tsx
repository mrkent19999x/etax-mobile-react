import React from 'react';

/**
 * Component được sinh từ Figma node: image 1
 * Type: RECTANGLE
 * ID: 9:3
 */
const image1Component: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* image 1 - RECTANGLE */}
      <div 
        className="absolute bg-etax-surface rounded-ios shadow-ios"
        style={{
          width: '1131px',
          height: '2448px',
          left: '1171px',
          top: '-18375px'
        }}
      >
        {/* Content placeholder */}
        <div className="p-4 text-center text-etax-text">
          image 1
        </div>
      </div>
    </div>
  );
};

export default image1Component;
