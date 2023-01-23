export const paginationLogic = (currentPage, pokemonsFilter) => {
  const pokemonsPerPage = 16;
  const sliceStart = (currentPage - 1) * pokemonsPerPage;
  const sliceEnd = currentPage * pokemonsPerPage;
  const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd);

  const lastPage = Math.ceil(pokemonsFilter.length / pokemonsPerPage);

  const pagesPerBlock = 5;
  const actualBlock = Math.ceil(currentPage / pagesPerBlock);

  const pagesInBlock = [];
  const minPage = actualBlock * pagesPerBlock - pagesPerBlock + 1;
  const maxPage = actualBlock * pagesPerBlock;
  for (let i = minPage; i <= maxPage; i++) {
    if (i <= lastPage) {
      pagesInBlock.push(i);
    }
  }
  return { pagesInBlock, lastPage, pokemonsInPage };
};
