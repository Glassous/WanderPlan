import React from 'react';

export interface ThemeShape {
  type: 'circle' | 'rect' | 'gradient';
  style: React.CSSProperties;
}

export interface ThemeConfig {
  bg: string;
  shapes: ThemeShape[];
}

export interface ThemeDefinition {
  day: ThemeConfig;
  night: ThemeConfig;
}
