import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, LinkList } from '~/components/';

const Links: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <LinkList />
      </Layout>
    </div>
  );
};

export default Links;
