import React from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { Languages } from '../../constants/Interfaces';
import { useEditorStore } from '../../state/editor';
import { capitalizeFirstLetter } from '../../util/StringHelper';
import CheckboxButton from '../buttons/CheckboxButton';
import Blockquote from '../core/Blockquote';
import styles from './TranscriptionDescription.module.scss';
import TranscriptionEditorOptions from './TranscriptionEditorOptions';


interface Props {
  language: Languages;
  setLanguage?: (language: Languages) => void;
  lockLanguage?: boolean;
  editorView?: boolean;
}

const TranscriptionDescription: React.FC<Props> = ({
  language,
  setLanguage = () => {},
  lockLanguage = false,
  editorView = false,
}) => {
  const router = useRouter();

  return (
    <div>
      {!editorView && (
        <Blockquote>
          Tip: Open IPA gives in-depth transcription guidelines for each
          character it transcribes. Try hovering over a letter in the IPA result
          to try it out!
        </Blockquote>
      )}
      <div
        className={clsx(styles['container'], {
          'flex-col': editorView,
        })}
      >
        {!editorView && (
          <div className={styles['language-select']}>
            {lockLanguage ? (
              <h2>
                {capitalizeFirstLetter(language)} to IPA Text Transcription
              </h2>
            ) : (
              <h2>
                Transcribe from
                <select
                  value={language}
                  title='Select transcription language'
                  onChange={(e) => {
                    setLanguage(e.target.value as Languages);
                    router.push(
                      `/transcription/${language}`,
                      `/transcription/${e.target.value}`
                    );
                  }}
                >
                  <option value='latin'>Latin</option>
                  <option value='french'>French</option>
                </select>
                into IPA
              </h2>
            )}
          </div>
        )}

        <TranscriptionEditorOptions language={language} />
      </div>
    </div>
  );
};

export default TranscriptionDescription;
