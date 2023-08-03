import { ClientPage } from 'Component/Client/ClientPage';
import { PrimeReactProvider } from 'primereact/context';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import React from 'react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <PrimeReactProvider>
        <ClientPage />
      </PrimeReactProvider>
    </>
  );
}
