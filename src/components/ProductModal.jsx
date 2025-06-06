import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductModal = ({ show, onClose, onSubmit, title, submitLabel, initialValues }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    image: Yup.string().url('Invalid URL').required('Image URL is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().positive('Price must be a positive number').required('Price is required'),
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues || { title: '', image: '', description: '', price: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter product title"
                  as={Form.Control}
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="productImage" className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Field
                  type="text"
                  name="image"
                  placeholder="Enter image URL"
                  as={Form.Control}
                />
                <ErrorMessage name="image" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="productDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Field
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Enter product description"
                  className="form-control"
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="productPrice" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Field
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  as={Form.Control}
                />
                <ErrorMessage name="price" component="div" className="text-danger" />
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {submitLabel}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;