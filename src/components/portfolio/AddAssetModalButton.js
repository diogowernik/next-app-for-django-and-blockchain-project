import React from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAddPortfolioAsset } from '@/hooks/create/useAddPortfolioAsset';
import { PortfolioAssetForm } from './PortfolioAssetForm';
import { useRouter } from 'next/router';

const AddAssetModalButton = ({ djangoToken }) => {
  const { isOpen, openModal, closeModal, handleAddAsset, isLoading, error } = useAddPortfolioAsset(djangoToken);
  const router = useRouter();
  // Corretamente extrair portfolio_id do router.query
  const portfolioId = router.query.portfolio_id;

  console.log(portfolioId);  // Agora deve logar o ID do portfólio, como '2'

  return (
    <>
      <Button onClick={openModal} variant="contained" color="primary" sx={{ float: 'right', mt: 3, mr: 2 }}>
        Add Asset
      </Button>
      <Modal show={isOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {error && <Alert severity="error">{error}</Alert>}
              <PortfolioAssetForm 
                onSubmit={handleAddAsset} 
                portfolioId={portfolioId}  // Passar como uma string
                token={djangoToken} />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAssetModalButton;
