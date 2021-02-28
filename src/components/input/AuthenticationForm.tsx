import { Field, Form, Formik } from 'formik';
import { stringify } from 'querystring';
import React from 'react';
import styles from './AuthenticationForm.module.scss';

interface Props {}

const AuthenticationForm = (props: Props) => {
  return (
    <div className={styles['content-container']}>
      <h1 className={styles['page-title']}>Transcription Editor</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className={styles['form']}>
          <Field
            className={styles['input']}
            type='email'
            name='email'
            id='email'
            placeholder='Email Address'
          ></Field>
          <Field
            className={styles['input']}
            type='password'
            name='password'
            id='password'
            placeholder='Password'
          ></Field>
          <div className={styles['form-buttons']}>
            <button className={styles['form-button']}>Sign In</button>
            <button
              className={`${styles['form-button']} ${styles['form-button--secondary']}`}
            >
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthenticationForm;
