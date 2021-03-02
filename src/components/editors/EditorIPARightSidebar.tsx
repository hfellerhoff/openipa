import React from 'react';
import { IPA, IPACategory } from '../../lib/supabase/models/IPA';
import styles from './EditorIPARightSidebar.module.scss';

interface ItemProps {
  category?: IPACategory;
  isSelected: boolean;
  onSelectCategory: (c: number) => void;
}

const SidebarItem = ({ category, onSelectCategory, isSelected }: ItemProps) => {
  const className = `${styles.item} ${
    isSelected ? styles['item--selected'] : ''
  }`;

  return (
    <button className={className} onClick={() => onSelectCategory(category.id)}>
      <h2 className={styles['item-text']}>{category.label}</h2>
    </button>
  );
};

interface Props {
  ipa?: IPA[];
  selectedIPA: number;
}

const EditorIPARightSidebar = ({ ipa, selectedIPA }: Props) => {
  const list = ipa ? ipa.filter((i) => i.id === selectedIPA) : [];
  const ipaElement = list.length > 0 ? list[0] : undefined;

  console.log(ipaElement);

  if (ipaElement) return <div>{ipaElement.symbol}</div>;
  else return <></>;
};

export default EditorIPARightSidebar;
