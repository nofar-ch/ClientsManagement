export const getGeoLocation = async (ipAddress: string) => {
  if (ipAddress) {
    try {
      const res = await fetch(
        `http://ip-api.com/json/${ipAddress}?fields=status,country,region,regionName,city,zip`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.json();
    } catch (error) {
      console.error('Failed get geo location');
    }
  } else {
    console.error('ipAddress not found');
  }
};
