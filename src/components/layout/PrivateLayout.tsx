import React, { useContext } from 'react';
import { UserContext } from '../../state/context/UserContextProvider';
import AuthenticationForm from '../input/AuthenticationForm';
import Layout from './Layout';
import styles from './PrivateLayout.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const PrivateLayout = ({ children }: Props) => {
  const user = useContext(UserContext);

  if (!user.session)
    return (
      <Layout>
        <div className={styles.container}>
          <AuthenticationForm />
        </div>
      </Layout>
    );

  return <Layout>{children}</Layout>;
};

export default PrivateLayout;
