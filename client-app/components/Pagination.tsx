// client-app/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px' }}>
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                style={{
                    padding: '5px 10px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s, transform 0.3s',
                    backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px'
                }}
                onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                        e.currentTarget.style.backgroundColor = '#0056b3';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (currentPage !== 1) {
                        e.currentTarget.style.backgroundColor = '#007bff';
                        e.currentTarget.style.transform = 'scale(1)';
                    }
                }}
            >
                Previous
            </button>
            <span style={{ fontWeight: 'bold' }}>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                style={{
                    padding: '5px 10px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s, transform 0.3s',
                    backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px'
                }}
                onMouseEnter={(e) => {
                    if (currentPage !== totalPages) {
                        e.currentTarget.style.backgroundColor = '#0056b3';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (currentPage !== totalPages) {
                        e.currentTarget.style.backgroundColor = '#007bff';
                        e.currentTarget.style.transform = 'scale(1)';
                    }
                }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;