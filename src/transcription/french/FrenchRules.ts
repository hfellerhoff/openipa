import IPA from '../../constants/IPA';

const Rules = {
  NONE: ``,
  UNKNOWN: `Could not find a transcription rule for this character.`,
  C_BACKVOWEL: `When followed by a back vowel or consonant, 'c' consonants are transcribed as [${IPA.K}].`,
  C_FRONTVOWEL: `When followed by a front vowel, 'c' consonants are transcribed as [${IPA.S}].`,
  C_SQUIGLE: `All 'ç' consonants are transcribed as [${IPA.S}].`,
  CH: `All 'ch' consonant groups are transcribed as [${IPA.FRICATIVE_C}].`,
  G_BACKVOWEL: `When followed by a back vowel or consonant, 'g' consonants are transcribed as [${IPA.G}].`,
  G_FRONTVOWEL: `When followed by a front vowel, 'g' consonants are transcribed as [${IPA.FRICATIVE_G}].`,
  GN: `All 'gn' consonant groups are transcribed as [${IPA.BACK_SWOOP_N}].`,
  GU: `All 'gu' letter groups are transcribed as [${IPA.G}].`,
  H: `All single 'h' consonants are silent, so they are not transcribed.`,
  J: `All 'j' consonants are transcribed as [${IPA.FRICATIVE_G}].`,
  QU: `All 'qu' letter groups are transcribed as [${IPA.K}].`,
  R: `Single and double 'r' consonants are transcribed as [${IPA.FLIPPED_R}].`,
  Z: `All 'z' consonants are transcribed as is: [${IPA.Z}].`,
  S: `Single and double 's' consonants are transcribed as [${IPA.S}].`,
  N: `Single and double 'n' consonants are transcribed as [${IPA.N}].`,
  M: `Single and double 'm' consonants are transcribed as [${IPA.M}].`,
  T: `Single and double 't' consonants are transcribed as [${IPA.T}].`,
  L: `Single and double 'l' consonants are transcribed as [${IPA.L}].`,
  P: `Single and double 'p' consonants are transcribed as [${IPA.P}].`,
  B: `Single and double 'b' consonants are transcribed as [${IPA.B}].`,
  F: `Single and double 'f' consonants are transcribed as [${IPA.F}].`,
  V: `Single and double 'v' consonants are transcribed as [${IPA.V}].`,
  D: `Single and double 'd' consonants are transcribed as [${IPA.D}].`,
  INTERVOCALIC_S: `Intervocalic 's' consonants are transcribed as [${IPA.Z}].`,
  FINAL_TION: `A 't' consonant in a final '-tion', '-tiel', or '-tieux' letter group is transcribed as [${IPA.S}].`,
  TH: `A 'th' consonant group is transcribed as [${IPA.T}].`,
  PH: `A 'ph' consonant group is transcribed as [${IPA.F}].`,
  B_ST: `A 'b' consonant followed by an 's' or 't' consonant devoices and is transcribed as [${IPA.P}].`,
  X_VOWEL: `An 'x' consonant followed by a vowel or an 'h' consonant is transcribed as [${
    IPA.G + IPA.Z
  }].`,
  X_CONSONANT: `An 'x' consonant followed by a consonant is transcribed as [${
    IPA.K + IPA.S
  }].`,
  SILENT_FINAL_CONSONANT: `All final consonants besides 'c', 'r', 'f', and 'l' are silent.`,
  SINGLE_A: `Single 'a' vowels are transcribed as [${IPA.BRIGHT_A}].`,
  SINGLE_E_DOUBLE_CONSONANT: `Single 'e' vowels followed by two or more consonants are transcribed as [${IPA.OPEN_E}].`,
  SINGLE_I_OR_Y: `Single 'i' and 'y' vowels are transcribed as [${IPA.CLOSED_I}].`,
  SINGLE_O_PRONOUNCED_CONSONANT: `Single 'o' vowels followed by a pronounced consonant are transcribed as [${IPA.OPEN_O}].`,
  O_Z_SOUND: `Single 'o' vowels followed by a [z] sound are transcribed as [${IPA.CLOSED_O}].`,
  O_TION: `Single 'o' vowels followed by '-tion' are transcribed as [${IPA.CLOSED_O}].`,
  SINGLE_U: `Single 'u' vowels are transcribed as [${IPA.CLOSED_Y}].`,
  FINAL_E_ES: `Final '-e' and '-es' groups are transcribed as [${IPA.SCHWA}].`,
  GRAVE_A: `All 'à' vowels with a grave accent are transcribed as [${IPA.BRIGHT_A}].`,
  CIRCUMFLEX_A: `All 'â' vowels with a circumflex accent are transcribed as [${IPA.DARK_A}].`,
  ACUTE_E: `All 'é' vowels with an acute accent are transcribed as [${IPA.CLOSED_E}].`,
  ACCENT_E: `All 'è', 'ê', and 'ë' vowels with a grave accent, circumflex accent, or diaeresis are transcribed as [${IPA.OPEN_E}].`,
  ACCENT_I: `All 'î' and 'ï' vowels with a circumflex accent or diaeresis are transcribed as [${IPA.CLOSED_I}].`,
  ACCENT_O: `All 'ô' vowels with a circumflex accent are transcribed as [${IPA.CLOSED_O}].`,
  ACCENT_U: `All 'û' vowels with a circumflex accent are transcribed as [${IPA.CLOSED_Y}].`,
  FINAL_AS: `For the purpose of Lyric Diction, all final '-as' letter groups can be transcribed as [${IPA.BRIGHT_A}].`,
  FINAL_E_DRZ: `Final '-ed(s)', '-er(s)', and 'ez' endings are transcribed as [${IPA.CLOSED_E}].`,
  FINAL_EC: `Final '-ec(s)' endings are transcribed as [${
    IPA.OPEN_E + IPA.K
  }].`,
  FINAL_EF: `Final '-ef(s)' endings are transcribed as [${
    IPA.OPEN_E + IPA.F
  }].`,
  FINAL_EL: `Final '-el(s)' endings are transcribed as [${
    IPA.OPEN_E + IPA.L
  }].`,
  FINAL_ET: `Final '-et(s)' endings are transcribed as [${IPA.OPEN_E}]. Note: Final [${IPA.OPEN_E}] vowels are typically pronounced a bit more closed than a typical [${IPA.OPEN_E}].`,
  FINAL_O_SILENTCONSONANT: `Final 'o' vowels followed by a silent consonant are transcribed as [${IPA.CLOSED_O}].`,
  FINAL_IE: `Final '-ie' letter groups are transcribed as [${IPA.CLOSED_I}].`,
  FINAL_AI: `Final '-ai' verb endings are transcribed as [${IPA.CLOSED_E}]. If this word is not a verb, it is most likely transcribed as [${IPA.OPEN_E}].`,
  AI: `All non-final 'ai' and 'aî' vowel clusters are transcribed as [${IPA.OPEN_E}].`,
  AY: `All 'ay' vowel clusters are transcribed as [${
    IPA.OPEN_E + IPA.J_GLIDE
  }].`,
  EI: `All 'ei' vowel clusters are transcribed as [${IPA.OPEN_E}].`,
  VOCALIC_HARMONIZATION_E: `This [${IPA.OPEN_E}] is transcribed as [(${IPA.CLOSED_E})] because of vocalic harmonization, in which an open vowel gets closed to match a closed vowel later on in the word.`,
  AU_EAU: `'au', 'aux', 'eau', and 'eau' vowel clusters are transcribed as [${IPA.CLOSED_O}].`,
  AUR: `'au' vowel clusters follwed by an 'r' are transcribed as [${IPA.OPEN_O}].`,
  EU_PRONOUNCEDCONSONSANT: `'eu', 'œ', and 'œu' vowel clusters followed by a pronounced consonant are transcribed as [${IPA.OPEN_MIXED_O}].`,
  MEDIAL_UE: `Medial 'ue' vowel clusters are transcribed as [${IPA.OPEN_MIXED_O}].`,
  EU_S_VOWEL: `'eu' vowel clusters followed by an 's' and a vowel are transcribed as [${IPA.CLOSED_MIXED_O}].`,
  FINAL_EU: `Final '-eu' vowel clusters are transcribed as [${IPA.CLOSED_MIXED_O}].`,
  FINAL_EU_SILENTCONSONANT: `Final '-eu' and '-œu' vowel clusters followed by a silent consonant are transcribed as [${IPA.CLOSED_MIXED_O}].`,
  VOCALIC_HARMONIZATION_O: `This [${IPA.OPEN_MIXED_O}] is transcribed as [(${IPA.CLOSED_MIXED_O})] because of vocalic harmonization, in which an open vowel gets closed to match a closed vowel later on in the word.`,
  OU: `'ou', 'où', and 'oû' vowel clusters are transcribed as [${IPA.CLOSED_U}].`,
  IY_VOWEL: `'i' and 'y' vowels followed by a vowel are transcribed as [${IPA.J_GLIDE}].`,
  OU_VOWEL: `'ou' vowel clusters followed by a vowel are transcribed as [${IPA.W_GLIDE}].`,
  U_VOWEL: `'u' vowels followed by a vowel are transcribed as [${IPA.Y_GLIDE}].`,
  MEDIAL_ILL_VOWEL: `Medial 'ill' letter groups preceded by a vowel are transcribed as [${IPA.J_GLIDE}].`,
  MEDIAL_ILL_CONSONANT: `Medial 'ill' letter groups preceded by a consonant are transcribed as [${
    IPA.CLOSED_I + IPA.J_GLIDE
  }].`,
  VOWEL_IL: `'il' letter groups preceded by a vowel are transcribed as [${IPA.J_GLIDE}].`,
  OI: `'oi' vowel clusters are transcribed as [${IPA.W_GLIDE + IPA.BRIGHT_A}].`,
  OY: `'oy' vowel clusters are transcribed as [${
    IPA.W_GLIDE + IPA.BRIGHT_A + IPA.J_GLIDE
  }].`,
  RE_PREFIX: `All '-re' prefixes are transcribed as [${
    IPA.FLIPPED_R + IPA.SCHWA
  }].`,
  INITIAL_REST: `Inital 'rest-' and 'resp-' letter clusters are transcribed with an open [${IPA.OPEN_E}].`,
  INTERCONSONANT_SCHWA: `An 'e' vowel in between two consonants and followed by a vowel is transcribed as [${IPA.SCHWA}].`,
  FINAL_VERB_ENT: `Final '-ent' verb endings are transcribed as [${IPA.SCHWA}]. If this word is not a verb, it is transcribed as [${IPA.NASAL_A}].`,
  FAIS_VOWEL: `The verb 'fais' followed by a vowel is transcribed as [${
    IPA.F + IPA.SCHWA + IPA.Z
  }].`,
  FINAL_VERB_IENT: `Final '-ient' verb endings are transcribed as [${
    IPA.J_GLIDE + IPA.NASAL_E
  }].`,
  FINAL_VERB_AIENT: `Final '-aient' verb endings are transcribed as [${IPA.OPEN_E}].`,
  NASAL_EAMN_CONSONANT: `'am', 'em', 'an', and 'en' letter groups followed by a consonant (except m, n, and h) are transcribed as [${IPA.NASAL_A}].`,
  FINAL_AN: `Final 'an' letter groups are transcribed as [${IPA.NASAL_A}].`,
  NASAL_ONM_CONSONANT: `'on' and 'om' letter groups followed by a consonant (except m, n, and h) are transcribed as [${IPA.NASAL_O}].`,
  FINAL_ONM_CONSONANT: `Final 'on' and 'om' letter groups are transcribed as [${IPA.NASAL_O}].`,
  NASAL_AIM: `'aim', 'ain', and 'ein' letter groups that are final or followed by a consonant (except m, n, and h) are transcribed as [${IPA.NASAL_E}].`,
  NASAL_IY: `'in', 'im', 'yn', and 'ym' letter groups that are final or followed by a consonant (except m, n, and h) are transcribed as [${IPA.NASAL_E}].`,
  FINAL_ENS: `Final -en(s) letter clusters are transcribed as [${IPA.NASAL_E}].`,
  NASAL_OIN: `'oin' letter clusters that are final or followed by a consonant are transcribed as [${
    IPA.W_GLIDE + IPA.NASAL_E
  }]`,
  NASAL_UMN: `'um' and 'un' letter groups that are final or followed by a consonant (except m, n, and h) are transcribed as [${IPA.NASAL_MIXED_O}].`,
  DEFAULT_E: `If no other rule applies, transcribe 'e' vowels as [${IPA.OPEN_E}].`,
  FINAL_ENT: `Final '-ent' verb endings are transcribed as [${IPA.SCHWA}]. If this is not a verb, it should be transcribed as [${IPA.NASAL_A}].`,
  ELISION: `The normally transcribed [${IPA.SCHWA}] is dropped in this case due to elision, as the following word begins with a vowel. Consult your music to confirm if the schwa should not be pronounced.`,
  S_LIASON: `This normally silent 's' is pronounced as a [${IPA.Z}] in this case due to liason, as the following word begins with a vowel. Liason rules are complex, so take this transcription with a grain of salt.`,
  INITIAL_ILRNM: `The consonants in 'ill-', 'irr-', 'inn-', and 'imm-' letter groups are doubled in transcription.`,
};

/*
Rules to implement:
- Consonants that are doubled in spelling are not doubled
  in transcription except for initial ill, irr, inn, imm
- Consonant n silent when preceded by a nasal vowel.
- French schwa
- Nasals
- No final consonant on multiple silent consonants (ex. doigts)
- Figure out rule with (joie)
- Verb ending '-ent' is a schwa
*/

export default Rules;
