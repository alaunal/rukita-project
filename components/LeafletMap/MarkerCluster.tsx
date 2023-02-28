// @ts-expect-error Missing type definitions
import BaseMarkerCluster from "@changey/react-leaflet-markercluster";
import { divIcon, point } from "leaflet";

export type IMarkerClusterProps = {
  children: any;
};

const createClusterCustomIcon = (cluster: any) => {
  return divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className:
      "bg-red-400 bg-opacity-100 text-white font-bold !flex items-center justify-center rounded-3xl border-white border-4 border-opacity-50",
    iconSize: point(40, 40, true),
  });
};

const MarkerCluster: React.FC<IMarkerClusterProps> = ({ children }) => {
  return (
    <BaseMarkerCluster
      iconCreateFunction={createClusterCustomIcon}
      showCoverageOnHover={false}
    >
      {children}
    </BaseMarkerCluster>
  );
};

export default MarkerCluster;
