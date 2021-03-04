import { FormEvent, ChangeEvent, useState } from 'react';

type SearchFieldProps = {
  onSubmit?: (value: string) => void;
};

export const SearchField: React.FC<SearchFieldProps> = ({ onSubmit }) => {
  const [search, setSearchValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.currentTarget.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget.search;

    onSubmit && onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="search" type="text" value={search} onChange={handleInputChange} />
      <button className="button" type="submit">Search</button>
    </form>
  );
};
