import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const SimplePagination: React.FC = () => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination count={10} variant="outlined" shape="rounded" onChange={handlePageChange} />
    </Stack>
  );
};

export default SimplePagination;
