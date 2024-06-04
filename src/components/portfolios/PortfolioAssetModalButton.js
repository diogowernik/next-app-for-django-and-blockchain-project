import React from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAddPortfolioAsset } from '@/hooks/create/useAddPortfolioAsset';
import { PortfolioAssetForm } from './PortfolioAssetForm';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export const PortfolioAssetModalButton = ({ djangoToken, addAssetToGrid }) => {
  const { isOpen, openModal, closeModal, handleAddAsset, isLoading, error } = useAddPortfolioAsset(djangoToken, addAssetToGrid);
  const router = useRouter();
  const portfolioId = router.query.portfolio_id;

  return (
    <>
      <IconButton 
          onClick={openModal} 
          color="primary" 
          sx={{ 
              color: 'white', // Define a cor do ícone
              backgroundColor: 'primary.main', // Cor de fundo primária do tema
              '&:hover': {
                  backgroundColor: 'primary.dark' // Cor de fundo mais escura ao passar o mouse
              }
          }}
      >
          <AddIcon />
      </IconButton>
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

