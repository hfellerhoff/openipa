export interface Phoneme {
  text: string;
  ipa: string;
  rule: string;
}

export interface Word {
  syllables: Phoneme[];
}

export interface Line {
  words: Word[];
}

export interface Result {
  lines: Line[];
}

export enum Languages {
  Latin = 'latin',
  German = 'german',
  Italian = 'italian',
  French = 'french',
}

export interface ParseLetterProps {
  charArray: string[];
  phoneme: Phoneme;
  index: number;
  indexToAdd: number;
  nextletter: string[];
  previousIPA: string;
}

export type ParseLetterReturn = [Phoneme, number];
