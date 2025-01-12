// EditProductModal.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  titular: Yup.string()
    .required('El titular es obligatorio'),
  descripcion: Yup.string()
    .required('La descripción es obligatoria')
});

const EditProductModal = ({ show, onHide, onSubmit }) => {
  const initialValues = {
    titular: '',
    descripcion: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
      tabIndex="-1"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Producto</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              aria-label="Close"
            />
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="titular" className="form-label">
                      Titular
                    </label>
                    <Field
                      type="text"
                      id="titular"
                      name="titular"
                      className={`form-control ${
                        touched.titular && errors.titular ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      name="titular"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Descripción General
                    </label>
                    <Field
                      as="textarea"
                      id="descripcion"
                      name="descripcion"
                      className={`form-control ${
                        touched.descripcion && errors.descripcion ? 'is-invalid' : ''
                      }`}
                      rows="4"
                    />
                    <ErrorMessage
                      name="descripcion"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onHide}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"  style={{"zIndex": "-1"}}/>}
    </div>
  );
};

export default EditProductModal;