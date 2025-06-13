import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Form, Button, Card, Row, Col, Image } from 'react-bootstrap'; // Import Image component
import Header from '../../components/Header';

const Signup = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10,15}$/, 'Phone number must be 10 to 15 digits'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Registration Form Submitted:', values);

    setTimeout(() => {
      alert('Registration successful! Check console for data.');
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section>
      <Header />
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card className="p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
          <Card.Body>
            {/* Logo */}
            <div className="text-center mb-4">
              <Image
                src="https://img.pikbest.com/png-images/ecommerce-logo-vector-graphics-element--e-commerce-logo-icon-design-online-store-logo-icon_1726010.png!sw800"
                alt="Company Logo"
                roundedCircle // Optional: Makes the logo circular
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
            {/* End Logo */}

            <h2 className="text-center mb-4">Register</h2>
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      as={Form.Control}
                    />
                    <ErrorMessage name="fullName" component="div" className="text-danger" />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      as={Form.Control}
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </Form.Group>

                  {/* Phone */}
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Enter your phone number"
                      as={Form.Control}
                    />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      as={Form.Control}
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      as={Form.Control}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Signup;
