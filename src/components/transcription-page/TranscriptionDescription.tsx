import React, { useState } from 'react';

import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

import styles from './TranscriptionDescription.module.scss';
import TranscriptionEditorOptions from './TranscriptionEditorOptions';
import { Languages } from '../../constants/Interfaces';
import { capitalizeFirstLetter } from '../../util/StringHelper';
import Blockquote from '../core/Blockquote';

interface Props {
  language: Languages;
  setLanguage?: (language: Languages) => void;
  lockLanguage?: boolean;
  editorView?: boolean;
}

const TranscriptionDescription: React.FC<Props> = ({
  language,
  setLanguage,
  lockLanguage = false,
  editorView = false,
}) => {
  const [localLanguage, setLocalLanguage] = useState(language);

  const isLoading = language !== localLanguage;

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
                {isLoading ? (
                  <div className='inline-block mx-4 mb-[2px]'>
                    <PulseLoader size={14} />
                  </div>
                ) : (
                  <select
                    value={language}
                    title='Select transcription language'
                    onChange={(e) => {
                      if (!setLanguage) return;

                      const newLanguage = e.target.value as Languages;
                      setLocalLanguage(newLanguage);
                      setLanguage(newLanguage);
                    }}
                  >
                    <option value='latin'>Latin</option>
                    <option value='french'>French</option>
                  </select>
                )}
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
