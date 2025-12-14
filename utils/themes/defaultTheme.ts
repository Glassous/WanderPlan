import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const defaultTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #fffbeb 100%)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '-15%', 
          left: '-10%', 
          width: '60vw', 
          height: '60vw', 
          background: 'radial-gradient(circle, #ecfccb 0%, transparent 70%)', 
          filter: 'blur(100px)', 
          opacity: 0.5 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          bottom: '10%', 
          right: '-5%', 
          width: '50vw', 
          height: '50vw', 
          background: 'radial-gradient(circle, #dcfce7 0%, transparent 70%)', 
          filter: 'blur(90px)', 
          opacity: 0.4 
        } 
      }
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #0c0a09, #1c1917, #292524)',
    shapes: [
      COMMON_SHAPES.stars,
      { 
        type: 'circle', 
        style: { 
          bottom: '-20%', 
          left: '10%', 
          width: '70vw', 
          height: '50vh', 
          background: '#064e3b', 
          filter: 'blur(120px)', 
          opacity: 0.15 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          top: '30%', 
          right: '20%', 
          width: '400px', 
          height: '400px', 
          background: '#312e81', 
          filter: 'blur(100px)', 
          opacity: 0.15 
        } 
      }
    ]
  }
};
