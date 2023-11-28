import React from 'react';
import {Button} from '@mui/material';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const CustomPagination: React.FC<Props> = ({currentPage, totalPages, onPageChange}) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className='center-content'>
            <Button
                color='success'
                variant="contained"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='pagination-buttons'
            >
                Prev
            </Button>
            {currentPage} / {totalPages}
            <Button
                color='success'
                variant="contained"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='pagination-buttons'
            >
                Next
            </Button>
        </div>
    );
};

export default CustomPagination;
