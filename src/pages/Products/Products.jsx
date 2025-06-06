import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Header from '../../components/Header';
import EmptyComponent from '../../components/EmptyComponent';
import ProductCard from '../../components/ProductCard';
import ProductModal from '../../components/ProductModal';
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  resetProductState,
} from '../../redux/actions/productActions';
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: productActionLoading,
    error: productActionError,
    success: productActionSuccess,
    product: currentProductAction,
  } = productDetails;

  const [showProductModal, setShowProductModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [submitButtonLabel, setSubmitButtonLabel] = useState('');
  const [initialProductValues, setInitialProductValues] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productActionSuccess) {
      toast.success(
        isEditMode ? 'Product updated successfully!' : 'Product created successfully!'
      );
      setShowProductModal(false);
      dispatch(resetProductState());
      dispatch(listProducts());
    }
    if (productActionError) {
      toast.error(
        isEditMode ? `Error updating product: ${productActionError}` : `Error creating product: ${productActionError}`
      );
      dispatch(resetProductState());
    }
  }, [productActionSuccess, productActionError, dispatch, isEditMode]);


  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setInitialProductValues(null);
    setIsEditMode(false);
    dispatch(resetProductState());
    dispatch(listProducts());
  };

  const handleAddProductClick = () => {
    setModalTitle('Add New Product');
    setSubmitButtonLabel('Add Product');
    setInitialProductValues({ title: '', image: '', description: '', price: '' });
    setIsEditMode(false);
    setShowProductModal(true);
  };

  const handleEditProductClick = (product) => {
    setModalTitle('Edit Product');
    setSubmitButtonLabel('Save Changes');
    setInitialProductValues({
      id: product.id,
      title: product.title,
      image: product.image,
      description: product.description,
      price: product.price,
    });
    setIsEditMode(true);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSubmitProductForm = (values) => {
    if (isEditMode) {
      dispatch(updateProduct(values.id, values));
    } else {
      dispatch(createProduct(values));
    }
  };

  return (
    <section>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <Button onClick={handleAddProductClick}>
            Add New Product
          </Button>
        </div>

        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading Products...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            Error: {error}
          </Alert>
        )}

        {!loading && !error && products.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <EmptyComponent message="No products found." />
          </div>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onEdit={() => handleEditProductClick(product)}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              </Col>
            ))}
          </Row>
        )}

        <ProductModal
          show={showProductModal}
          onClose={handleCloseProductModal}
          onSubmit={handleSubmitProductForm}
          title={modalTitle}
          submitLabel={submitButtonLabel}
          initialValues={initialProductValues}
        />
      </Container>
    </section>
  );
};

export default Products;