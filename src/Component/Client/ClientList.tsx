import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
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
import { ClientDto } from '../../Model/Client/ClientDto.model';
import { BaseResponseDto } from '../../Model/Response/BaseResponseDto.model';
import { OverlayPanel } from 'primereact/overlaypanel';
import { GeoLocation } from './GeoLocation';

type lazyParamsType = {
  page: number;
  size: number;
  filters:
    | {
        id: { value: string | null; matchMode: string };
        fullName: { value: string | null; matchMode: string };
        phoneNumber: { value: string | null; matchMode: string };
        ipAddress: { value: string | null; matchMode: string };
      }
    | {};
};

export const ClientList = () => {
  const [values, setValues] = useState<ClientDto[]>([]);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const [dialogProps, setDialogProps] = useState<Partial<DialogProps>>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<lazyParamsType['filters']>({});

  const initialLazyParams = {
    page: configData.PAGE,
    size: configData.SIZE,
    filters: {},
  };

  const [lazyParams, setLazyParams] =
    useState<lazyParamsType>(initialLazyParams);

  const toastRef = useRef<Toast>(null);
  const op = useRef<OverlayPanel>(null);

  useEffect(() => {
    fetchClientData(lazyParams);
  }, [lazyParams]);

  const fetchClientData = (lazyParams: lazyParamsType) => {
    setIsLoading(true);
    const _filters = objectToQueryString();
    debugger;
    fetch(
      `http://localhost:5071/api/Client?page=${lazyParams.page}&size=${lazyParams.size}&${_filters}`,
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
          setTotalCount(data?.totalCount);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
        setIsLoading(false);
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
          setLazyParams(initialLazyParams);
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
            setLazyParams(initialLazyParams);
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
      console.error('client id not found');
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLazyParams({ ...lazyParams, filters: filters });
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [filters]);

  const objectToQueryString = () => {
    const queryString = Object.keys(lazyParams.filters)
      .filter((key) => lazyParams.filters[key].value !== null)
      .map(
        (key) =>
          `filter${encodeURIComponent(key)}=${encodeURIComponent(
            lazyParams.filters[key].value
          )}`
      )
      .join('&');

    return queryString;
  };

  return (
    <>
      <Toast ref={toastRef} />

      <div className='card'>
        <DataTable
          lazy
          value={values}
          dataKey='id'
          paginator
          loading={isLoading}
          filterDisplay='row'
          first={lazyParams.page}
          rows={lazyParams.size}
          totalRecords={totalCount}
          onPage={(event) => {
            setLazyParams({
              ...lazyParams,
              page: event.page ?? lazyParams.page,
            });
          }}
          onFilter={(event) => setFilters(event.filters)}
          tableStyle={{ minWidth: '40rem' }}
        >
          <Column
            field='id'
            header='Id'
            style={{ width: '25%' }}
            showFilterMenu={false}
            filter
          ></Column>
          <Column
            field='fullName'
            header='FullName'
            showFilterMenu={false}
            style={{ width: '25%' }}
            filter
          ></Column>
          <Column
            field='phoneNumber'
            header='PhoneNumber'
            showFilterMenu={false}
            style={{ width: '25%' }}
            filter
          ></Column>
          <Column
            field='ipAddress'
            header='IpAddress'
            showFilterMenu={false}
            style={{ width: '25%' }}
            filter
            body={(client: ClientDto) => (
              <>
                {client.ipAddress}
                <GeoLocation ipAddress={client.ipAddress} />
              </>
            )}
          ></Column>
          <Column
            field='actions'
            showFilterMenu={false}
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
