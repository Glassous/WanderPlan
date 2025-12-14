import { ThemeDefinition } from './types';
import { defaultTheme } from './defaultTheme';
import { urbanTheme } from './urbanTheme';
import { beachTheme } from './beachTheme';
import { rainforestTheme } from './rainforestTheme';
import { desertTheme } from './desertTheme';
import { snowTheme } from './snowTheme';
import { ancientTownTheme } from './ancientTownTheme';
import { mountainTheme } from './mountainTheme';
import { countrysideTheme } from './countrysideTheme';
import { sakuraTheme } from './sakuraTheme';
import { autumnTheme } from './autumnTheme';

export * from './types';
export * from './common';

export const THEMES: Record<string, ThemeDefinition> = {
  default: defaultTheme,
  urban: urbanTheme,
  beach: beachTheme,
  rainforest: rainforestTheme,
  desert: desertTheme,
  snow: snowTheme,
  ancient_town: ancientTownTheme,
  mountain: mountainTheme,
  countryside: countrysideTheme,
  sakura: sakuraTheme,
  autumn: autumnTheme,
  
  // Aliases
  get lake() { return this.beach },
  get island() { return this.beach },
  get glacier() { return this.snow },
  get polar() { return this.snow },
  get canyon() { return this.desert },
  get grassland() { return this.countryside }, // Changed from rainforest to countryside
  get tropical() { return this.rainforest },
  get historic() { return this.ancient_town },
  get port() { return this.urban },
};
