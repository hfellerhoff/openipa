import React from 'react';

import styles from './EditorIPALeftSidebar.module.scss';
import { Dictionary } from '../../hooks/useSupabaseTable';
import { DatabaseIPACategory } from '../../lib/supabase/types';

interface ItemProps {
  category: DatabaseIPACategory;
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
  categories: Dictionary<DatabaseIPACategory>;
  selectedCategory: number;
  onSelectCategory: (c: number) => void;
}

const EditorIPALeftSidebar = ({
  selectedCategory,
  categories,
  onSelectCategory,
}: Props) => {
  return (
    <div>
      {Object.values(categories).map((category, i) => (
        <SidebarItem
          key={i}
          onSelectCategory={onSelectCategory}
          category={category}
          isSelected={
            selectedCategory ? category.id === selectedCategory : false
          }
        />
      ))}
    </div>
  );
};

export default EditorIPALeftSidebar;
