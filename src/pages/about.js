// create a page to write about the TurtleDAO platform
// link whitepaper
// acknowledge powered by: TapTools, JPG.store and include logos + links
// include donate
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
