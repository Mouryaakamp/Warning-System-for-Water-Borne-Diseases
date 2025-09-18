import React from 'react';

export function ThemedView({ style, lightColor, darkColor, ...otherProps }) {
  const backgroundColor = lightColor || '#fff'; // Default background color

  return (
    <div 
      style={{ backgroundColor, ...style }} 
      {...otherProps} 
    />
  );
}