import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const rainforestTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom right, #f0fdf4, #bbf7d0, #166534)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '-10%', 
          left: '-10%', 
          width: '60vw', 
          height: '60vw', 
          background: '#86efac', 
          filter: 'blur(80px)', 
          opacity: 0.4 
        } 
      }, // Canopy light
      { 
        type: 'circle', 
        style: { 
          bottom: '10%', 
          right: '-5%', 
          width: '50vw', 
          height: '50vw', 
          background: '#15803d', 
          filter: 'blur(60px)', 
          opacity: 0.5 
        } 
      }, // Deep green
      // Leaf-like shapes
      { type: 'circle', style: { top: '30%', left: '0%', width: '30vw', height: '15vh', background: '#4ade80', borderRadius: '0 100% 0 100%', transform: 'rotate(-20deg)', filter: 'blur(40px)', opacity: 0.3 } },
      { type: 'circle', style: { top: '10%', right: '0%', width: '40vw', height: '20vh', background: '#22c55e', borderRadius: '100% 0 100% 0', transform: 'rotate(15deg)', filter: 'blur(50px)', opacity: 0.25 } },
      // Sunbeams
      {
        type: 'gradient',
        style: {
          top: '-20%',
          right: '20%',
          width: '10%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 80%)',
          filter: 'blur(30px)',
          transform: 'rotate(-25deg)',
          opacity: 0.4
        }
      },
      {
        type: 'gradient',
        style: {
          top: '-20%',
          right: '35%',
          width: '8%',
          height: '90%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 80%)',
          filter: 'blur(30px)',
          transform: 'rotate(-25deg)',
          opacity: 0.3
        }
      }
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #022c22, #064e3b, #065f46)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          bottom: '0', 
          width: '100%', 
          height: '60%', 
          background: 'linear-gradient(to top, #022c22, transparent)', 
          opacity: 0.9 
        } 
      }, // Deep forest shadow
      // Fireflies with varied sizes and animations
      { 
        type: 'circle', 
        style: { 
          top: '30%', 
          left: '20%', 
          width: '6px', 
          height: '6px', 
          background: '#d9f99d', 
          boxShadow: '0 0 10px 2px #d9f99d', 
          borderRadius: '50%', 
          animation: 'float 5s infinite ease-in-out' 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          top: '60%', 
          right: '15%', 
          width: '4px', 
          height: '4px', 
          background: '#bef264', 
          boxShadow: '0 0 8px 2px #bef264', 
          borderRadius: '50%', 
          animation: 'float 7s infinite ease-in-out 1s' 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          bottom: '20%', 
          left: '40%', 
          width: '5px', 
          height: '5px', 
          background: '#a3e635', 
          boxShadow: '0 0 12px 3px #a3e635', 
          borderRadius: '50%', 
          animation: 'float 9s infinite ease-in-out 2s' 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          top: '45%', 
          right: '40%', 
          width: '3px', 
          height: '3px', 
          background: '#d9f99d', 
          boxShadow: '0 0 6px 1px #d9f99d', 
          borderRadius: '50%', 
          animation: 'float 6s infinite ease-in-out 3s' 
        } 
      }
    ]
  }
};
