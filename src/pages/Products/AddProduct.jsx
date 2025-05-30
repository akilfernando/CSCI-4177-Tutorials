import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ProductModal from '../../components/ProductModal';

const AddProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", banner: "", description: "", price: "" });

  const handleSubmit = () => {
    console.log("Submitted product:", formData);
    setShowModal(false);
    setFormData({ name: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus-circle me-2"></i>Add Product
      </Button>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        title="Add New Product"
        submitLabel="Add Product"
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Banner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter banner URL"
              name="banner"
              value={formData.banner}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={formData.price || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </ProductModal>
    </>
  );
};

export default AddProduct;
