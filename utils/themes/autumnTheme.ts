import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const autumnTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom, #fff7ed 0%, #ffedd5 40%, #fdba74 100%)',
    shapes: [
      COMMON_SHAPES.sun,
      { 
        type: 'circle', 
        style: { 
          top: '-20%', 
          left: '20%', 
          width: '60vw', 
          height: '60vw', 
          background: '#fb923c', 
          filter: 'blur(90px)', 
          opacity: 0.2 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          bottom: '-10%', 
          right: '-10%', 
          width: '70vw', 
          height: '70vw', 
          background: '#ea580c', 
          filter: 'blur(100px)', 
          opacity: 0.3 
        } 
      },
      // Falling leaves hints
      { type: 'rect', style: { top: '15%', left: '10%', width: '8px', height: '8px', background: '#c2410c', transform: 'rotate(15deg)', opacity: 0.6 } },
      { type: 'rect', style: { top: '35%', left: '80%', width: '10px', height: '10px', background: '#d97706', transform: 'rotate(-25deg)', opacity: 0.5 } },
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #271a0c, #431407, #7c2d12)',
    shapes: [
      COMMON_SHAPES.stars,
      { 
        type: 'circle', 
        style: { 
          bottom: '0', 
          width: '100%', 
          height: '40%', 
          background: 'linear-gradient(to top, #451a03, transparent)', 
          opacity: 0.8 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          top: '40%', 
          left: '30%', 
          width: '300px', 
          height: '300px', 
          background: '#9a3412', 
          filter: 'blur(120px)', 
          opacity: 0.2 
        } 
      }
    ]
  }
};
