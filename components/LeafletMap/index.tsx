import React, { useEffect } from "react";
import type { MapOptions } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet";

import MarkerCluster from "./MarkerCluster";

import { FaBed } from "react-icons/fa";

export type ILeafletMapProps = {
  locations?: any[];
  center: [number, number];
  isCluster?: boolean;
  onSelectHotel: any;
  zoom?: number;
  selectLocation?: any;
  isPopup?: boolean;
};

const priceFromat = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "USD",
});

const MapWrapper: React.FC<ILeafletMapProps> = ({
  locations = [],
  center,
  isCluster = false,
  isPopup = false,
  zoom = 14,
  selectLocation = {},
  onSelectHotel,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);

  const iconMarkup = (price: any, id: any) => {
    return renderToStaticMarkup(
      <span
        className={`relative badget flex ${
          id === selectLocation?.id ? "active" : ""
        }`}
      >
        <div
          className={`text-base rounded-full  shadow px-2 py-1 font-semibold border relative flex items-center ${
            id === selectLocation?.id
              ? "bg-red-600 text-white border-red-600"
              : "bg-white border-gray-100 text-gray-700"
          }`}
        >
          <div
            className={`inline-flex h-5 w-5 mr-2 rounded-full items-center justify-center ${
              id === selectLocation?.id
                ? "text-red-600 bg-white"
                : "bg-red-600 text-white"
            }`}
          >
            <FaBed />
          </div>
          {priceFromat.format(price)}
        </div>
        <div className="tip">
          <span className="tip-box" />
        </div>
      </span>
    );
  };

  const customMarkerIcon = (price: any, id: any) => {
    return divIcon({
      html: iconMarkup(price, id),
    });
  };

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.length > 0 && isCluster ? (
        <MarkerCluster>
          {locations.map((location, index) => (
            <Marker
              position={[location.geo.latitude, location.geo.longitude]}
              key={index}
              zIndexOffset={location.id === selectLocation.id ? 500 : 400}
              icon={customMarkerIcon(
                location.room_data?.room_0?.rate_data?.rate_0?.price_details
                  ?.display_price,
                location.id
              )}
              eventHandlers={{
                click: () => onSelectHotel(location, index),
              }}
            >
              {isPopup && <Popup>{location.name}</Popup>}
            </Marker>
          ))}
        </MarkerCluster>
      ) : (
        <>
          {locations.map((location, index) => (
            <Marker
              position={[location.geo.latitude, location.geo.longitude]}
              key={index}
              zIndexOffset={location.id === selectLocation.id ? 500 : 400}
              icon={customMarkerIcon(
                location.room_data?.room_0?.rate_data?.rate_0?.price_details
                  ?.display_price,
                location.id
              )}
              eventHandlers={{
                click: () => onSelectHotel(location, index),
              }}
            >
              {isPopup && <Popup>{location.name}</Popup>}
            </Marker>
          ))}
        </>
      )}
    </>
  );
};

const LeafletMap: React.FC<ILeafletMapProps & MapOptions> = (props) => {
  return (
    <MapContainer
      center={props.center}
      zoom={props.zoom}
      maxZoom={20}
      zoomControl={false}
      className="h-full w-full relative z-10"
    >
      <MapWrapper {...props} />
    </MapContainer>
  );
};

export default LeafletMap;
