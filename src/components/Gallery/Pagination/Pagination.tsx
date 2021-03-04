import { useState } from 'react';
import style from './Pagination.module.css';

type Props = {
  pageCount: number;
  onChange?: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ pageCount, onChange }) => {
  const FIRST_PAGE = 1;
  const [page, setPage] = useState(FIRST_PAGE);

  const nextPage = () => {
    if (page === pageCount) {
      return;
    }

    setPage(page + 1);
    onChange && onChange(page + 1);
  };

  const prevPage = () => {
    if (page === FIRST_PAGE) {
      return;
    }

    setPage(page - 1);
    onChange && onChange(page - 1);
  };

  return (
    <div className={style.container}>
      <button className={style.button} onClick={prevPage}>
        Prev
      </button>
      {page}
      <button className={style.button} onClick={nextPage}>
        Next
      </button>
    </div>
  );
};
