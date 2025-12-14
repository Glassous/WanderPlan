import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const rainforestTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom right, #f7fee7, #d9f99d, #166534)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '0%', 
          left: '0%', 
          width: '50vw', 
          height: '50vw', 
          background: '#86efac', 
          filter: 'blur(90px)', 
          opacity: 0.4 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          bottom: '-10%', 
          right: '-10%', 
          width: '60vw', 
          height: '60vw', 
          background: '#14532d', 
          filter: 'blur(80px)', 
          opacity: 0.4 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          top: '40%', 
          left: '40%', 
          width: '40vw', 
          height: '40vw', 
          background: '#4ade80', 
          filter: 'blur(120px)', 
          opacity: 0.25 
        } 
      },
      // Sun rays
      {
        type: 'gradient',
        style: {
          top: '-20%',
          right: '20%',
          width: '20%',
          height: '80%',
          background: 'linear-gradient(195deg, rgba(255,255,255,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'rotate(-20deg)',
          opacity: 0.3
        }
      }
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #022c22, #064e3b, #052e16)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '20%', 
          left: '15%', 
          width: '8px', 
          height: '8px', 
          background: '#bef264', 
          boxShadow: '0 0 15px 3px #bef264', 
          borderRadius: '50%', 
          animation: 'float 6s infinite ease-in-out' 
        } 
      }, // Firefly
      { 
        type: 'circle', 
        style: { 
          top: '40%', 
          right: '25%', 
          width: '6px', 
          height: '6px', 
          background: '#a3e635', 
          boxShadow: '0 0 12px 2px #a3e635', 
          borderRadius: '50%', 
          animation: 'float 8s infinite ease-in-out 1s' 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          bottom: '30%', 
          left: '40%', 
          width: '5px', 
          height: '5px', 
          background: '#bef264', 
          boxShadow: '0 0 10px 2px #bef264', 
          borderRadius: '50%', 
          animation: 'float 10s infinite ease-in-out 2s' 
        } 
      },
      { 
        type: 'gradient', 
        style: { 
          bottom: '0', 
          width: '100%', 
          height: '50%', 
          background: 'linear-gradient(to top, #022c22, transparent)', 
          opacity: 0.8 
        } 
      }
    ]
  }
};
