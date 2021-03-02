import React from 'react';
import useSupabaseIPA from '../../hooks/useSupabaseIPA';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import styles from './EditorIPA.module.scss';

interface Props {
  selectedIPA?: number;
  onSelectIPA: (c: number) => void;
  category: number;
  categories: IPACategory[];
  subcategories: IPASubcategory[];
  ipa: IPA[];
}

const EditorIPA = ({
  category,
  categories,
  subcategories,
  ipa,
  selectedIPA,
  onSelectIPA,
}: Props) => {
  return (
    <div className={styles.container}>
      {category ? (
        <ul>
          {subcategories
            .filter((s) => s.category === category)
            .map((subcategory) => (
              <li key={subcategory.id}>
                <h3>{subcategory.label}</h3>
                <ul className={styles['ipa-container']}>
                  {ipa
                    .filter((ipa) => ipa.subcategory === subcategory.id)
                    .map((ipa) => (
                      <li key={ipa.id}>
                        <button
                          onClick={() => onSelectIPA(ipa.id)}
                          className={`${styles.ipa} ${
                            selectedIPA
                              ? ipa.id === selectedIPA
                                ? styles['ipa--selected']
                                : ''
                              : ''
                          }`}
                        >
                          <h4 className={styles['ipa-text']}>{ipa.symbol}</h4>
                        </button>
                      </li>
                    ))}
                  <li key='new'>
                    <button
                      onClick={() => onSelectIPA(0)}
                      className={`${styles.ipa}`}
                    >
                      <h4>+</h4>
                    </button>
                  </li>
                </ul>
              </li>
            ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditorIPA;
