import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { IPA, IPACategory, IPASubcategory } from '../lib/supabase/models/IPA';

export interface IPADictionary {
  [id: number]: IPA;
}

export interface IPASubcategoryDictionary {
  [id: number]: IPASubcategory;
}

export interface IPACategoryDictionary {
  [id: number]: IPACategory;
}

const useSupabaseIPA = () => {
  const [ipa, setIPA] = useState<{ [id: number]: IPA }>({});
  const [subcategories, setSubcategories] = useState<{
    [id: number]: IPASubcategory;
  }>({});
  const [categories, setCategories] = useState<{ [id: number]: IPACategory }>(
    {}
  );

  const fetchIPA = async () => {
    const { data, error } = await supabase
      .from<IPA>('ipa')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log('error', error);
    else {
      let updatedIPA = {};
      data.forEach((ipaElement) => {
        updatedIPA[ipaElement.id] = ipaElement;
      });

      setIPA(updatedIPA);
    }
  };

  const fetchSubcategories = async () => {
    const { data, error } = await supabase
      .from<IPASubcategory>('ipa_subcategory')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log('error', error);
    else {
      let updatedSubcategories = {};
      data.forEach((s) => {
        updatedSubcategories[s.id] = s;
      });

      setSubcategories(updatedSubcategories);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from<IPACategory>('ipa_category')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log('error', error);
    else {
      let updatedCategories = {};
      data.forEach((c) => {
        updatedCategories[c.id] = c;
      });

      setCategories(updatedCategories);
    }
  };

  useEffect(() => {
    fetchIPA();
    fetchSubcategories();
    fetchCategories();
  }, []);

  return { ipa, subcategories, categories };
};

export default useSupabaseIPA;
