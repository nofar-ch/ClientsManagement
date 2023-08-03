import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

export const ClientList = () => {
  const [values, setValues] = useState<ClientDto[]>([]);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = () => {
    fetch('http://localhost:5071/api/Client?page=0&size=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setValues(data);
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  };

  return (
    <>
      <div className='card'>
        <DataTable
          value={values}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field='name' header='Name' style={{ width: '25%' }}></Column>
          <Column field='id' header='Id' style={{ width: '25%' }}></Column>
          <Column
            field='fullName'
            header='FullName'
            style={{ width: '25%' }}
          ></Column>
          <Column
            field='phoneNumber'
            header='PhoneNumber'
            style={{ width: '25%' }}
          ></Column>
          <Column
            field='ipAddress'
            header='IpAddress'
            style={{ width: '25%' }}
          ></Column>
          <Column
            field='actions'
            style={{ width: '25%' }}
            body={() => {
              return (
                <>
                  <Button onClick={() => {}} className={'pi pi-pencil'} />
                  <Button onClick={() => {}} className='pi pi-times' />
                </>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};
