import { ClientList } from './ClientList';
import React from 'react';

export const ClientPage = () => {
  return (
    <div className='wrapper flex flex-column m-auto'>
      <h1>Client list</h1>
      <ClientList />
    </div>
  );
};
