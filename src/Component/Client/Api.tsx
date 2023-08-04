import { GeoLocationDto } from '../../Model/GeoLocation/GeoLocationDto.model';

export const getGeoLocation = async (ipAddress: string) => {
  if (ipAddress) {
    try {
      const res = await fetch(
        `http://ip-api.com/json/${ipAddress}?fields=status,country,regionName,city,zip`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        throw new Error('Delete client failed');
      }
      const data: GeoLocationDto = await res.json();
      return data;
    } catch (error) {
      console.error('Failed get geo location');
    }
  } else {
    console.error('ipAddress not found');
  }
};
