export type Task = {
  id: string;
  name: string;
  dimension: '1x1' | '9x16' | '16x9';
  templateId: 'mwpswxcudtwxb' | '0xdoscyowl50c';
  text: string[];
  ammount: string;
  genType: 'cyclic' | 'random';
  images: string[];
};