import { useEffect, useState } from 'react';

import { Dictionary } from '../../hooks/useSupabaseTable';
import supabase from '../../lib/supabase';
import { IPA, IPASubcategory } from '../../lib/supabase/models/IPA';
import Button from '../buttons/Button';
import styles from './EditorIPARightSidebar.module.scss';
import IPAInput from './language/IPAInput';

interface Props {
  ipa: Dictionary<IPA>;
  subcategories: Dictionary<IPASubcategory>;
  selectedIPA: number;
  category: number;
}

const EditorIPARightSidebar = ({
  ipa,
  selectedIPA,
  subcategories,
  category,
}: Props) => {
  const [ipaSymbol, setIpaSymbol] = useState('');
  const [ipaSubcategory, setIpaSubcategory] = useState(1);

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
    if (initialSubcategory) {
      setSubcategory(initialSubcategory.id);
    }
  }, [selectedIPA, initialSubcategory]);

  const handleSave = async () => {
    if (ipaElement && subcategory && initialSubcategory) {
      if (subcategory !== initialSubcategory.id) {
        await supabase
          .from('ipa')
          .update({ subcategory })
          .eq('id', ipaElement.id);
      }
    }
  };

  const handleCreate = async () => {
    await supabase
      .from('ipa')
      .insert([
        { symbol: ipaSymbol, subcategory: ipaSubcategory, tags: [], category },
      ]);

    setIpaSubcategory(1);
    setIpaSymbol('');
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
                title='IPA Type'
                value={subcategory}
                className={styles.option}
                onChange={(e) => setSubcategory(parseInt(e.target.value))}
              >
                {Object.values(subcategories)
                  .filter((s) => s.category === category)
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
          <div>
            <label className={styles.label}>TAGS</label>
            {subcategory ? (
              <select
                title='IPA Tags'
                value={subcategory}
                className={styles.option}
                onChange={(e) => setSubcategory(parseInt(e.target.value))}
              >
                {Object.values(subcategories)
                  .filter((s) => s.category === category)
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
        <Button colorScheme='primary' variant='wide' onClick={handleSave}>
          Save
        </Button>
      </div>
    );
  else
    return (
      <div className={styles.container}>
        <div>
          <div className='flex mb-8'>
            <IPAInput value={ipaSymbol} setValue={setIpaSymbol} />
          </div>
          <div>
            <label className={styles.label}>TYPE</label>
            {ipaSubcategory ? (
              <select
                title='IPA Subcategory'
                value={ipaSubcategory}
                className={styles.option}
                onChange={(e) => setIpaSubcategory(parseInt(e.target.value))}
              >
                {Object.values(subcategories)
                  .filter((s) => s.category === category)
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
        <Button colorScheme='primary' variant='wide' onClick={handleCreate}>
          Create
        </Button>
      </div>
    );
};

export default EditorIPARightSidebar;
