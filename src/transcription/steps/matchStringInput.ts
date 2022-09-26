import { RuleInput, RuleInputString } from '../../lib/supabase/models/Rule';

const matchStringInput = (step: RuleInput, text: string, index: number) => {
  // Loop through possible string matches
  const stringMatches = (step as RuleInputString).text
    .map((possibleMatch) => {
      const characters = text
        .substring(index, index + possibleMatch.length)
        .toLowerCase();

      if (characters === possibleMatch) return characters;
    })
    .filter((m) => !!m) as string[];

  // If there is a string match, return the longest match
  if (stringMatches.length > 0) {
    return stringMatches.reduce((longestMatch, currentMatch) => {
      if (!longestMatch) return currentMatch;
      if (currentMatch.length > longestMatch.length) return currentMatch;
      return longestMatch;
    }, '');
  }

  // Otherwise
  return undefined;
};

export default matchStringInput;
