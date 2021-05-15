export const getKey = (prefix, currentKey, parentKeyPath, marginLeft) => {
  return `${prefix}_${parentKeyPath}_${currentKey}_${marginLeft}`;
};
