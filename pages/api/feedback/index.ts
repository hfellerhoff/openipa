import { NextApiRequest, NextApiResponse } from 'next';
import * as sendgridMail from '@sendgrid/mail';
import { Result } from '../../../src/constants/Interfaces';

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface FeedbackData {
  reason: string;
  details: string;
  email: string;
  result: Result;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data: FeedbackData = JSON.parse(req.body);

  const lines = data.result.lines.reduce((acc, cur) => {
    const line = cur.words.reduce((accwords, curwords) => {
      const word = curwords.syllables.reduce((accsyll, cursyll) => {
        const syllable = cursyll.text.trim().split('\n');

        return `${accsyll}${syllable}`;
      }, '');

      if (accwords !== '') return `${accwords} ${word}`;
      return word;
    }, '');

    return [...acc, line];
  }, [] as string[]);

  const placeholder = (s: string) => s || '[none]';

  const fieldHTML = `<h4>Feedback Reason</h4><br><span>${
    data.reason
  }</span><br><br>
<h4>Details</h4><br><span>${placeholder(data.details)}</span><br><br>
<h4>Follow-Up Email</h4><br><span>${placeholder(data.email)}</span><br><br>`;

  const linesHTML = `<h4>Inputted Text</h4><br><span>${lines
    .map((line) => line)
    .join('<br/>')}</span>`;

  const html = `${fieldHTML}${linesHTML}`;

  const msg: sendgridMail.MailDataRequired = {
    to: 'henryfellerhoff@gmail.com',
    from: 'team@posto.page',
    subject: 'Feedback Form Submission: Open IPA',
    content: [
      {
        type: 'text/html',
        value: html,
      },
    ],
  };

  await sendgridMail.send(msg).catch(() => {
    res.status(400).json({ error: 'something went wrong :(' });
  });

  res.status(201).end();
};
