import React, { useState } from 'react';
import { Languages } from '../../constants/Interfaces';
import TextInput from '../input/TextInput';
import ResultDisplay from '../display/ResultDisplay';
import styles from './Demonstration.module.scss';
import parseLatin from '../../transcription/latin/ParseLatin';
import { capitalizeFirstLetter } from '../../util/StringHelper';

interface Props {}

const Demonstration: React.FC<Props> = () => {
  const [inputText, setInputText] = useState('Ave maria, gratia plena.');
  const [language] = useState(Languages.Latin);
  const [resultHeight, setResultHeight] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles['container-left']}>
        <h1 className={styles.title}>Why Open IPA?</h1>
        <p className={styles.description}>
          Open IPA features text to IPA transcription in real-time. That means
          you can type out text, and Open IPA will transcribe it live in front
          of you, without having to wait for a transcription to be procesed. Try
          it out in the boxes!
        </p>
        <p className={styles.description}>
          In addition to live transcription, Open IPA gives you nuanced feedback
          about each transcription. Try hovering over the syllables in the IPA
          result to see!
        </p>
      </div>
      <div style={{ width: 40, height: 40 }} />
      <div className={styles['container-right']}>
        <div className={styles['container-right-container-left']}>
          <TextInput
            inputText={inputText}
            setInputText={setInputText}
            theme='dark'
            displayHeight={resultHeight}
          />
          <h3 className={styles.inputTitle}>
            {`${capitalizeFirstLetter(language)} Text Input`}
          </h3>
        </div>
        <div className={styles['container-right-container-right']}>
          <ResultDisplay
            result={parseLatin(inputText)}
            theme='dark'
            setHeight={(height) => setResultHeight(height)}
          />
          <h3 className={styles.inputTitle}>IPA Result</h3>
        </div>
      </div>
    </div>
  );
};

export default Demonstration;
