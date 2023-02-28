import { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

import contants from "@/helpers/utils";

export type IGoogleMapsProps = {
  locations: any[];
  center: any;
};

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const GoogleMaps: React.FC<IGoogleMapsProps> = ({ locations, center }) => {
  const apiKey: string = contants.google_api_key as string;
  const [activeMarker, setActiveMarker] = useState<any>(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();

    locations.map((location) =>
      bounds.extend({
        lat: location.geo.latitude as number,
        lng: location.geo.longitude as number,
      })
    );

    map.fitBounds(bounds);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={handleOnLoad}
      >
        {locations.map((location, index) => (
          <Marker
            position={{
              lat: location.geo.latitude as number,
              lng: location.geo.longitude as number,
            }}
            key={index}
            onClick={() => handleActiveMarker(location.id)}
          >
            {activeMarker === location.id && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{location.name}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
