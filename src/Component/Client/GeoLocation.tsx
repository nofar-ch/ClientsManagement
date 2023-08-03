import { useEffect, useState } from 'react';
import { getGeoLocation } from '../../API/Api';
import { GeoLocationDto } from '../../Model/GeoLocation/GeoLocationDto.model';

export const GeoLocation = ({ ipAddress }: { ipAddress: string }) => {
  const [geoLocation, setGeoLocation] = useState<GeoLocationDto>();

  useEffect(() => {
    fetchGeoLocation();
  }, []);

  const fetchGeoLocation = async () => {
    const response = await getGeoLocation(ipAddress);
    setGeoLocation(response);
  };

  return (
    <div className='flex flex-column'>
      <span>Region: {geoLocation?.region}</span>
      <span>RegionName: {geoLocation?.regionName}</span>
      <span>Country: {geoLocation?.country}</span>
      <span>City: {geoLocation?.city}</span>
      <span>Zip: {geoLocation?.zip}</span>
    </div>
  );
};
