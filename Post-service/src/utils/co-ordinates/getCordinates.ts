import axios from "axios";

export const getGeocode = async (address: string) => {
    const accessToken = process.env.MAP_BOX_ACCESS_KEY;

    // Append "India" to the address to clarify the location
    const clarifiedAddress = `${address} India`;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(clarifiedAddress)}.json?access_token=${accessToken}`;

    try {
        const response = await axios.get(url);
        // console.log('response');
        // console.log(response.data.features);

        const location = response.data.features[0].center;
        console.log(' location in geocode');
        console.log(location);

        console.log(`Latitude: ${location[1]}, Longitude: ${location[0]}`);
        return location;
    } catch (error) {
        console.error("Error fetching geocode:", error);
    }
};
