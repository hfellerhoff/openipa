import Link from 'next/link';
import React from 'react';
import AuthenticationForm from '../../src/components/input/AuthenticationForm';
import Layout from '../../src/components/layout/Layout';
import styles from './Editor.module.scss';

interface Props {}

const LanguageEditor = (props: Props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <AuthenticationForm />
      </div>
    </Layout>
  );
};

export default LanguageEditor;
