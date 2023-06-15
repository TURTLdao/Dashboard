import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

export default function Page({  }) {
  return (
    <>
    </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

