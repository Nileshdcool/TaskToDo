import { AppProps } from 'next/app';
import { wrapper } from '../store';
import Layout from '../components/shared/Layout';
import '../styles/globals.css';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...props.pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;