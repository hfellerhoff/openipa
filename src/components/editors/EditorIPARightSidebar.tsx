import { useState } from "react";

import styles from "./EditorIPARightSidebar.module.scss";
import IPAInput from "./language/IPAInput";
import { Dictionary } from "../../hooks/useSupabaseTable";
import supabase from "../../lib/supabase";
import {
  DatabaseIPA,
  DatabaseIPASubcategory,
  DatabaseIPATag,
} from "../../lib/supabase/types";
import Button from "../buttons/Button";

interface Props {
  ipa: Dictionary<DatabaseIPA>;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  selectedIPA: number;
  category: number;
  tags: Dictionary<DatabaseIPATag>;
}

interface ExistingIPAEditorProps {
  category: number;
  ipaElement: DatabaseIPA;
  subcategories: Dictionary<DatabaseIPASubcategory>;
  tags: Dictionary<DatabaseIPATag>;
}

const ExistingIPAEditor = ({
  category,
  ipaElement,
  subcategories,
  tags,
}: ExistingIPAEditorProps) => {
  const [subcategory, setSubcategory] = useState(ipaElement.subcategory ?? 0);
  const [selectedTags, setSelectedTags] = useState(ipaElement.tags);

  const handleSave = async () => {
    await supabase
      .from("ipa")
      .update({ subcategory: subcategory || null, tags: selectedTags })
      .eq("id", ipaElement.id);
  };

  const subcategoryOptions = Object.values(subcategories)
    .filter((candidate) => candidate.category === category)
    .map((candidate) => (
      <option value={candidate.id} key={candidate.id}>
        {candidate.label}
      </option>
    ));

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.ipa}>
          <h2>{ipaElement.symbol}</h2>
        </div>
        <div>
          <label className={styles.label}>TYPE</label>
          <select
            title="IPA Type"
            value={subcategory}
            className={styles.option}
            onChange={(event) => setSubcategory(Number(event.target.value))}
          >
            <option value={0} disabled>
              Select type
            </option>
            {subcategoryOptions}
          </select>
        </div>
        <div>
          <label className={styles.label}>TAGS</label>
          <select
            title="IPA Tags"
            multiple
            value={selectedTags.map(String)}
            className={styles.option}
            onChange={(event) =>
              setSelectedTags(
                Array.from(
                  event.target.selectedOptions,
                  (option) => option.value,
                ),
              )
            }
          >
            {Object.values(tags)
              .filter((tag) => tag.categories?.includes(category))
              .map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.label}
                </option>
              ))}
          </select>
        </div>
      </div>
      <Button colorScheme="primary" variant="wide" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

const EditorIPARightSidebar = ({
  ipa,
  selectedIPA,
  subcategories,
  category,
  tags,
}: Props) => {
  const [ipaSymbol, setIpaSymbol] = useState("");
  const [ipaSubcategory, setIpaSubcategory] = useState(1);

  const ipaElement = ipa[selectedIPA] ? ipa[selectedIPA] : undefined;

  const handleCreate = async () => {
    await supabase
      .from("ipa")
      .insert([
        { symbol: ipaSymbol, subcategory: ipaSubcategory, tags: [], category },
      ]);

    setIpaSubcategory(1);
    setIpaSymbol("");
  };

  if (ipaElement)
    return (
      <ExistingIPAEditor
        key={`${ipaElement.id}:${ipaElement.subcategory ?? "none"}:${ipaElement.tags.join(",")}`}
        category={category}
        ipaElement={ipaElement}
        subcategories={subcategories}
        tags={tags}
      />
    );
  else
    return (
      <div className={styles.container}>
        <div>
          <div className="flex mb-8">
            <IPAInput value={ipaSymbol} setValue={setIpaSymbol} />
          </div>
          <div>
            <label className={styles.label}>TYPE</label>
            {ipaSubcategory ? (
              <select
                title="IPA Subcategory"
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
        <Button colorScheme="primary" variant="wide" onClick={handleCreate}>
          Create
        </Button>
      </div>
    );
};

export default EditorIPARightSidebar;
