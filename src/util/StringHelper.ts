export const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';
  if (text.length > 1) {
    return text.charAt(0).toUpperCase() + text.substring(1, text.length);
  } else {
    return text.charAt(0).toUpperCase();
  }
};
