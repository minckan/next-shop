import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;

/**
 * rather than having the Next.js app talk directly to the database,
 * we may want to introduce a middle tier,
 * a backend application that is responsible for talking to the database
 * and exposing the data as a Web API, like a Rest API
 */

/**
 * [Headless CMS]
 * CMS : Content Management System.
 * headless: we can use it without a graphical interface.
 * ===> a headless CMS provides a web API.
 * ===> it also provides an "Admin UI"
 */
