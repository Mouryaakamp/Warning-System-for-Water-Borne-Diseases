import React, { useState } from 'react';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import { IconSymbol } from './icon-symbol';

export function Dropdown({ 
  options, 
  selectedValue, 
  onValueChange, 
  placeholder = "Select an option",
  style 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <ThemedView style={{ position: 'relative', ...style }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#f9f9f9',
          minHeight: '50px',
          width: '100%',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(true)}
      >
        <ThemedText style={{
          fontSize: 16,
          flex: 1,
          ...(!selectedValue && { opacity: 0.6 })
        }}>
          {selectedOption ? selectedOption.label : placeholder}
        </ThemedText>
        <IconSymbol
          name="chevron.right"
          size={20}
          color="#666"
          style={{
            transform: isOpen ? 'rotate(270deg)' : 'rotate(90deg)',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsOpen(false)}
        >
          <ThemedView style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxHeight: '70%',
            width: '100%',
            maxWidth: '400px',
            margin: '20px',
          }}>
            <ThemedView style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              borderBottom: '1px solid #eee',
            }}>
              <ThemedText type="subtitle">Select Option</ThemedText>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '15px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <ThemedText style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#666',
                }}>✕</ThemedText>
              </button>
            </ThemedView>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {options.map((item) => (
                <button
                  key={item.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    borderBottom: '1px solid #f0f0f0',
                    width: '100%',
                    backgroundColor: selectedValue === item.value ? '#f0f8ff' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSelect(item.value)}
                >
                  <ThemedText style={{
                    fontSize: 16,
                    flex: 1,
                    ...(selectedValue === item.value && {
                      color: '#0a7ea4',
                      fontWeight: '600',
                    })
                  }}>
                    {item.label}
                  </ThemedText>
                  {selectedValue === item.value && (
                    <IconSymbol
                      name="chevron.right"
                      size={16}
                      color="#0a7ea4"
                    />
                  )}
                </button>
              ))}
            </div>
          </ThemedView>
        </div>
      )}
    </ThemedView>
  );
}
