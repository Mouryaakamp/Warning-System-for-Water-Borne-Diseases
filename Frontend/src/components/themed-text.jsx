import React from 'react';

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) {
  const getTextStyle = () => {
    const baseStyle = {
      color: '#11181C', // Default text color
    };

    switch (type) {
      case 'title':
        return {
          ...baseStyle,
          fontSize: 28,
          fontWeight: 'bold',
          lineHeight: 28,
        };
      case 'subtitle':
        return {
          ...baseStyle,
          fontSize: 18,
          fontWeight: 'bold',
        };
      case 'defaultSemiBold':
        return {
          ...baseStyle,
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '600',
        };
      case 'link':
        return {
          ...baseStyle,
          lineHeight: 30,
          fontSize: 16,
          color: '#0a7ea4',
        };
      default:
        return {
          ...baseStyle,
          fontSize: 14,
          lineHeight: 20,
        };
    }
  };

  return (
    <span
      style={{...getTextStyle(), ...style}}
      {...rest}
    />
  );
}