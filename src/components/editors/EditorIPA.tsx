import { useState } from 'react';

import styles from './EditorIPA.module.scss';
import IPADisplay from './language/IPADisplay';
import { Dictionary } from '../../hooks/useSupabaseTable';
import supabase from '../../lib/supabase';
import {
  DatabaseIPA,
  DatabaseIPACategory,
  DatabaseIPASubcategory,
} from '../../lib/supabase/types';
import Button from '../buttons/Button';
import Card from '../cards/Card';

interface Props {
  selectedIPA?: number;
  onSelectIPA: (c: number) => void;
  category: number;
  categories: Dictionary<DatabaseIPACategory>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  ipa: Dictionary<DatabaseIPA>;
}

const EditorIPA = ({
  category,
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
              <li key={subcategory.id}>
                <Card className='p-6 mb-4'>
                  <h3>{subcategory.label}</h3>
                  <div className='flex align-center'>
                    <ul className='flex flex-wrap flex-1'>
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
                              <h4 className={styles['ipa-text']}>
                                {ipa.symbol}
                              </h4>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </Card>
              </li>
            ))}
          {!shouldAddCategory ? (
            <div className='flex'>
              <Button
                onClick={() => onSelectIPA(0)}
                colorScheme='grayscale'
                variant='wide'
              >
                Add Symbol
              </Button>
              <Button
                colorScheme='primary'
                variant='wide'
                onClick={() => setShouldAddCategory(true)}
                className='ml-1'
              >
                Add Subcategory
              </Button>
            </div>
          ) : (
            <Card>
              <div className='flex justify-between align-center'>
                <IPADisplay>
                  <input
                    title='Category label'
                    name='rule-description'
                    className={`bg-gray-200 font-sans w-full flex-1`}
                    value={categoryLabel}
                    onChange={(e) => setCategoryLabel(e.target.value)}
                  ></input>
                </IPADisplay>
                <div>
                  <Button
                    colorScheme='primary'
                    onClick={handleAddCategory}
                    className='ml-1'
                  >
                    Add
                  </Button>
                  <Button
                    colorScheme='error'
                    onClick={() => setShouldAddCategory(false)}
                    className='ml-1'
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditorIPA;
