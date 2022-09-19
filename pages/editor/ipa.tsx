import React, { useState } from 'react';

import Head from 'next/head';

import EditorIPA from '../../src/components/editors/EditorIPA';
import EditorIPALeftSidebar from '../../src/components/editors/EditorIPALeftSidebar';
import EditorIPARightSidebar from '../../src/components/editors/EditorIPARightSidebar';
import EditorLayout from '../../src/components/layout/EditorLayout';
import useSupabaseIPA from '../../src/hooks/useSupabaseIPA';

const IPAEditor = () => {
  const [categoryID, setCategoryID] = useState<number>(1);
  const [ipaID, setSelectedIPAID] = useState<number>(0);
  const { categories, subcategories, ipa } = useSupabaseIPA();

  return (
    <>
      <Head>
        <title>IPA Editor - Open IPA</title>
      </Head>
      <EditorLayout
        leftSidebar={
          <EditorIPALeftSidebar
            categories={categories}
            selectedCategory={categoryID}
            onSelectCategory={setCategoryID}
          />
        }
        rightSidebar={
          <EditorIPARightSidebar
            selectedIPA={ipaID}
            ipa={ipa}
            subcategories={subcategories}
            category={categoryID}
          />
        }
      >
        <EditorIPA
          selectedIPA={ipaID}
          onSelectIPA={setSelectedIPAID}
          category={categoryID}
          categories={categories}
          subcategories={subcategories}
          ipa={ipa}
        />
      </EditorLayout>
    </>
  );
};

export default IPAEditor;
