import { Fragment, useCallback, useEffect, useState } from 'react';
import { GeoLocationDto } from '../../Model/GeoLocation/GeoLocationDto.model';
import { Skeleton } from 'primereact/skeleton';
import { getGeoLocation } from './Api';

export const GeoLocation = ({ ipAddress }: { ipAddress: string }) => {
  const [geoLocation, setGeoLocation] = useState<GeoLocationDto>();

  const fetch = useCallback(async () => {
    if (ipAddress) {
      const response = await getGeoLocation(ipAddress);
      setGeoLocation(response);
    }
  }, [ipAddress]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className='flex flex-column'>
      {!geoLocation ? (
        Array.from({ length: 4 }, (_, index) => (
          <Fragment key={index}>
            <Skeleton width='10rem' height='1rem' className='mb-2'></Skeleton>
          </Fragment>
        ))
      ) : (
        <>
          <span>RegionName: {geoLocation?.regionName}</span>
          <span>Country: {geoLocation?.country}</span>
          <span>City: {geoLocation?.city}</span>
          <span>Zip: {geoLocation?.zip}</span>
        </>
      )}
    </div>
  );
};
