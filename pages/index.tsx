import React from 'react';
import Hero from '../src/components/landing-page/Hero';
import Description from '../src/components/landing-page/Description';
import Demonstration from '../src/components/landing-page/Demonstration';
import Layout from '../src/components/layout/Layout';

interface Props {}

const LandingPage: React.FC<Props> = () => {
  return (
    <Layout>
      <Hero />
      <Description />
      <Demonstration />
    </Layout>
  );
};

export default LandingPage;
