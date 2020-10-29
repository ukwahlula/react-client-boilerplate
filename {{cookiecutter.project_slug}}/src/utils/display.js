export const getDisplayName = (options, value) => {
  const items = options.filter((item) => item.value === value);
  if (items.length > 0) {
    return items[0].label;
  }
  return null;
};
