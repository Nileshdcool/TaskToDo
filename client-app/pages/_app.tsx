import { AppProps } from 'next/app';
import { wrapper } from '../store';
import Layout from '../components/shared/Layout';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...props.pageProps} />
                <ToastContainer />
            </Layout>
        </Provider>
    );
}

export default MyApp;