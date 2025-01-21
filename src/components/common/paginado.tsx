import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface SimplePaginationProps {
  onChange?: (page: number) => void;
}

const SimplePagination: React.FC<SimplePaginationProps> = ({ onChange }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handlePageChange} />
    </Stack>
  );
};


export default SimplePagination;
