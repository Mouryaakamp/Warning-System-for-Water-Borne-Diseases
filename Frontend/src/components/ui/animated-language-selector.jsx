import React, { useState, useEffect } from 'react';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import { IconSymbol } from './icon-symbol';

export function AnimatedLanguageSelector({ 
  options, 
  selectedValue, 
  onValueChange, 
  placeholder = "Select an option",
  style 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');

  // Animation effect - cycles through languages every 2 seconds
  useEffect(() => {
    if (!isOpen && options.length > 0) {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        const currentOption = options[currentIndex];
        setCurrentLabel(currentOption.label);
        currentIndex = (currentIndex + 1) % options.length;
      }, 2000);

      // Set initial label
      const selectedOption = options.find(option => option.value === selectedValue);
      if (selectedOption) {
        setCurrentLabel(selectedOption.label);
      } else {
        setCurrentLabel(options[0].label);
      }

      return () => clearInterval(interval);
    }
  }, [isOpen, options, selectedValue]);

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
          {selectedOption ? selectedOption.label : currentLabel}
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
              <ThemedText type="subtitle">Select Language</ThemedText>
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