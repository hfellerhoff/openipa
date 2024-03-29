import { Field, Form, Formik } from 'formik';

import styles from './AuthenticationForm.module.scss';
import supabase from '../../lib/supabase';
import supabaseSignIn from '../../lib/supabase/supabaseSignIn';

const AuthenticationForm = () => {
  return (
    <div className={styles['content-container']}>
      <h1 className={styles['page-title']}>Transcription Editor</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          supabaseSignIn(supabase, values.email, values.password);
          // supabaseSignUp(supabase, values.email, values.password);
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
            <button className='button button--primary button--rounded'>
              Sign In
            </button>
            {/* <button className='button button--primary button--rounded'>
              Sign Up
            </button> */}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthenticationForm;
