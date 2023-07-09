import { NebulaFighterTheme } from './schemes/NebulaFighterTheme';
import { DarkSpacesTheme } from './schemes/DarkSpacesTheme';
import { GreenFieldsTheme } from './schemes/GreenFieldsTheme';
import { DefaultTheme } from './schemes/default';

const themeMap = {
  NebulaFighterTheme,
  DarkSpacesTheme,
  GreenFieldsTheme,
  DefaultTheme
};

export function themeCreator(theme) {
  return themeMap[theme];
}
