import IPA from '../../constants/IPA';
import Notes from './FrenchNotes';

type ExceptionPhenome = {
  ipa: string;
  rule: string;
};
type ExceptionDictionary = { [key: string]: ExceptionPhenome };

const Rules = {
  EXCEPTION: `This word is an exception, and is transcribed as shown.`,
  MER_VER: `This is known as a 'mer/ver' word, which gets transcribed with an open [${IPA.OPEN_E}].`,
  OPEN_ER: `This word is an exception in which the final '-er' is transcribed with an open [${IPA.OPEN_E}].`,
  HARD_CH: `This word is an exception in which the 'ch' consonant group becomes a plosive [${IPA.K}].`,
  BRIGHT_A: `This word is an exception, and is transcribed with a bright [${IPA.BRIGHT_A}].`,
  FINAL_AI: `This word is an exception, and is transcribed with a (semi-open) [${IPA.OPEN_E}].`,
  AVOIR: `Conjugated forms of 'avoir' are transcribed with a [${IPA.CLOSED_Y}].`,
  MEDIAL_ILL: `This word is an exception, as it is not transcribed with a [${IPA.J_GLIDE}] as typically found in words with a medial 'ill'.`,
  DARK_OY_A: `While not critical for Lyric Diction, this word is an exception, as it transcribes the bright [${IPA.BRIGHT_A}] from the 'oi' of the word as a dark [${IPA.DARK_A}].`,
  PRONOUNCED_NASAL_N: `This word is an exception, as the 'n' after the nasal is still pronounced.`,
  NASAL_TWO_N: `This word is an exception, as it has a double 'n' and still has a nasal.`,
  NO_NASAL: `This word is an exception, as it is not nasal despite transcription rules indicating it should be.`,
  UNUSAL_NASAL: `This word is an exception, as it is nasal despite transcription rules indicating it shouldn't be.`,
  ARTICLES: `This is an article, and the final '-es' is pronounced with a closed [${IPA.CLOSED_E}].`,
};

const MerVerExceptions: ExceptionDictionary = {
  mer: {
    ipa: 'mεɾ',
    rule: Rules.MER_VER,
  },
  mers: {
    ipa: 'mεɾ',
    rule: Rules.MER_VER,
  },
  vers: {
    ipa: 'vεɾ',
    rule: Rules.MER_VER,
  },
  amer: {
    ipa: 'amεɾ',
    rule: Rules.MER_VER,
  },
  amers: {
    ipa: 'amεɾ',
    rule: Rules.MER_VER,
  },
  divers: {
    ipa: 'divεɾ',
    rule: Rules.MER_VER,
  },
  envers: {
    ipa: 'ɑ̃vεɾ',
    rule: Rules.MER_VER,
  },
  hiver: {
    ipa: 'ivεɾ',
    rule: Rules.MER_VER,
  },
  hivers: {
    ipa: 'ivεɾ',
    rule: Rules.MER_VER,
  },
  travers: {
    ipa: 'tɾavεɾ',
    rule: Rules.MER_VER,
  },
  univers: {
    ipa: 'ynivεɾ',
    rule: Rules.MER_VER,
  },
};

const OpenErExceptions: ExceptionDictionary = {
  cher: {
    ipa: 'ʃεɾ',
    rule: Rules.OPEN_ER,
  },
  chers: {
    ipa: 'ʃεɾ',
    rule: Rules.OPEN_ER,
  },
  enfer: {
    ipa: 'ɑ̃fεɾ',
    rule: Rules.OPEN_ER,
  },
  éther: {
    ipa: 'etεɾ',
    rule: Rules.OPEN_ER,
  },
  fer: {
    ipa: 'fεɾ',
    rule: Rules.OPEN_ER,
  },
  fers: {
    ipa: 'fεɾ',
    rule: Rules.OPEN_ER,
  },
  fier: {
    ipa: 'fjεɾ',
    rule: Rules.OPEN_ER,
  },
  hier: {
    ipa: 'jεɾ',
    rule: Rules.OPEN_ER,
  },
  sers: {
    ipa: 'sεɾ',
    rule: Rules.OPEN_ER,
  },
};

const ChExceptions: ExceptionDictionary = {
  écho: {
    ipa: 'eko',
    rule: Rules.HARD_CH,
  },
  chœur: {
    // TODO: Fix this, as it doesn't get recognized
    ipa: 'kœɾ',
    rule: Rules.HARD_CH,
  },
  choeur: {
    ipa: 'kœɾ',
    rule: Rules.HARD_CH,
  },
};

const FinalAiExceptions: ExceptionDictionary = {
  balai: {
    ipa: 'balε',
    rule: Rules.FINAL_AI,
  },
  lai: {
    ipa: 'lε',
    rule: Rules.FINAL_AI,
  },
  mai: {
    ipa: 'mε',
    rule: Rules.FINAL_AI,
  },
  rai: {
    ipa: 'ɾε',
    rule: Rules.FINAL_AI,
  },
  vrai: {
    ipa: 'vɾε',
    rule: Rules.FINAL_AI,
  },
};

const AvoirExceptions: ExceptionDictionary = {
  eu: {
    ipa: IPA.CLOSED_Y,
    rule: Rules.AVOIR,
  },
  eus: {
    ipa: IPA.CLOSED_Y,
    rule: Rules.AVOIR,
  },
  eut: {
    ipa: IPA.CLOSED_Y,
    rule: Rules.AVOIR,
  },
  eût: {
    ipa: IPA.CLOSED_Y,
    rule: Rules.AVOIR,
  },
  eurent: {
    ipa: IPA.CLOSED_Y + IPA.FLIPPED_R + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
  eusse: {
    ipa: IPA.CLOSED_Y + IPA.S + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
  eussent: {
    ipa: IPA.CLOSED_Y + IPA.S + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
  eutes: {
    ipa: IPA.CLOSED_Y + IPA.T + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
  eûtes: {
    ipa: IPA.CLOSED_Y + IPA.T + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
  eûmes: {
    ipa: IPA.CLOSED_Y + IPA.M + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
  eues: {
    ipa: IPA.CLOSED_Y + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
  eue: {
    ipa: IPA.CLOSED_Y + IPA.SCHWA,
    rule: Rules.AVOIR,
  },
};

const MedialIllExceptions: ExceptionDictionary = {
  mille: {
    ipa: 'mil' + IPA.SCHWA,
    rule: Rules.MEDIAL_ILL,
  },
  ville: {
    ipa: 'vil' + IPA.SCHWA,
    rule: Rules.MEDIAL_ILL,
  },
  tranquille: {
    ipa: 't' + IPA.FLIPPED_R + IPA.NASAL_A + 'kil' + IPA.SCHWA,
    rule: Rules.MEDIAL_ILL,
  },
  oscille: {
    ipa: IPA.OPEN_O + 'sil' + IPA.SCHWA,
    rule: Rules.MEDIAL_ILL,
  },
};

const DarkOyAExceptions: ExceptionDictionary = {
  trois: {
    ipa: 't' + IPA.FLIPPED_R + 'w' + IPA.DARK_A,
    rule: Rules.DARK_OY_A,
  },
  bois: {
    ipa: 'bw' + IPA.DARK_A,
    rule: Rules.DARK_OY_A,
  },
  voix: {
    ipa: 'vw' + IPA.DARK_A,
    rule: Rules.DARK_OY_A,
  },
};

const MiscExceptions: ExceptionDictionary = {
  et: {
    ipa: 'e',
    rule: `'et' (French for 'and') is pronounced as [e] to make a distinction between it and 'es/est' (French for 'is'), which are pronounced [ε].`,
  },
  es: {
    ipa: IPA.OPEN_E,
    rule: `'es' and 'est' (French for 'is') are pronounced as [${IPA.OPEN_E}] to make a distinction between it and 'et' (French for 'and'), which are pronounced [e].`,
  },
  est: {
    ipa: IPA.OPEN_E,
    rule: `'es' and 'est' (French for 'is') are pronounced as [${IPA.OPEN_E}] to make a distinction between it and 'et' (French for 'and'), which are pronounced [e].`,
  },
  dessous: {
    ipa: 'd' + IPA.SCHWA + 'su',
    rule: Rules.EXCEPTION,
  },
  dessus: {
    ipa: 'd' + IPA.SCHWA + 'sy',
    rule: Rules.EXCEPTION,
  },
  femme: {
    ipa: 'famə',
    rule: Rules.BRIGHT_A,
  },
  fixe: {
    ipa: 'fiksə',
    rule: Rules.EXCEPTION,
  },
  fosse: {
    ipa: 'fosə',
    rule: Rules.EXCEPTION,
  },
  grosse: {
    ipa: 'gɾosə',
    rule: Rules.EXCEPTION,
  },
  luxe: {
    ipa: 'lyksə',
    rule: Rules.EXCEPTION,
  },
  lys: {
    ipa: 'lis',
    rule: Rules.EXCEPTION,
  },
  maison: {
    ipa: 'm(e)zõ',
    rule: Rules.EXCEPTION,
  },
  monsieur: {
    ipa: 'm' + IPA.SCHWA + 'sj' + IPA.CLOSED_MIXED_O,
    rule: Rules.EXCEPTION,
  },
  o: {
    ipa: 'o',
    rule: Rules.EXCEPTION,
  },
  oh: {
    ipa: 'o',
    rule: Rules.EXCEPTION,
  },
  pays: {
    ipa: 'pei',
    rule: Rules.EXCEPTION,
  },
  ressemble: {
    ipa: 'r' + IPA.SCHWA + 's' + IPA.NASAL_A + 'bl' + IPA.SCHWA,
    rule: Rules.EXCEPTION,
  },
  secret: {
    ipa: 's' + IPA.SCHWA + 'k' + IPA.FLIPPED_R + IPA.OPEN_E,
    rule: Rules.EXCEPTION + ' ' + Notes.FINAL_E_HALFCLOSED,
  },
  solennelle: {
    ipa: 'sɔlanεlə',
    rule: Rules.EXCEPTION,
  },
};

const NasalExceptions: ExceptionDictionary = {
  enivré: {
    ipa: IPA.NASAL_A + 'niv' + IPA.FLIPPED_R + 'e',
    rule: Rules.PRONOUNCED_NASAL_N,
  },
  enneigé: {
    ipa: IPA.NASAL_A + 'n(e)' + IPA.FRICATIVE_G + 'e',
    rule: Rules.NASAL_TWO_N,
  },
  ennui: {
    ipa: IPA.NASAL_A + 'n' + IPA.Y_GLIDE + 'i',
    rule: Rules.NASAL_TWO_N,
  },
  amen: {
    ipa: 'am' + IPA.OPEN_E + 'n',
    rule: Rules.NO_NASAL,
  },
  carmen: {
    ipa: 'ka' + IPA.FLIPPED_R + 'm' + IPA.OPEN_E + 'n',
    rule: Rules.NO_NASAL,
  },
  en: {
    ipa: IPA.NASAL_A,
    rule: Rules.UNUSAL_NASAL,
  },
  encens: {
    ipa: IPA.NASAL_A + 's' + IPA.NASAL_A,
    rule: Rules.EXCEPTION,
  },
  gens: {
    ipa: IPA.FRICATIVE_G + IPA.NASAL_A,
    rule: Rules.EXCEPTION,
  },
  poulenc: {
    ipa: 'pul' + IPA.NASAL_E + 'k',
    rule: Rules.EXCEPTION,
  },
  album: {
    ipa: 'alb' + IPA.OPEN_O + 'm',
    rule: Rules.NO_NASAL,
  },
  aquarium: {
    ipa: 'aka' + IPA.FLIPPED_R + IPA.J_GLIDE + IPA.OPEN_O + 'm',
    rule: Rules.NO_NASAL,
  },
  géranium: {
    ipa:
      IPA.FRICATIVE_G +
      'e' +
      IPA.FLIPPED_R +
      'an' +
      IPA.J_GLIDE +
      IPA.OPEN_O +
      'm',
    rule: Rules.NO_NASAL,
  },
};

// TODO: Double check rule page 119
const ArticleExceptions: ExceptionDictionary = {
  ces: {
    ipa: 'se',
    rule: Rules.ARTICLES,
  },
  des: {
    ipa: 'de',
    rule: Rules.ARTICLES,
  },
  les: {
    ipa: 'le',
    rule: Rules.ARTICLES,
  },
  mes: {
    ipa: 'me',
    rule: Rules.ARTICLES,
  },
  ses: {
    ipa: 'se',
    rule: Rules.ARTICLES,
  },
  tes: {
    ipa: 'te',
    rule: Rules.ARTICLES,
  },
};

const Exceptions: ExceptionDictionary = {
  ...MerVerExceptions,
  ...OpenErExceptions,
  ...ChExceptions,
  ...FinalAiExceptions,
  ...AvoirExceptions,
  ...MedialIllExceptions,
  ...DarkOyAExceptions,
  ...NasalExceptions,
  ...ArticleExceptions,
  ...MiscExceptions,
};

export default Exceptions;
