import { useRef, useEffect } from "react";
import { map, isEmpty } from "lodash";
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { HiStar, HiMap, HiEye } from "react-icons/hi";

import "swiper/css";

export type ISliderProps = {
  isLoading: boolean;
  data?: any[];
  onSelectHotel: any;
  selectHotel?: any;
  currentIndex?: number;
  handleGetDetailHotel: any;
};

const SliderLocation: React.FC<ISliderProps> = ({
  isLoading,
  data = [],
  onSelectHotel,
  selectHotel = {},
  currentIndex,
  handleGetDetailHotel,
}) => {
  const swiperRef = useRef<any>(null);

  const priceFromat = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (data.length > 0) {
      setTimeout(() => {
        swiperRef.current.swiper.slideTo(currentIndex);
      }, 150);
    }
  }, [currentIndex, data]);

  return (
    <section className="fixed backdrop-blur-sm bg-white/50 py-6 w-full bottom-0 left-0 z-10">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 animate-pulse">
          <div className="w-full h-48 bg-slate-100 rounded-xl flex"></div>
          <div className="w-full h-48 bg-slate-100 rounded-xl flex"></div>
          <div className="w-full h-48 bg-slate-100 rounded-xl hidden lg:flex"></div>
          <div className="w-full h-48 bg-slate-100 rounded-xl hidden lg:flex"></div>
        </div>
      ) : !isEmpty(data) ? (
        <div className="card-slider">
          <Swiper
            slidesPerView={3}
            spaceBetween={16}
            className="mySwiper"
            virtual
            modules={[Virtual]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              920: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              1560: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            ref={swiperRef}
          >
            {map(data, (item: any, idx: number) => (
              <SwiperSlide
                key={item.id}
                virtualIndex={idx}
                data-hash={`slide-${idx}`}
              >
                <div
                  className={`flex flex-col w-full h-full bg-white rounded-xl px-4 py-4 shadow ${
                    item.id === selectHotel?.id
                      ? "border border-red-500"
                      : "border border-gray-50"
                  }`}
                >
                  <div className="flex mb-5 justify-between">
                    <div className="flex-1 pr-5 overflow-hidden">
                      <h4 className="font-semibold font-body text-lg text-gray-700 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 font-body text-sm mb-1">
                        {item.star_rating}{" "}
                        <HiStar className="text-yellow-500 font-base inline-block" />{" "}
                        - {item.review_rating_desc}
                      </p>
                      <p className="truncate text-sm text-gray-500 font-body mb-1">
                        {item.hotel_description}
                      </p>
                      <p className="text-sm font-semibold font-body text-gray-600">
                        {map(item.amenity_data, (ad: any, id: any) =>
                          id === "amenity_0" ? `${ad.name}` : `, ${ad.name}`
                        )}
                      </p>
                    </div>
                    <div className="relative">
                      <div className="aspect-square h-20 w-full relative rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={`https:${item.thumbnail}`}
                          alt={item.name}
                          loading="lazy"
                          className="object-cover absolute left-0 top-0 w-full h-full"
                        />
                      </div>
                      <div className="absolute top-11 bg-white flex rounded -left-2 z-10 justify-center items-center px-2 py-1 font-semibold text-sm font-body shadow border border-gray-200">
                        {priceFromat.format(
                          item.room_data?.room_0?.rate_data?.rate_0
                            ?.price_details?.display_price
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex">
                    <button
                      className="flex items-center justify-center bg-red-500 hover:bg-red-600  text-white h-8 px-3 rounded-full font-body font-sm font-medium"
                      onClick={() => onSelectHotel(item, idx)}
                    >
                      <HiMap className="mr-2" /> See Loacation
                    </button>
                    <button
                      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white h-8 px-3 rounded-full font-body font-sm font-medium mx-2"
                      onClick={() => handleGetDetailHotel(item.id)}
                    >
                      <HiEye className="mr-2" /> Detail
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex w-full justify-center text-lg text-gray-700 font-body font-semibold">
          Hotel not available!
        </div>
      )}
    </section>
  );
};

export default SliderLocation;
