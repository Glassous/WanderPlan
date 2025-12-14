import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const countrysideTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 30%, #dcfce7 60%, #bbf7d0 100%)',
    shapes: [
      COMMON_SHAPES.sun,
      { 
        type: 'circle', 
        style: { 
          bottom: '-15%', 
          left: '-20%', 
          width: '80vw', 
          height: '50vh', 
          background: '#86efac', 
          filter: 'blur(60px)', 
          borderRadius: '50%' 
        } 
      }, // Hill 1
      { 
        type: 'circle', 
        style: { 
          bottom: '-25%', 
          right: '-20%', 
          width: '90vw', 
          height: '60vh', 
          background: '#4ade80', 
          filter: 'blur(70px)', 
          borderRadius: '50%' 
        } 
      }, // Hill 2
      { 
        type: 'rect', 
        style: { 
          bottom: '20%', 
          left: '10%', 
          width: '20px', 
          height: '40px', 
          background: '#a16207', 
          opacity: 0.2,
          transform: 'skewX(-10deg)'
        } 
      }, // Tree trunk hint
      { 
        type: 'circle', 
        style: { 
          bottom: '25%', 
          left: '8%', 
          width: '50px', 
          height: '50px', 
          background: '#166534', 
          filter: 'blur(10px)', 
          opacity: 0.3
        } 
      } // Tree top hint
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #1e1b4b, #312e81, #1e3a8a)',
    shapes: [
      COMMON_SHAPES.stars,
      COMMON_SHAPES.moon,
      { 
        type: 'circle', 
        style: { 
          bottom: '-20%', 
          left: '-10%', 
          width: '120%', 
          height: '40vh', 
          background: '#111827', 
          filter: 'blur(40px)', 
          opacity: 0.8 
        } 
      }, // Dark hills
      { 
        type: 'circle', 
        style: { 
          bottom: '10%', 
          right: '20%', 
          width: '4px', 
          height: '4px', 
          background: '#fef08a', 
          boxShadow: '0 0 8px 2px #fef08a',
          animation: 'float 5s infinite'
        } 
      } // Firefly
    ]
  }
};
