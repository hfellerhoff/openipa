import {
  getCharArray,
  isConsonant,
  isVowel,
  getNextWord,
  isPunctuation,
  isEndOfSentence,
} from '../../util/Helper';
import IPA from '../../constants/IPA';
import { Result, Phoneme, ParseLetterProps } from '../../constants/Interfaces';
import Rules from './FrenchRules';
import Exceptions from './FrenchExceptions';
import Notes from './FrenchNotes';
import { isPronouncedConsonant } from './FrenchHelper';
import Template from '../../constants/Template';
import parseA from './parse-letters/parseA';
import parseB from './parse-letters/parseB';
import parseC from './parse-letters/parseC';
import parseD from './parse-letters/parseD';
import parseE from './parse-letters/parseE';
import parseF from './parse-letters/parseF';
import parseG from './parse-letters/parseG';
import parseH from './parse-letters/parseH';
import parseI from './parse-letters/parseI';
import parseJ from './parse-letters/parseJ';
import parseL from './parse-letters/parseL';
import parseM from './parse-letters/parseM';
import parseN from './parse-letters/parseN';
import parseO from './parse-letters/parseO';
import parseŒ from './parse-letters/parseŒ';
import parseP from './parse-letters/parseP';
import parseQ from './parse-letters/parseQ';
import parseR from './parse-letters/parseR';
import parseS from './parse-letters/parseS';
import parseT from './parse-letters/parseT';
import parseU from './parse-letters/parseU';
import parseV from './parse-letters/parseV';
import parseX from './parse-letters/parseX';
import parseY from './parse-letters/parseY';
import parseZ from './parse-letters/parseZ';

const parseFrench = (
  text: string,
  shouldAnalyzeElision?: boolean,
  shouldAnalyzeLiason?: boolean
) => {
  if (shouldAnalyzeElision === undefined) shouldAnalyzeElision = true;
  if (shouldAnalyzeLiason === undefined) shouldAnalyzeLiason = true;
  const charArray = getCharArray(text);

  let result: Result = Template.getResultTemplate();

  let previousPhoneme = '';
  let startOfNewWord = true;

  for (let index = 0; index < charArray.length; index += 1) {
    const letter = charArray[index];
    let phoneme: Phoneme = {
      text: letter,
      ipa: letter,
      rule: Rules.UNKNOWN,
    };
    let indexToAdd = 0;

    /*
      Index 0 is the current letter,
      and every other index is index
      letters away from the current
      letter.
    */
    let nextletter = [];

    // Do not transcribe '
    for (let i = 0; i < 10; i++) {
      if (charArray[index + i] !== "'") nextletter.push(charArray[index + i]);
    }

    const parseProps: ParseLetterProps = {
      phoneme,
      index,
      indexToAdd,
      charArray,
      nextletter,
      previousIPA: previousPhoneme,
    };

    switch (letter) {
      case 'a':
      case 'â':
      case 'à':
        phoneme = parseA(parseProps);
        break;
      case 'b':
        phoneme = parseB(parseProps);
        break;
      case 'c':
      case 'ç':
        phoneme = parseC(parseProps);
        break;
      case 'd':
        phoneme = parseD(parseProps);
        break;
      case 'e':
      case 'é':
      case 'è':
      case 'ê':
      case 'ë':
        phoneme = parseE(parseProps);
        break;
      case 'f':
        phoneme = parseF(parseProps);
        break;
      case 'g':
        phoneme = parseG(parseProps);
        break;
      case 'h':
        phoneme = parseH(parseProps);
        break;
      case 'i':
      case 'î':
      case 'ï':
        phoneme = parseI(parseProps);
        break;
      case 'j':
        phoneme = parseJ(parseProps);
        break;
      case 'l':
        phoneme = parseL(parseProps);
        break;
      case 'm':
        phoneme = parseM(parseProps);
        break;
      case 'n':
        phoneme = parseN(parseProps);
        break;
      case 'o':
      case 'ô':
        phoneme = parseO(parseProps);
        break;
      case 'œ':
        phoneme = parseŒ(parseProps);
        break;
      case 'p':
        phoneme = parseP(parseProps);
        break;
      case 'q':
        phoneme = parseQ(parseProps);
        break;
      case 'r':
        phoneme = parseR(parseProps);
        break;
      case 's':
        phoneme = parseS(parseProps);
        break;
      case 't':
        phoneme = parseT(parseProps);
        break;
      case 'u':
      case 'û':
        phoneme = parseU(parseProps);
        break;
      case 'v':
        phoneme = parseV(parseProps);
        break;
      case 'x':
        phoneme = parseX(parseProps);
        break;
      case 'y':
        phoneme = parseY(parseProps);
        break;
      case 'z':
        phoneme = parseZ(parseProps);
        break;

      // PUNCTUATION
      case ',':
      case ';':
      case '!':
      case '.':
      case '?':
      case '(':
      case ')':
      case '-':
        phoneme = {
          text: letter,
          ipa: letter,
          rule: Rules.NONE,
        };
        startOfNewWord = true;
        break;
      case "'":
      case '’':
        phoneme = {
          text: letter,
          ipa: '',
          rule: Rules.NONE,
        };
        startOfNewWord = true;
        break;
      case ' ':
        result.lines[result.lines.length - 1].words.push({
          syllables: [],
        });
        startOfNewWord = true;
        break;
      case '\n':
        result.lines.push({
          words: [
            {
              syllables: [],
            },
          ],
        });
        startOfNewWord = true;
        break;
    }
    indexToAdd = phoneme.text.length - 1;

    const currentLine = result.lines[result.lines.length - 1];
    const currentWord = currentLine.words[currentLine.words.length - 1];

    // Check for exceptions
    if (startOfNewWord) {
      const [word, newIndex] = getNextWord(index, charArray);
      const wordNoPunctuation = getCharArray(word)
        .filter(char => !isPunctuation(char))
        .join('');

      if (wordNoPunctuation in Exceptions) {
        phoneme = {
          ...Exceptions[wordNoPunctuation],
          text: word,
        };

        const precedingCharacter = charArray[index];
        const hasPrecedingPunctuation = isPunctuation(precedingCharacter);
        if (hasPrecedingPunctuation) {
          currentWord.syllables.push({
            text: precedingCharacter,
            ipa: '',
            rule: Rules.NONE,
          });
        }

        index = newIndex;
      }
    }
    startOfNewWord = false;

    index += indexToAdd;

    // Analyze Elision
    if (shouldAnalyzeElision) {
      if (nextletter[1] !== '\n') {
        if (
          phoneme.ipa === IPA.SCHWA &&
          isEndOfSentence(nextletter[1]) &&
          isVowel(nextletter[2])
        ) {
          phoneme = {
            ...phoneme,
            ipa: '',
            rule: Rules.ELISION,
          };
        }
      }
    }

    let liasonPhoneme;
    // Analyze Liason
    if (shouldAnalyzeLiason) {
      const lastCharacter = phoneme.text[phoneme.text.length - 1];
      const nextCharacter = charArray[index + 1];
      const nextCharacterSecond = charArray[index + 2];
      if (nextCharacter !== '\n') {
        if (
          !isPronouncedConsonant(lastCharacter, true) &&
          isConsonant(lastCharacter) &&
          lastCharacter !== 's' &&
          isEndOfSentence(nextCharacter) &&
          isVowel(nextCharacterSecond)
        ) {
          liasonPhoneme = {
            text: ' ',
            ipa: lastCharacter + IPA.UNDERTIE,
            rule: phoneme.rule + Notes.LIASON,
          };
        } else if (
          lastCharacter === 's' &&
          isEndOfSentence(nextCharacter) &&
          isVowel(nextCharacterSecond)
        ) {
          liasonPhoneme = {
            text: ' ',
            ipa: IPA.Z + IPA.UNDERTIE,
            rule: Rules.S_LIASON,
          };
        }
      }
    }

    currentWord.syllables.push(phoneme);
    previousPhoneme = phoneme.ipa[phoneme.ipa.length - 1];

    if (liasonPhoneme !== undefined) {
      currentWord.syllables.push(liasonPhoneme);
      previousPhoneme = liasonPhoneme.ipa[liasonPhoneme.ipa.length - 1];
    }

    // Analize final IPA syllable
    // ex. Final open e is more closed
    if (phoneme.text !== 'est' && phoneme.text !== 'es') {
      let previousSyllable =
        currentWord.syllables[currentWord.syllables.length - 1];
      if (previousSyllable.ipa.length === 0) {
        if (currentWord.syllables[currentWord.syllables.length - 2]) {
          previousSyllable =
            currentWord.syllables[currentWord.syllables.length - 2];
        }
      }
      if (previousSyllable && isEndOfSentence(charArray[index + 1])) {
        const previousIPA =
          previousSyllable.ipa[previousSyllable.ipa.length - 1];
        if (previousIPA) {
          if (previousIPA === IPA.OPEN_E) {
            previousSyllable.ipa = IPA.CLOSED_E;
            previousSyllable.rule += Notes.FINAL_E_HALFCLOSED;
          }
        }
      }
    }

    // Analyze vocalic harmonization
    if (
      isEndOfSentence(nextletter[1]) ||
      (indexToAdd === 1 && isEndOfSentence(nextletter[2])) ||
      (indexToAdd === 2 && isEndOfSentence(nextletter[3])) ||
      (indexToAdd === 3 && isEndOfSentence(nextletter[4]))
    ) {
      let closedFrontVowelFound = false;
      let closedMixedVowelFound = false;
      for (let j = currentWord.syllables.length - 1; j >= 0; j--) {
        const currentIPA = currentWord.syllables[j];
        for (let k = currentIPA.ipa.length - 1; k >= 0; k--) {
          const symbol = currentIPA.ipa[k];
          if (
            symbol === IPA.CLOSED_E ||
            symbol === IPA.CLOSED_I ||
            symbol === IPA.CLOSED_Y
          ) {
            closedFrontVowelFound = true;
          } else if (symbol === IPA.CLOSED_MIXED_O) {
            closedMixedVowelFound = true;
          }

          if (closedFrontVowelFound) {
            if (
              symbol === IPA.OPEN_E &&
              (currentIPA.text === 'ai' ||
                currentIPA.text === 'aî' ||
                currentIPA.text === 'ay' ||
                currentIPA.text === 'ei' ||
                currentIPA.text === 'ê')
            ) {
              currentWord.syllables[j] = {
                ...currentWord.syllables[j],
                ipa: `(${IPA.CLOSED_E})`,
                rule: Rules.VOCALIC_HARMONIZATION_E,
              };
            }
          } else if (closedMixedVowelFound) {
            if (symbol === IPA.OPEN_MIXED_O) {
              currentWord.syllables[j] = {
                ...currentWord.syllables[j],
                ipa: `(${IPA.CLOSED_MIXED_O})`,
                rule: Rules.VOCALIC_HARMONIZATION_E,
              };
            }
          }
        }
      }
    }
  }
  return result;
};

export default parseFrench;
