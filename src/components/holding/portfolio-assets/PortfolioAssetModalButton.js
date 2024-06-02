import React from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAddPortfolioAsset } from '@/hooks/create/useAddPortfolioAsset';
import { PortfolioAssetForm } from './PortfolioAssetForm';
import { useRouter } from 'next/router';

export const PortfolioAssetModalButton = ({ djangoToken, addAssetToGrid }) => {
  const { isOpen, openModal, closeModal, handleAddAsset, isLoading, error } = useAddPortfolioAsset(djangoToken, addAssetToGrid);
  const router = useRouter();
  const portfolioId = router.query.portfolio_id;

  return (
    <>
      <Button onClick={openModal} variant="contained" color="primary" sx={{ float: 'right', mt: 0, mr: 0 }}>
        Add
      </Button>
      <Modal show={isOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Investiment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {error && <Alert severity="error">{error}</Alert>}
              <PortfolioAssetForm 
                onSubmit={handleAddAsset} 
                portfolioId={portfolioId}
                token={djangoToken}
              />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

