import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const ancientTownTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(180deg, #fefce8 0%, #e5e5f7 100%)',
    shapes: [
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '10%', 
          width: '15%', 
          height: '35%', 
          background: '#78716c', 
          opacity: 0.4,
          borderRadius: '5px 5px 0 0',
          boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.3)'
        } 
      }, // Building 1
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '30%', 
          width: '20%', 
          height: '45%', 
          background: '#57534e', 
          opacity: 0.3,
          borderRadius: '8px 8px 0 0'
        } 
      }, // Building 2
      { 
        type: 'rect', 
        style: { 
          bottom: '35%', 
          left: '9%', 
          width: '17%', 
          height: '10%', 
          background: '#44403c', 
          transform: 'skewX(-20deg)', 
          opacity: 0.5,
          borderRadius: '2px'
        } 
      }, // Roof 1
      { 
        type: 'rect', 
        style: { 
          bottom: '45%', 
          left: '28%', 
          width: '24%', 
          height: '12%', 
          background: '#292524', 
          transform: 'skewX(15deg)', 
          opacity: 0.4,
          borderRadius: '2px'
        } 
      }, // Roof 2
      { 
        type: 'circle', 
        style: { 
          top: '-15%', 
          right: '-10%', 
          width: '50vw', 
          height: '50vw', 
          background: '#fde047', 
          filter: 'blur(60px)', 
          opacity: 0.4 
        } 
      }, // Soft sun
      // Cobblestone texture hint
      {
        type: 'gradient',
        style: {
          bottom: '0',
          left: '0',
          width: '100%',
          height: '15%',
          backgroundImage: 'radial-gradient(#d6d3d1 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          opacity: 0.2
        }
      }
    ]
  },
  night: {
    bg: 'linear-gradient(180deg, #1c1917 0%, #44403c 100%)',
    shapes: [
      COMMON_SHAPES.moon,
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '10%', 
          width: '15%', 
          height: '35%', 
          background: '#292524', 
          opacity: 0.8 
        } 
      },
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '30%', 
          width: '20%', 
          height: '45%', 
          background: '#1c1917', 
          opacity: 0.9 
        } 
      },
      // Lanterns
      { type: 'circle', style: { bottom: '30%', left: '15%', width: '15px', height: '15px', background: '#ef4444', boxShadow: '0 0 15px 5px #ef4444', opacity: 0.8 } },
      { type: 'circle', style: { bottom: '40%', left: '35%', width: '15px', height: '15px', background: '#ef4444', boxShadow: '0 0 15px 5px #ef4444', opacity: 0.8 } },
      { type: 'circle', style: { bottom: '25%', left: '50%', width: '12px', height: '12px', background: '#f97316', boxShadow: '0 0 12px 4px #f97316', opacity: 0.7 } },
      
      // Warm window lights
      { type: 'rect', style: { bottom: '15%', left: '15%', width: '10px', height: '15px', background: '#fcd34d', opacity: 0.6, boxShadow: '0 0 5px #fcd34d' } },
      { type: 'rect', style: { bottom: '25%', left: '35%', width: '12px', height: '18px', background: '#fcd34d', opacity: 0.5, boxShadow: '0 0 5px #fcd34d' } }
    ]
  }
};
