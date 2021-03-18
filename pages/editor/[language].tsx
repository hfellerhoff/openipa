import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../src/components/buttons/Button';
import EditorLayout from '../../src/components/layout/EditorLayout';
import PrivateLayout from '../../src/components/layout/PrivateLayout';
import RuleList from '../../src/components/editors/language/RuleList';
import { Rule } from '../../src/lib/supabase/models/Rule';
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
    slug: '',
    id: 0,
  });

  const { categories, subcategories, ipa, rules } = useSupabaseIPA();

  useEffect(() => {
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
          }
        } else {
          router.replace('/editor');
        }
      }
    };

    if (router.query.language && language.id === 0) getLanguage();
  }, [router.query, language]);

  return (
    <EditorLayout>
      <Head>
        <title>{language.label} Editor - Open IPA</title>
      </Head>
      <div className='p-8'>
        <h3 className='mb-4'>{language.label} Transcription Rules</h3>
        <RuleList
          rules={Object.values(rules)}
          ipa={ipa}
          subcategories={subcategories}
          categories={categories}
          languageId={language.id}
        />
      </div>
    </EditorLayout>
  );
};

export default LanguageEditor;
