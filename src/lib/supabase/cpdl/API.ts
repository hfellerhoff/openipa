export const BASE_URL = 'https://www.cpdl.org/wiki/api.php';

export const getCPDLTextSeachQuery = (text: string) => {
  return `${BASE_URL}?action=query&list=search&srsearch=${encodeURIComponent(
    text
  )}&utf8=&format=json`;
};

// export const getCPDLPageQuery = (title: string) => {
//   return `${BASE_URL}?action=query&prop=extracts&exsentences=50&exlimit=1&titles=${encodeURIComponent(
//     title
//   )}&explaintext=1&formatversion=2&format=json`;
// };

export const getCPDLPageQuery = (title: string) => {
  return `${BASE_URL}?action=query&prop=revisions&titles=${encodeURIComponent(
    title
  )}&rvslots=*&rvprop=content&formatversion=2&format=json`;
};
