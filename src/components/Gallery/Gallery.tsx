import { useState } from 'react';
import { SearchField } from './SearchField';
import { ImageList } from './ImageList';
import { Pagination } from './Pagination';
import { Section } from '../../common/Section';
import { Title } from '../../common/Title';
import { searchImages, SearchImagesResult } from '../../services/unsplash';
import { errorHandler } from '../../utils/errorHandler';

export const Gallery: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchImagesResult | null>(null);
  const [search, setSearch] = useState('');

  const getImages = async (search: string, page = 1) => {
    const res = await errorHandler(searchImages)(search, page);
    res && setSearchResult(res);
  };

  const handleSubmit = async (search: string, page = 1) => {
    await getImages(search, page);
    setSearch(search);
  };

  const handleChangePage = (page: number) => getImages(search, page);

  return (
    <Section>
      <Title>Search photo</Title>
      <SearchField onSubmit={handleSubmit} />
      {searchResult?.results && <ImageList images={searchResult.results} />}

      {searchResult?.total_pages && (
        <Pagination pageCount={searchResult.total_pages} onChange={handleChangePage} />
      )}
    </Section>
  );
};
