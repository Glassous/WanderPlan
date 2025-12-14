import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const mountainTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom, #eff6ff 0%, #bfdbfe 50%, #dbeafe 100%)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '-15%', 
          right: '5%', 
          width: '100px', 
          height: '100px', 
          background: 'radial-gradient(circle, #ffffff 30%, rgba(255,255,255,0) 70%)', 
          filter: 'blur(15px)', 
          opacity: 0.9 
        } 
      }, // Cold Sun
      { 
        type: 'circle', 
        style: { 
          bottom: '-10%', 
          left: '20%', 
          width: '60vw', 
          height: '60vh', 
          background: '#64748b', 
          filter: 'blur(30px)', 
          transform: 'rotate(45deg)', // Peak
          borderRadius: '20%'
        } 
      },
      { 
        type: 'circle', 
        style: { 
          bottom: '-20%', 
          right: '-10%', 
          width: '80vw', 
          height: '70vh', 
          background: '#94a3b8', 
          filter: 'blur(40px)', 
          transform: 'rotate(-30deg)', // Another Peak
          borderRadius: '30%'
        } 
      },
      {
        type: 'gradient',
        style: {
            top: '30%',
            left: '0',
            width: '100%',
            height: '20%',
            background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
            filter: 'blur(20px)',
            opacity: 0.6
        }
      } // Cloud layer
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #0f172a, #1e293b, #334155)',
    shapes: [
      COMMON_SHAPES.stars,
      { 
        type: 'circle', 
        style: { 
          bottom: '-10%', 
          left: '10%', 
          width: '70vw', 
          height: '60vh', 
          background: '#020617', 
          filter: 'blur(30px)', 
          transform: 'rotate(45deg)',
          borderRadius: '20%',
          opacity: 0.9
        } 
      }, // Silhouette Peak 1
      { 
        type: 'circle', 
        style: { 
          bottom: '-20%', 
          right: '-10%', 
          width: '80vw', 
          height: '70vh', 
          background: '#1e293b', 
          filter: 'blur(40px)', 
          transform: 'rotate(-30deg)',
          borderRadius: '30%',
          opacity: 0.95
        } 
      }, // Silhouette Peak 2
      { 
        type: 'circle', 
        style: { 
          top: '20%', 
          right: '20%', 
          width: '2px', 
          height: '2px', 
          background: 'white', 
          boxShadow: '0 0 4px 2px white',
          animation: 'pulse 3s infinite'
        } 
      } // Distant signal/star
    ]
  }
};
