export const paginate = (items, currentPage) => {
  const maxItems = 10;
  const totalPages = Math.ceil(items.length / maxItems);
  const startIndex = (currentPage - 1) * maxItems;
  const endIndex = startIndex + maxItems;
  const itemsToDisplay = items.slice(startIndex, endIndex);

  return { itemsToDisplay, totalPages };
};
