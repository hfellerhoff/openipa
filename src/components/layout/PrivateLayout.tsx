import type { ReactNode } from "react";

import Layout from "./Layout";
import styles from "./PrivateLayout.module.scss";
import { useAuth } from "../../state/AuthProvider";
import AuthenticationForm from "../input/AuthenticationForm";

interface Props {
  children: ReactNode;
}

const PrivateLayout = ({ children }: Props) => {
  const { session } = useAuth();

  if (!session)
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
