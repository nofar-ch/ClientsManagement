import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { ClientForm } from './ClientForm';
import { Dialog, DialogProps } from 'primereact/dialog';
import { ClientFormView } from '../../Model/Client/ClientFormView.model';
import { SubmitHandler } from 'react-hook-form';
import { CreateClient } from '../../Model/Client/CreateClient.model';
import configData from '../Common/Config/config.json';
import { DeleteClient } from '../../Model/Client/DeleteClient.model';
import { ConfirmForm } from '../Common/Form/ConfirmForm';

type lazyParamsType = {
  page: number;
  size: number;
  sortBy: string;
};

export const ClientList = () => {
  const [values, setValues] = useState<ClientDto[]>([]);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const [dialogProps, setDialogProps] = useState<Partial<DialogProps>>();

  const initialLazyParams = {
    page: configData.PAGE,
    size: configData.SIZE,
    sortBy: configData.SORT_BY,
  };

  const [lazyParams, setLazyParams] =
    useState<lazyParamsType>(initialLazyParams);

  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    fetchClientData(lazyParams);
  }, []);

  const fetchClientData = (lazyParams: lazyParamsType) => {
    fetch(
      `http://localhost:5071/api/Client?
      page=${lazyParams.page}
      &size=${lazyParams.size}
      &sortby=${lazyParams.sortBy}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
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

  const addClient: SubmitHandler<ClientFormView> = async (client) => {
    const newClient = new CreateClient(client);
    fetch('http://localhost:5071/api/Client/AddClient', {
      method: 'POST',
      body: JSON.stringify(newClient),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          toastRef?.current?.show({
            severity: 'error',
            summary: 'Failed',
            detail: 'Save failed',
          });
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
          setDialogContent(null);
          fetchClientData(initialLazyParams);
        }
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  };

  const deleteClient = (clientId: string) => {
    if (clientId) {
      const clientDelete = new DeleteClient(clientId);
      fetch('http://localhost:5071/api/Client/deleteClient', {
        method: 'DELETE',
        body: JSON.stringify(clientDelete),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            toastRef?.current?.show({
              severity: 'error',
              summary: 'Failed',
              detail: 'Delete client failed',
            });
          }
          return response.json();
        })
        .then((data: BaseResponseDto<ClientDto>) => {
          if (data.isSuccess) {
            toastRef?.current?.show({
              severity: 'success',
              summary: 'Success',
              detail: 'Client deleted',
            });
            setDialogContent(null);
            fetchClientData(initialLazyParams);
          }
        })
        .catch((error) => {
          toastRef?.current?.show({
            severity: 'error',
            summary: 'Failed',
            detail: 'Delete client failed',
          });
        });
    } else {
      console.error('can not find client id');
    }
  };

  const showAddClientForm = () => {
    setDialogProps({ header: 'Add a new client' });
    setDialogContent(
      <ClientForm
        onSubmitFun={addClient}
        hideDialog={() => setDialogContent(null)}
      />
    );
  };

  const showDeleteClientForm = (clientId: string) => {
    setDialogProps({ header: 'Delete client' });
    setDialogContent(
      <ConfirmForm
        clientId={clientId}
        onSubmitFun={deleteClient}
        cancelFun={() => setDialogContent(null)}
      />
    );
  };

  return (
    <>
      <Toast ref={toastRef} />

      <div className='card'>
        <DataTable
          value={values}
          paginator
          onPage={(event) =>
            setLazyParams({
              ...lazyParams,
              page: event.page ?? lazyParams.page,
            })
          }
          rows={lazyParams.size}
          tableStyle={{ minWidth: '40rem' }}
        >
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
                onClick={() => showAddClientForm()}
                icon='pi pi-plus'
                className={'p-button-text'}
              />
            )}
            style={{ width: '25%' }}
            body={(client: ClientDto) => {
              return (
                <div className='flex'>
                  <Button
                    onClick={() => showDeleteClientForm(client.id)}
                    icon='pi pi-times text-red-500'
                    className='p-button-text'
                  />
                </div>
              );
            }}
          ></Column>
        </DataTable>

        <Dialog
          {...dialogProps}
          visible={!!dialogContent}
          style={{ width: '35vw' }}
          onHide={() => setDialogContent(null)}
        >
          {dialogContent}
        </Dialog>
      </div>
    </>
  );
};
