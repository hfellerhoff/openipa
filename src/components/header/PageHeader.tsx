import React from "react";

import clsx from "clsx";

interface Props {
  title: string;
  subtitle: string;
  colorClassName: string;
}

const PageHeader = ({ title, subtitle, colorClassName }: Props) => {
  return (
    <div
      className={clsx(
        "w-full py-12 lg:py-16 flex flex-col align-center justify-center px-6",
        colorClassName
      )}
    >
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl text-gray-50 lg:text-4xl">{title}</h1>
        <p className="mt-4 text-base text-gray-200 lg:text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
