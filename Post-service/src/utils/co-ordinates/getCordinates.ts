import axios from "axios";

export const getGeocode = async (address: string) => {
    // const accessToken = 'pk.eyJ1IjoibmFuZHV0cyIsImEiOiJjbHUxNm1jdnEwZ25wMmprMWd3b2hpaHYwIn0.5K385dWQ6JDXt67DAgYWUQ';
    const accessToken = process.env.MAP_BOX_ACCESS_KEY;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${accessToken}`;

    try {
      const response = await axios.get(url);
      const location = response.data.features[0].center;
      console.log(`Latitude: ${location[1]}, Longitude: ${location[0]}`);
      return location
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

