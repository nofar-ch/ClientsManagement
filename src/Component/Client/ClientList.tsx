import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { ClientForm } from './ClientForm';
import { Dialog } from 'primereact/dialog';
import { FooterContent } from '../Common/Form/FooterContent';

export const ClientList = () => {
  const [values, setValues] = useState<ClientDto[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const toastRef = useRef<Toast>(null);

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
      .then((data: BaseResponseDto<ClientDto>) => {
        if (data.isSuccess) {
          setValues(data?.data ?? []);
        }
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  };

  const addClient = (client: ClientDto) => {
    fetch('http://localhost:5071/api/Client/AddClient', {
      method: 'POST',
      body: JSON.stringify(client),
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
      .then((data: BaseResponseDto<ClientDto>) => {
        if (data.isSuccess) {
          toastRef?.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Client added',
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  };

  const deleteClient = (client: ClientDto) => {
    fetch('http://localhost:5071/api/Client/deleteClient', {
      method: 'DELETE',
      body: client.id,
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
      .then((data: BaseResponseDto<ClientDto>) => {
        if (data.isSuccess) {
          toastRef?.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Client added',
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  };

  const showForm = () => {
    setVisible(true);
  };

  return (
    <>
      <Toast ref={toastRef} />

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
            header={(options) => (
              <Button
                onClick={() => showForm()}
                icon='pi pi-plus'
                className={'p-button-text'}
              />
            )}
            style={{ width: '25%' }}
            body={(client) => {
              return (
                <div className='flex'>
                  <Button
                    onClick={() => deleteClient(client)}
                    icon='pi pi-times'
                    className='p-button-text'
                  />
                </div>
              );
            }}
          ></Column>
        </DataTable>

        <Dialog
          header='Add a new client'
          visible={visible}
          style={{ width: '35vw' }}
          onHide={() => setVisible(false)}
        >
          <ClientForm
            onSubmitFun={addClient}
            hideDialog={() => setVisible(false)}
          />
        </Dialog>
      </div>
    </>
  );
};
