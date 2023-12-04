import React from 'react';
import {Pagination, Stack} from '@mui/material';
import './CustomPagination.css';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const CustomPagination: React.FC<Props> = ({currentPage, totalPages, onPageChange}) => {
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    return (
        <div className="center-content">
            <Stack>
                <Pagination
                    page={currentPage}
                    count={totalPages}
                    color="primary"
                    onChange={handlePaginationChange}
                    size='large'
                    className='pagination-spacing'
                />
            </Stack>
        </div>
    );
};

export default CustomPagination;
