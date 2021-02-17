import IPA from '../../constants/IPA';

const Rules = {
  NONE: ``,
  UNKNOWN: `Could not find a transcription rule for this character.`,
  SAME: `This consonant does not change in transcription.`,
  DEFAULT_A: `All 'a' vowels are transcribed as [${IPA.DARK_A}].`,
  DEFAULT_E: `All 'e', 'æ', and 'œ' vowels are transcribed as [${IPA.OPEN_E}].`,
  DEFAULT_I: `All single 'i' and 'y' vowels are transcribed as [${IPA.CLOSED_I}].`,
  INTERVOCALIC_I_GLIDE: `Intervocalic 'i' vowels are transcribed as [${IPA.J_GLIDE}].`,
  INITIAL_I_GLIDE: `Initial 'i' vowels which are followed by a vowel are transcribed as [${IPA.J_GLIDE}].`,
  DEFAULT_O: `All 'o' vowels are transcribed as [${IPA.CLOSED_O}].`,
  DEFAULT_U: `All 'u' vowels are transcribed as [${IPA.CLOSED_U}].`,
  DEFAULT_J: `All 'j' consonants are transcribed as a [${IPA.J_GLIDE}] glide.`,
  DEFAULT_S: `If not intervocalic, 's' consonants are transcribed as [${IPA.S}].`,
  INTERVOCALIC_S: `Intervocalic 's' consonants are transcribed as [${IPA.Z}].`,
  VOICED_CONSONANT_FINAL_S: `When preceded by a voiced consonant and are final, 's' consonants become voiced and are transcribed as [${IPA.Z}].`,
  DEFAULT_R: `If not initial, 'r' consonants are transcribed as [${IPA.FLIPPED_R}].`,
  INITIAL_R: `Initial 'r' consonants are transcribed as [${IPA.ROLLED_R}].`,
  DEFAULT_C: `If not followed by a front vowel, 'c' consonants are transcribed as [${IPA.K}].`,
  FRICATIVE_C: `If followed by a front vowel, 'c' consonants are transcribed as [${IPA.T +
    IPA.FRICATIVE_C}].`,
  DEFAULT_G: `If not followed by a front vowel, 'g' consonants are transcribed as [${IPA.G}].`,
  FRICATIVE_G: `If followed by a front vowel, 'g' consonants are transcribed as [${IPA.D +
    IPA.FRICATIVE_G}].`,
  DEFAULT_H: `'h' consonants are silent, so they are not transcribed.`,
  DEFAULT_X: `If not a part of an inital 'ex', 'x' consonants are transcribed as [${IPA.K +
    IPA.S}].`,
  INITIAL_EX_VOWEL: `Initial 'ex' phonemes followed by a vowel are transcribed as [${IPA.G +
    IPA.Z}].`,
  INITIAL_EX_S_VOWEL: `Initial 'ex' phonemes followed by an 's' consonant and then a vowel are transcribed as [${IPA.G +
    IPA.Z}].`,
  INITIAL_EX_H_VOWEL: `Initial 'ex' phonemes followed by an 'h' consonant are transcribed as [${IPA.G +
    IPA.Z}].`,
  INITIAL_EX_C_FRONTVOWEL: `Initial 'ex' phonemes followed by a 'c' consonant and then a front vowel are transcribed as [${IPA.K +
    IPA.S +
    IPA.T +
    IPA.FRICATIVE_C}].`,
  INITIAL_EX_CONSONANT: `Initial 'ex' phonemes followed by a consonant are transcribed as [${IPA.K +
    IPA.S}].`,
  DEFAULT_Z: `All 'z' consonants are transcribed as [${IPA.D + IPA.Z}].`,
  GN: `All 'gn' phonemes are transcribed as [${IPA.BACK_SWOOP_N}].`,
  CH: `All 'ch' phonemes are transcribed as [${IPA.K}].`,
  PH: `All 'ph' phonemes are transcribed as [${IPA.F}].`,
  TH: `All 'th' phonemes are transcribed as [${IPA.T}].`,
  TI: `All 'ti' phonemes followed by a vowel (except when preceded by an s) are transcribed as [${IPA.T +
    IPA.S}].`,
  PS: `All 'ps' phonemes are transcribed as [${IPA.P + IPA.S}].`,
  QU: `All 'qu' phonemes are transcribed as [${IPA.K + IPA.W_GLIDE}].`,
  SC_FRONTVOWEL: `All 'sc' phonemes followed by a front vowel are transcribed as [${IPA.FRICATIVE_C}].`,
  IHI: `All 'ihi' letter groups are transcribed as [${IPA.CLOSED_I +
    IPA.K +
    IPA.CLOSED_I}].`,
  NGU: `All 'ngu' letter groups followed by a vowel are transcribed as [${IPA.FRONT_SWOOP_N +
    IPA.G +
    IPA.W_GLIDE}].`,
  NCT: `When an 'n' consonant is followed by 'ct', it is transcribed as [${IPA.FRONT_SWOOP_N}].`,
};

export default Rules;
