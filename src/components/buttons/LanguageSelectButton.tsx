import React from "react";

import Link from "next/link";

import { Languages } from "../../constants/Interfaces";
import { capitalizeFirstLetter } from "../../util/StringHelper";
import styles from "./LanguageSelectButton.module.scss";

interface Props {
  language: Languages;
  status: "active" | "caution" | "inactive";
}

const LanguageSelectButton: React.FC<Props> = ({ language, status }) => {
  let buttonStyle = "primary";
  switch (status) {
    case "active":
      break;
    case "caution":
      buttonStyle = "warning";
      break;
    case "inactive":
      buttonStyle = "disabled";
      break;
  }
  const className = `button button-lg button--${buttonStyle} ${styles.button}`;

  if (status !== "inactive") {
    return (
      <Link href={`/transcription/${language}`} className={className}>
        {capitalizeFirstLetter(language)}
      </Link>
    );
  }
  return <div className={className}>{capitalizeFirstLetter(language)}</div>;
};

export default LanguageSelectButton;
