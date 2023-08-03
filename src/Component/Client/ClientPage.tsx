import { ClientList } from './ClientList';
import React from 'react';

export const ClientPage = () => {
  return (
    <div className='flex flex-column w-9 m-auto'>
      <h1>Client list</h1>
      <ClientList />
    </div>
  );
};
