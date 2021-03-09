import React, { useState } from 'react';
import useSupabaseIPA, {
  IPACategoryDictionary,
  IPADictionary,
  IPASubcategoryDictionary,
} from '../../hooks/useSupabaseIPA';
import supabase from '../../lib/supabase';
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
  categories: IPACategoryDictionary;
  subcategories: IPASubcategoryDictionary;
  ipa: IPADictionary;
}

const EditorIPA = ({
  category,
  categories,
  subcategories,
  ipa,
  selectedIPA,
  onSelectIPA,
}: Props) => {
  const [shouldAddCategory, setShouldAddCategory] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState('');

  const handleAddCategory = async () => {
    const res = await supabase.from('ipa_subcategory').insert({
      label: categoryLabel,
      category,
    });

    if (!res.error) {
      setCategoryLabel('');
      setShouldAddCategory(false);
    }
  };

  return (
    <div className={styles.container}>
      {category ? (
        <ul>
          {Object.values(subcategories)
            .filter((s) => s.category === category)
            .map((subcategory) => (
              <li key={subcategory.id} className={styles['subcategory']}>
                <h3>{subcategory.label}</h3>
                <ul className={styles['ipa-container']}>
                  {Object.values(ipa)
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
          {!shouldAddCategory ? (
            <button
              className='button button--primary'
              onClick={() => setShouldAddCategory(true)}
            >
              Add Category
            </button>
          ) : (
            <div>
              <input
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
              ></input>
              <button
                className='button button--primary button--sm'
                onClick={handleAddCategory}
              >
                Add
              </button>
              <button
                className='button button--warning button--sm'
                onClick={() => setShouldAddCategory(false)}
              >
                X
              </button>
            </div>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditorIPA;
