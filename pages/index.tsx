import Head from "next/head";
import DashboardView from "../components/dashboard/DashboardView";

const Index = () => {
  return (
    <div>
      <Head>
        <title>Astro Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardView />
    </div>
  );
};

export async function getStaticProps() {
  /*const store = initializeStore();
  store.dispatch(serverRenderClock());*/

  return {
    props: {},
  };
}

export default Index;
