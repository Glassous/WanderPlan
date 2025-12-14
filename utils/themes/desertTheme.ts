import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const desertTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(180deg, #bae6fd 0%, #ffedd5 30%, #fdba74 60%, #ea580c 100%)',
    shapes: [
      COMMON_SHAPES.sun,
      { 
        type: 'circle', 
        style: { 
          bottom: '-15%', 
          left: '10%', 
          width: '90vw', 
          height: '40vh', 
          background: '#f97316', 
          filter: 'blur(50px)', 
          borderRadius: '50% 50% 0 0', 
          opacity: 0.7 
        } 
      }, // Dune 1
      { 
        type: 'circle', 
        style: { 
          bottom: '-10%', 
          right: '-20%', 
          width: '80vw', 
          height: '35vh', 
          background: '#c2410c', 
          filter: 'blur(40px)', 
          borderRadius: '50% 50% 0 0', 
          opacity: 0.7 
        } 
      }, // Dune 2
      {
        type: 'gradient',
        style: {
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent 80%, rgba(234, 88, 12, 0.2) 100%)',
            mixBlendMode: 'overlay'
        }
      }
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #0f172a, #312e81, #4c1d95)',
    shapes: [
      COMMON_SHAPES.stars,
      { 
        type: 'circle', 
        style: { 
          bottom: '-20%', 
          width: '130%', 
          left: '-15%', 
          height: '40vh', 
          background: '#1e1b4b', 
          filter: 'blur(30px)', 
          borderRadius: '50%' 
        } 
      }, // Dark dune
      { 
        type: 'gradient', 
        style: { 
          top: '-20%', 
          left: '20%', 
          width: '100%', 
          height: '120%', 
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)', 
          transform: 'rotate(-45deg)',
          filter: 'blur(40px)'
        } 
      } // Milky way hint
    ]
  }
};
