import { DataTable } from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';
import { Button } from 'primereact/button';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { GeoLocation } from './GeoLocation';
import { LazyParamsType } from '../../Types/Common/LazyParamsType';

export const ClientList = () => {
  const [values, setValues] = useState<ClientDto[]>([]);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const [dialogProps, setDialogProps] = useState<Partial<DialogProps>>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<LazyParamsType['filters']>({});
  const toastRef = useRef<Toast>(null);

  const baseUrl = 'http://localhost:5071/api/Client';

  const initialLazyParams = {
    page: configData.PAGE,
    size: configData.SIZE,
    filters: {},
  };

  const [lazyParams, setLazyParams] =
    useState<LazyParamsType>(initialLazyParams);

  const getDefaultColumnProps = (field: any) => {
    const columnProps: ColumnProps = {
      field: field,
      header: field.charAt(0).toUpperCase() + field.slice(1),
      style: { width: '23%' },
      showFilterMenu: false,
      filter: true,
      showClearButton: false,
    };
    return columnProps;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLazyParams((prev) => ({ ...prev, filters: filters }));
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [filters]);

  const filtersToQueryString = useCallback(() => {
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
  }, [lazyParams.filters]);

  const fetchClientData = useCallback(async () => {
    try {
      setIsLoading(true);
      const _filters = filtersToQueryString();
      const response = await fetch(
        `${baseUrl}?page=${lazyParams.page}&size=${lazyParams.size}&${_filters}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: BaseResponseDto<ClientDto> = await response.json();

      if (data.isSuccess) {
        setValues(data?.data ?? []);
        setTotalCount(data?.totalCount);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filtersToQueryString, lazyParams.page, lazyParams.size]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData, lazyParams]);

  const addClient: SubmitHandler<ClientFormView> = async (client) => {
    const newClient = new CreateClient(client);
    try {
      const response = await fetch(`${baseUrl}/AddClient`, {
        method: 'POST',
        body: JSON.stringify(newClient),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Save failed');
      }

      const data: BaseResponseDto<ClientDto> = await response.json();

      if (data.isSuccess) {
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Client added',
        });
        setDialogContent(null);
        setLazyParams(initialLazyParams);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Failed',
        detail: 'Save failed',
      });
    }
  };

  const deleteClient = async (clientId: string) => {
    if (!clientId) {
      console.error('client id not found');
      return;
    }

    const clientDelete = new DeleteClient(clientId);

    try {
      const response = await fetch(`${baseUrl}/deleteClient`, {
        method: 'DELETE',
        body: JSON.stringify(clientDelete),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Delete client failed');
      }

      const data: BaseResponseDto<ClientDto> = await response.json();

      if (data.isSuccess) {
        toastRef?.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Client deleted',
        });
        setDialogContent(null);
        setLazyParams(initialLazyParams);
      } else {
        throw new Error('Delete client failed');
      }
    } catch (error) {
      toastRef?.current?.show({
        severity: 'error',
        summary: 'Failed',
        detail: 'Delete client failed',
      });
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
          lazy
          value={values}
          dataKey='id'
          paginator
          responsiveLayout='stack'
          loading={isLoading}
          filterDisplay='row'
          first={lazyParams.page}
          rows={lazyParams.size}
          totalRecords={totalCount}
          onPage={(event) => {
            setLazyParams((prev) => ({
              ...prev,
              page: event.page ?? prev.page,
            }));
          }}
          onFilter={(event) => setFilters(event.filters)}
        >
          <Column {...getDefaultColumnProps('id')}></Column>
          <Column {...getDefaultColumnProps('fullName')}></Column>
          <Column {...getDefaultColumnProps('phoneNumber')}></Column>
          <Column
            {...getDefaultColumnProps('ipAddress')}
            body={(client: ClientDto) => {
              return (
                <div className='flex justify-content-between'>
                  {client.ipAddress}
                  <Button
                    style={{ width: '1.6rem', height: '1.5rem' }}
                    className='p-button-text border-circle border-primary-400 mx-1'
                    icon='pi pi-info'
                    onClick={() => {
                      setDialogProps({
                        header: (
                          <span className='text-xl font-semibold pb-1'>
                            {client.ipAddress}
                          </span>
                        ),
                      });
                      setDialogContent(
                        <GeoLocation ipAddress={client.ipAddress} />
                      );
                    }}
                  />
                </div>
              );
            }}
          ></Column>
          <Column
            field='actions'
            showFilterMenu={false}
            header={() => (
              <Button
                onClick={() => showAddClientForm()}
                icon='pi pi-plus'
                className={'p-button-text'}
              />
            )}
            style={{ width: '8%' }}
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
          visible={!!dialogContent}
          style={{ width: '30rem' }}
          onHide={() => setDialogContent(null)}
          dismissableMask
          {...dialogProps}
        >
          {dialogContent}
        </Dialog>
      </div>
    </>
  );
};
