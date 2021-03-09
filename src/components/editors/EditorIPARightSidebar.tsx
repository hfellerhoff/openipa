import React, { useEffect, useState } from 'react';
import {
  IPADictionary,
  IPASubcategoryDictionary,
} from '../../hooks/useSupabaseIPA';
import supabase from '../../lib/supabase';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import styles from './EditorIPARightSidebar.module.scss';

interface Props {
  ipa: IPADictionary;
  subcategories: IPASubcategoryDictionary;
  selectedIPA: number;
}

const EditorIPARightSidebar = ({ ipa, selectedIPA, subcategories }: Props) => {
  const ipaElement = ipa[selectedIPA] ? ipa[selectedIPA] : undefined;
  const initialSubcategory =
    subcategories && ipaElement
      ? subcategories[ipaElement.subcategory]
      : undefined;

  const [subcategory, setSubcategory] = useState<number>();

  useEffect(() => {
    setSubcategory(0);
  }, [selectedIPA]);

  useEffect(() => {
    if (initialSubcategory) setSubcategory(initialSubcategory.id);
  }, [selectedIPA, initialSubcategory]);

  const handleSave = async () => {
    if (ipaElement && subcategory && initialSubcategory) {
      if (subcategory !== initialSubcategory.id) {
        const { data, error } = await supabase
          .from('ipa')
          .update({ subcategory })
          .eq('id', ipaElement.id);
      }
    }
  };

  if (ipaElement)
    return (
      <div className={styles.container}>
        <div>
          <div className={styles.ipa}>
            <h2>{ipaElement.symbol}</h2>
          </div>
          <div>
            <label className={styles.label}>TYPE</label>
            {subcategory ? (
              <select
                value={subcategory}
                className={styles.option}
                onChange={(e) => setSubcategory(parseInt(e.target.value))}
              >
                {Object.values(subcategories)
                  .filter((s) => s.category === initialSubcategory.category)
                  .map((s) => (
                    <option value={s.id} key={s.id}>
                      {s.label}
                    </option>
                  ))}
              </select>
            ) : (
              <></>
            )}
          </div>
        </div>
        <button className='button button--primary' onClick={handleSave}>
          Save
        </button>
      </div>
    );
  else return <></>;
};

export default EditorIPARightSidebar;
