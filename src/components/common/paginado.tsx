import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface SimplePaginationProps {
  onChange?: (page: number) => void;
  totalPages?:number | undefined;
}

const SimplePagination: React.FC<SimplePaginationProps> = ({ onChange,totalPages }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" py={2}>
      <Pagination 
        count={totalPages ?? 10} 
        variant="outlined" 
        shape="rounded" 
        onChange={handlePageChange}
        size="medium"
        siblingCount={0}
        boundaryCount={1}
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            minWidth: { xs: '28px', sm: '32px' },
            height: { xs: '28px', sm: '32px' }
          }
        }}
      />
    </Stack>
  );
};


export default SimplePagination;
