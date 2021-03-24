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
    .filter((m) => !!m);

  // If there is a string match
  if (stringMatches.length > 0) return stringMatches[0];

  // Otherwise
  return undefined;
};

export default matchStringInput;
