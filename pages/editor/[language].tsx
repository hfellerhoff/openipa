import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../src/components/buttons/Button';
import EditorLayout from '../../src/components/layout/EditorLayout';
import PrivateLayout from '../../src/components/layout/PrivateLayout';
import RuleList from '../../src/components/editors/language/RuleList';
import { Rule } from '../../src/constants/Rule';
import useSupabaseIPA from '../../src/hooks/useSupabaseIPA';
import supabase from '../../src/lib/supabase';
import { Language } from '../../src/lib/supabase/models/Language';
import idsToIPAString from '../../src/util/supabase/idsToIPAString';
import parseIPASymbolString from '../../src/util/supabase/parseIPASymbolString';
import styles from './Language.module.scss';

interface Props {}

const LanguageEditor = (props: Props) => {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>({
    label: '',
    id: 0,
  });

  const [rules, setRules] = useState<Rule[]>([]);
  const { categories, subcategories, ipa } = useSupabaseIPA();

  const [addNewRule, setAddNewRule] = useState(false);
  const [inputFields, setInputFields] = useState({
    0: '',
  });

  useEffect(() => {
    const getRules = async () => {
      const { data, error } = await supabase
        .from('rules')
        .select('*')
        .eq('language', language.id);
      if (!error && data.length > 0) {
        setRules(data);
      }
    };

    const getLanguage = async () => {
      if (router.query.language) {
        const id = parseInt(router.query.language as string);
        if (!isNaN(id)) {
          const { data, error } = await supabase
            .from('languages')
            .select('*')
            .eq('id', id);
          if (!error && data.length > 0) {
            setLanguage(data[0] as Language);

            getRules();
          }
        } else {
          router.replace('/editor');
        }
      }
    };

    if (router.query.language) getLanguage();
  }, [router.query]);

  return (
    <EditorLayout leftSidebar={<></>} rightSidebar={<></>}>
      <Head>
        <title>{language.label} Editor - Open IPA</title>
      </Head>
      <div className='p-8'>
        <h3 className='mb-4'>{language.label} Transcription Rules</h3>
        <RuleList
          rules={rules}
          ipa={ipa}
          subcategories={subcategories}
          categories={categories}
        />
      </div>
    </EditorLayout>
  );
};

export default LanguageEditor;
