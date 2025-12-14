import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const ancientTownTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom, #fef3c7, #e7e5e4, #a8a29e)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '-10%', 
          right: '20%', 
          width: '40vw', 
          height: '40vw', 
          background: '#d6d3d1', 
          filter: 'blur(80px)', 
          opacity: 0.4 
        } 
      },
      {
        type: 'rect',
        style: {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }
      } // Texture
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #1c1917, #292524, #44403c)',
    shapes: [
        COMMON_SHAPES.stars,
      { 
        type: 'circle', 
        style: { 
          top: '40%', 
          left: '20%', 
          width: '150px', 
          height: '150px', 
          background: '#ea580c', 
          filter: 'blur(80px)', 
          opacity: 0.2 
        } 
      }, // Lantern glow 1
      { 
        type: 'circle', 
        style: { 
          top: '60%', 
          right: '30%', 
          width: '200px', 
          height: '200px', 
          background: '#fb923c', 
          filter: 'blur(90px)', 
          opacity: 0.15 
        } 
      } // Lantern glow 2
    ]
  }
};
