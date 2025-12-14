import { ThemeShape } from './types';

export const COMMON_SHAPES = {
  sun: {
    type: 'circle' as const,
    style: { 
      top: '5%', 
      right: '10%', 
      width: '120px', 
      height: '120px', 
      background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 70%)', 
      filter: 'blur(15px)', 
      opacity: 0.9,
      boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)'
    }
  } as ThemeShape,
  moon: {
    type: 'circle' as const,
    style: { 
      top: '8%', 
      right: '12%', 
      width: '100px', 
      height: '100px', 
      background: 'radial-gradient(circle at 30% 30%, #fefce8 0%, #fef08a 100%)', 
      boxShadow: '0 0 60px rgba(255,255,255,0.4), inset -10px -10px 20px rgba(0,0,0,0.1)', 
      borderRadius: '50%' 
    }
  } as ThemeShape,
  stars: {
    type: 'gradient' as const,
    style: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `
        radial-gradient(1.5px 1.5px at 10% 10%, white, transparent), 
        radial-gradient(1px 1px at 20% 40%, white, transparent), 
        radial-gradient(1.5px 1.5px at 50% 80%, white, transparent), 
        radial-gradient(1px 1px at 80% 20%, white, transparent),
        radial-gradient(1.5px 1.5px at 15% 65%, white, transparent),
        radial-gradient(1px 1px at 35% 15%, white, transparent),
        radial-gradient(1.5px 1.5px at 60% 30%, white, transparent),
        radial-gradient(1px 1px at 85% 75%, white, transparent),
        radial-gradient(1.5px 1.5px at 90% 10%, white, transparent),
        radial-gradient(1px 1px at 45% 55%, white, transparent)
      `,
      backgroundSize: '500px 500px',
      opacity: 0.6,
      mixBlendMode: 'screen' as const
    }
  } as ThemeShape
};
