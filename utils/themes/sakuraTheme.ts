import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const sakuraTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom, #eff6ff 0%, #fce7f3 40%, #fbcfe8 100%)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '5%', 
          right: '10%', 
          width: '120px', 
          height: '120px', 
          background: '#fdf2f8', 
          filter: 'blur(20px)', 
          opacity: 0.9 
        } 
      }, // Soft sun
      { 
        type: 'circle', 
        style: { 
          top: '-10%', 
          left: '-10%', 
          width: '50vw', 
          height: '50vw', 
          background: '#f9a8d4', 
          filter: 'blur(80px)', 
          opacity: 0.3 
        } 
      }, // Pink haze
      { 
        type: 'circle', 
        style: { 
          bottom: '10%', 
          right: '0%', 
          width: '40vw', 
          height: '40vw', 
          background: '#f472b6', 
          filter: 'blur(90px)', 
          opacity: 0.25 
        } 
      },
      // Falling petals hints (static for now, could animate)
      { type: 'circle', style: { top: '20%', left: '20%', width: '6px', height: '6px', background: '#fce7f3', borderRadius: '40% 60%', transform: 'rotate(45deg)', opacity: 0.6 } },
      { type: 'circle', style: { top: '40%', left: '50%', width: '8px', height: '8px', background: '#fbcfe8', borderRadius: '60% 40%', transform: 'rotate(-15deg)', opacity: 0.7 } },
      { type: 'circle', style: { top: '60%', left: '30%', width: '5px', height: '5px', background: '#f9a8d4', borderRadius: '50%', opacity: 0.5 } },
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #2e1065, #4c1d95, #701a75)',
    shapes: [
      COMMON_SHAPES.stars,
      { 
        type: 'circle', 
        style: { 
          bottom: '-10%', 
          left: '0', 
          width: '60vw', 
          height: '50vh', 
          background: '#831843', 
          filter: 'blur(80px)', 
          opacity: 0.3 
        } 
      }, // Dark pink glow
      { 
        type: 'circle', 
        style: { 
          top: '20%', 
          right: '15%', 
          width: '80px', 
          height: '80px', 
          background: 'radial-gradient(circle, #fce7f3 0%, transparent 70%)', 
          filter: 'blur(10px)', 
          opacity: 0.5 
        } 
      }, // Paper lantern glow
      // Petals at night
      { type: 'circle', style: { top: '30%', right: '40%', width: '4px', height: '4px', background: '#fbcfe8', opacity: 0.3 } },
    ]
  }
};
