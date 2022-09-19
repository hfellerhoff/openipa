import Head from 'next/head';

import Layout from '../../src/components/layout/Layout';

interface Props {}

const index = (props: Props) => {
  return (
    <Layout>
      <Head>
        <title>IPA Editor - Open IPA</title>
      </Head>
    </Layout>
  );
};

export default index;
