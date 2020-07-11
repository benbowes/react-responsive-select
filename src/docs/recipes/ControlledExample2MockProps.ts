import { IOption } from '../../react-responsive-select'; // 'react-responsive-select'

export type TBrandsOption = IOption;
export type TModelsOption = IOption & { brand: string };
export type TColoursOption = IOption & { brands: string[] };

export const BRANDS: TBrandsOption[] = [
  { value: 'null', text: 'Any' },
  { value: 'alfa-romeo', text: 'Alfa Romeo' },
  { value: 'bmw', text: 'BMW' },
  { value: 'fiat', text: 'Fiat' },
  { value: 'lexus', text: 'Lexus' },
  { value: 'subaru', text: 'Subaru' },
];

export const MODELS: TModelsOption[] = [
  { value: 'null', text: 'Any', brand: 'null' },
  { value: '4c', text: '4C', brand: 'alfa-romeo' },
  { value: '8c', text: '8C', brand: 'alfa-romeo' },
  { value: 'giulietta', text: 'Giulietta', brand: 'alfa-romeo' },
  { value: '320i', text: '320i', brand: 'bmw' },
  { value: '328i', text: '328i', brand: 'bmw' },
  { value: '520i', text: '520i', brand: 'bmw' },
  { value: 'm5', text: 'M5', brand: 'bmw' },
  { value: 'uno', text: 'Uno', brand: 'fiat' },
  { value: '124', text: '124', brand: 'fiat' },
  { value: 'lx350', text: 'LX 350', brand: 'lexus' },
  { value: 'gs400', text: 'GS 400', brand: 'lexus' },
  { value: 'forester', text: 'Forester', brand: 'subaru' },
  { value: 'impreza', text: 'Impreza', brand: 'subaru' },
];

export const COLOURS: TColoursOption[] = [
  { value: 'null', text: 'Any', brands: [] },
  { value: 'blue', text: 'Blue', brands: ['alfa-romeo', 'subaru'] },
  { value: 'red', text: 'Red', brands: ['alfa-romeo', 'fiat', 'subaru'] },
  {
    value: 'white',
    text: 'White',
    brands: ['alfa-romeo', 'bmw', 'fiat', 'lexus'],
  },
  { value: 'black', text: 'Black', brands: ['alfa-romeo', 'bmw', 'lexus'] },
  {
    value: 'grey',
    text: 'Grey',
    brands: ['alfa-romeo', 'bmw', 'fiat', 'lexus'],
  },
  { value: 'purple', text: 'Purple', brands: ['fiat', 'subaru'] },
  { value: 'pink', text: 'Pink', brands: ['fiat', 'subaru'] },
  { value: 'green', text: 'Green', brands: ['bmw', 'fiat', 'lexus'] },
];
