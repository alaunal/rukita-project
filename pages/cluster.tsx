import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

import Layout from "@/components/Layout";
import Searchbox from "@/components/Searchbox";

import { getHotel, getHotelDetail } from "@/services/index";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

const SliderLocation = dynamic(() => import("@/components/SliderLocation"), {
  ssr: false,
});

const DetailHotel = dynamic(() => import("@/components/DetailHotel"), {
  ssr: false,
});

const defaultLocation = {
  lat: -8.6725072,
  lng: 115.1542333,
};

const defaultPlaces = "Denpasar, Denpasar City, Bali";

const Cluster = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  const [isModalDetail, setIsModalDetail] = useState<boolean>(false);

  const [dataHotels, setDataHotels] = useState<any[]>([]);

  const [currentLocation, setCurrentLocation] = useState<any>(defaultLocation);

  const [centerLocation, setCenterLocation] = useState<[number, number]>([
    defaultLocation.lat,
    defaultLocation.lng,
  ]);

  const [hotelSelect, setHotelSelect] = useState<any>({});

  const [hotelView, setHotelView] = useState<any>({});

  const [currentPlace, setCurrentPlace] = useState<string>(defaultPlaces);

  const [zoom, setZoom] = useState<number>(12);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getDetailHotel = async (id: number) => {
    setIsLoadingDetail(true);
    setIsModalDetail(true);

    const currentDate = new Date();
    const checkInDate = dayjs(currentDate).add(5, "d");
    const checkOutDate = dayjs(currentDate).add(7, "d");

    try {
      const options = {
        hotel_id: id,
        plugins: "true",
        important_info: "true",
        photos: "1",
        check_in: checkInDate.format("YYYY-MM-DD"),
        reviews: "1",
        promo: "true",
        guest_score_breakdown: "true",
        nearby: "true",
        id_lookup: "true",
        sid: "iSiX639",
        videos: "true",
        check_out: checkOutDate.format("YYYY-MM-DD"),
        recent: "true",
      };

      const response = await getHotelDetail(options);

      const { data, status } = response;

      const result = data?.getHotelHotelDetails?.results;

      if (status === 200) {
        setHotelView(result?.hotel_data?.hotel_0);
      }

      setIsLoadingDetail(false);
    } catch (error) {
      console.log(error);
      setIsLoadingDetail(false);
    }
  };

  const fetchHotels = async () => {
    setIsLoading(true);

    const currentDate = new Date();
    const checkInDate = dayjs(currentDate).add(5, "d");
    const checkOutDate = dayjs(currentDate).add(7, "d");

    try {
      const options = {
        check_in: checkInDate.format("YYYY-MM-DD"),
        check_out: checkOutDate.format("YYYY-MM-DD"),
        country_code: "ID",
        limit_to_country: "true",
        multiple_deals: "true",
        limit: "100",
        longitude: currentLocation.lng,
        language: "en-US",
        sid: "iSiX639",
        output_version: "3",
        rate_identifier: "true",
        latitude: currentLocation.lat,
      };

      const response = await getHotel(options);

      const { data, status } = response;

      if (status === 200) {
        let tmp = [];
        const result = data["getHotelExpress.Results"].results;
        const hotelData = result.hotel_data;
        const total = result.results_data.rate_count;

        for (let i = 0; i < total; i++) {
          tmp.push(hotelData[`hotel_${i}`]);
        }

        setDataHotels(tmp);
      }

      setIsLoading(false);
      setZoom(14);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const handlerSelectHotel = (data: any, idx: number) => {
    setCenterLocation([data.geo.latitude, data.geo.longitude]);

    setHotelSelect(data);
    setCurrentIndex(idx);
    setZoom(17);
  };

  const handlerSetLocation = (data: any) => {
    if (data?.display_name !== currentPlace) {
      setCurrentPlace(data?.display_name);
      setCurrentLocation({
        lat: data?.lat as number,
        lng: data?.lon as number,
      });
      setCenterLocation([data?.lat as number, data?.lon as number]);
      setZoom(12);
      setHotelSelect({});
    }
  };

  const handleCloseModal = () => {
    setIsModalDetail(false);
    setHotelView({});
  }

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (currentPlace.length > 0) {
      fetchHotels();
    }
  }, [currentPlace]);

  return (
    <Layout>
      <LeafletMap
        locations={dataHotels}
        center={centerLocation}
        zoom={zoom}
        onSelectHotel={handlerSelectHotel}
        selectLocation={hotelSelect}
      />

      <Searchbox
        handlerSetLocation={handlerSetLocation}
        isDisabled={isLoading}
      />

      <SliderLocation
        isLoading={isLoading}
        data={dataHotels}
        onSelectHotel={handlerSelectHotel}
        selectHotel={hotelSelect}
        currentIndex={currentIndex}
        handleGetDetailHotel={getDetailHotel}
      />

      <DetailHotel
        data={hotelView}
        isLoading={isLoadingDetail}
        modalShow={isModalDetail}
        closeModal={handleCloseModal}
      />
    </Layout>
  );
};

export default Cluster;
