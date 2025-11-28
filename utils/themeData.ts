import React from 'react';

export interface ThemeShape {
  type: 'circle' | 'rect' | 'gradient';
  style: React.CSSProperties;
}

export interface ThemeConfig {
  bg: string;
  shapes: ThemeShape[];
}

export interface ThemeDefinition {
  day: ThemeConfig;
  night: ThemeConfig;
}

const COMMON_SHAPES = {
  sun: {
    type: 'circle' as const,
    style: { top: '10%', right: '15%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(20px)', opacity: 0.8 }
  },
  moon: {
    type: 'circle' as const,
    style: { top: '10%', right: '15%', width: '100px', height: '100px', background: 'radial-gradient(circle, #fefce8 20%, transparent 70%)', boxShadow: '0 0 40px rgba(255,255,255,0.5)', borderRadius: '50%' }
  }
};

export const THEMES: Record<string, ThemeDefinition> = {
  default: {
    day: {
      bg: 'linear-gradient(to bottom, #f0fdf4, #fffbeb)',
      shapes: [
        { type: 'circle', style: { top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: '#ecfccb', filter: 'blur(80px)', opacity: 0.4 } },
        { type: 'circle', style: { bottom: '10%', right: '0%', width: '40vw', height: '40vw', background: '#dcfce7', filter: 'blur(80px)', opacity: 0.4 } }
      ]
    },
    night: {
      bg: 'linear-gradient(to bottom, #0c0a09, #1c1917)',
      shapes: [
        { type: 'circle', style: { bottom: '-20%', left: '10%', width: '60vw', height: '40vh', background: '#064e3b', filter: 'blur(100px)', opacity: 0.2 } },
        { type: 'circle', style: { top: '40%', right: '20%', width: '300px', height: '300px', background: '#312e81', filter: 'blur(90px)', opacity: 0.2 } }
      ]
    }
  },
  urban: {
    day: {
      bg: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
      shapes: [
        { type: 'rect', style: { bottom: '0', left: '10%', width: '10%', height: '40%', background: '#94a3b8', opacity: 0.2 } },
        { type: 'rect', style: { bottom: '0', left: '25%', width: '15%', height: '60%', background: '#64748b', opacity: 0.15 } },
        { type: 'rect', style: { bottom: '0', left: '45%', width: '12%', height: '30%', background: '#94a3b8', opacity: 0.2 } },
        { type: 'rect', style: { bottom: '0', left: '60%', width: '8%', height: '50%', background: '#64748b', opacity: 0.15 } },
        { type: 'circle', style: { top: '-10%', right: '0', width: '40vw', height: '40vw', background: 'radial-gradient(circle, #f8fafc 0%, transparent 70%)', opacity: 0.6 } }
      ]
    },
    night: {
      bg: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)',
      shapes: [
        { type: 'rect', style: { bottom: '0', left: '10%', width: '10%', height: '40%', background: '#334155', opacity: 0.5 } },
        { type: 'rect', style: { bottom: '0', left: '25%', width: '15%', height: '60%', background: '#1e293b', opacity: 0.6 } },
        { type: 'rect', style: { bottom: '0', left: '60%', width: '8%', height: '50%', background: '#1e293b', opacity: 0.6 } },
        { type: 'circle', style: { top: '50%', left: '20%', width: '200px', height: '200px', background: '#c026d3', filter: 'blur(80px)', opacity: 0.15 } }, // Neon glow
        { type: 'circle', style: { top: '50%', right: '20%', width: '200px', height: '200px', background: '#0ea5e9', filter: 'blur(80px)', opacity: 0.15 } }
      ]
    }
  },
  beach: {
    day: {
      bg: 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 40%, #fef3c7 40%, #fde68a 100%)',
      shapes: [
        COMMON_SHAPES.sun,
        { type: 'gradient', style: { top: '40%', left: 0, width: '100%', height: '10%', background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)', opacity: 0.5 } }, // Horizon
        { type: 'circle', style: { bottom: '-20%', left: '-10%', width: '50vw', height: '50vw', background: '#fbbf24', filter: 'blur(60px)', opacity: 0.2 } }
      ]
    },
    night: {
      bg: 'linear-gradient(180deg, #172554 0%, #1e3a8a 50%, #3f3f46 50%, #27272a 100%)',
      shapes: [
        COMMON_SHAPES.moon,
        { type: 'gradient', style: { top: '50%', left: 0, width: '100%', height: '200px', background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)', filter: 'blur(20px)' } }, // Moon reflection
      ]
    }
  },
  rainforest: {
    day: {
      bg: 'linear-gradient(to bottom right, #ecfccb, #bef264, #166534)',
      shapes: [
        { type: 'circle', style: { top: '10%', left: '10%', width: '40vw', height: '40vw', background: '#86efac', filter: 'blur(80px)', opacity: 0.3 } },
        { type: 'circle', style: { bottom: '0', right: '0', width: '50vw', height: '50vw', background: '#14532d', filter: 'blur(60px)', opacity: 0.3 } },
        { type: 'circle', style: { top: '50%', left: '50%', width: '30vw', height: '30vw', background: '#4ade80', filter: 'blur(100px)', opacity: 0.2 } }
      ]
    },
    night: {
      bg: 'linear-gradient(to bottom, #022c22, #052e16)',
      shapes: [
        { type: 'circle', style: { top: '20%', left: '20%', width: '10px', height: '10px', background: '#bef264', boxShadow: '0 0 10px 2px #bef264', borderRadius: '50%', animation: 'float 5s infinite' } }, // Firefly
        { type: 'circle', style: { top: '60%', right: '30%', width: '8px', height: '8px', background: '#bef264', boxShadow: '0 0 8px 2px #bef264', borderRadius: '50%', animation: 'float 7s infinite' } },
        { type: 'circle', style: { bottom: '0', width: '100%', height: '40%', background: 'linear-gradient(to top, #064e3b, transparent)', opacity: 0.6 } }
      ]
    }
  },
  desert: {
    day: {
      bg: 'linear-gradient(180deg, #bae6fd 0%, #fed7aa 30%, #f97316 100%)',
      shapes: [
        COMMON_SHAPES.sun,
        { type: 'circle', style: { bottom: '-10%', left: '20%', width: '80vw', height: '30vh', background: '#ea580c', filter: 'blur(40px)', borderRadius: '100% 100% 0 0', opacity: 0.6 } },
        { type: 'circle', style: { bottom: '-5%', right: '-10%', width: '60vw', height: '20vh', background: '#c2410c', filter: 'blur(30px)', borderRadius: '100% 100% 0 0', opacity: 0.6 } }
      ]
    },
    night: {
      bg: 'linear-gradient(to bottom, #1e1b4b, #312e81, #4c1d95)',
      shapes: [
        { type: 'circle', style: { bottom: '-10%', width: '120%', left: '-10%', height: '30vh', background: '#1e1b4b', filter: 'blur(20px)', borderRadius: '50%' } },
        { type: 'circle', style: { top: '0', left: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)' } } // Milky way hint
      ]
    }
  },
  snow: {
    day: {
      bg: 'linear-gradient(to bottom, #e0f2fe, #f8fafc)',
      shapes: [
        { type: 'circle', style: { bottom: '-20%', left: '-10%', width: '60vw', height: '50vh', background: '#cbd5e1', filter: 'blur(40px)', transform: 'rotate(-10deg)' } }, // Slope
        { type: 'circle', style: { bottom: '-20%', right: '-10%', width: '70vw', height: '60vh', background: '#ffffff', filter: 'blur(50px)', transform: 'rotate(15deg)' } }
      ]
    },
    night: {
      bg: 'linear-gradient(to bottom, #0f172a, #1e293b, #334155)',
      shapes: [
        { type: 'circle', style: { top: '-20%', left: '20%', width: '80vw', height: '40vh', background: '#2dd4bf', filter: 'blur(80px)', opacity: 0.15 } }, // Aurora hint
        { type: 'circle', style: { top: '-10%', right: '10%', width: '60vw', height: '30vh', background: '#818cf8', filter: 'blur(80px)', opacity: 0.15 } },
        { type: 'circle', style: { bottom: '0', width: '100%', height: '30%', background: '#f8fafc', filter: 'blur(30px)', opacity: 0.1 } } // Snow reflection
      ]
    }
  },
  // Mapping other themes to similar bases for efficiency
  get lake() { return this.beach },
  get island() { return this.beach },
  get glacier() { return this.snow },
  get polar() { return this.snow },
  get canyon() { return this.desert },
  get grassland() { return this.rainforest }, // Maybe lighter green?
  get countryside() { return this.rainforest },
  get tropical() { return this.rainforest },
  get ancient_town() { 
    return {
       day: { bg: 'linear-gradient(to bottom, #fef3c7, #e7e5e4, #a8a29e)', shapes: [] },
       night: { bg: 'linear-gradient(to bottom, #292524, #44403c)', shapes: [{ type: 'circle' as const, style: { top: '50%', left: '50%', width: '50vw', height: '50vw', background: '#ea580c', filter: 'blur(120px)', opacity: 0.1 } }] }
    }
  },
  get historic() { return this.ancient_town },
  get port() { return this.urban },
};

// Fallback logic
export const getThemeStyles = (themeName: string, mode: 'light' | 'dark'): ThemeConfig => {
  const normalized = themeName?.toLowerCase().replace(/[\s-]/g, '_');
  const theme = THEMES[normalized] || THEMES.default;
  return mode === 'light' ? theme.day : theme.night;
};