import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { IPA, IPACategory, IPASubcategory } from '../lib/supabase/models/IPA';

const useSupabaseIPA = () => {
  const [ipa, setIPA] = useState<IPA[]>([]);
  const [subcategories, setSubcategories] = useState<IPASubcategory[]>([]);
  const [categories, setCategories] = useState<IPACategory[]>([]);

  const fetchIPA = async () => {
    const { data, error } = await supabase
      .from<IPA>('ipa')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log('error', error);
    else {
      setIPA(data);
    }
  };

  const fetchSubcategories = async () => {
    const { data, error } = await supabase
      .from<IPASubcategory>('ipa_subcategory')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log('error', error);
    else {
      setSubcategories(data);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from<IPACategory>('ipa_category')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.log('error', error);
    else {
      setCategories(data);
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
