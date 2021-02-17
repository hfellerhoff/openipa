import { Result } from './Interfaces';

const ResultTemplate: Result = {
  lines: [
    {
      words: [
        {
          syllables: [],
        },
      ],
    },
  ],
};

const getResultTemplate = () => {
  return {
    lines: [
      {
        words: [
          {
            syllables: [],
          },
        ],
      },
    ],
  };
};

const Template = {
  Result: ResultTemplate,
  getResultTemplate,
};

export default Template;
