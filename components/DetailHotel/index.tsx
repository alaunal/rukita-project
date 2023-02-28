import React from "react";
import {
  HiX,
  HiLocationMarker,
  HiStar,
  HiOutlineShieldCheck,
} from "react-icons/hi";

import { Swiper, SwiperSlide } from "swiper/react";

import { isEmpty, map } from "lodash";

import "swiper/css";

export type IDetailHotelProps = {
  modalShow: boolean;
  isLoading: boolean;
  closeModal: any;
  data?: any;
};

const DetailHotel: React.FC<IDetailHotelProps> = ({
  modalShow = false,
  isLoading = false,
  data = {},
  closeModal,
}) => {
  return (
    <div className={`relative ${modalShow ? "z-20" : "z-0"}`}>
      <div
        className={`fixed inset-0 bg-gray-800 transition-opacity ${
          modalShow ? "bg-opacity-80 ease-in duration-300" : "bg-opacity-0"
        }`}
      >
        <div className="fixed z-10 inset-0">
          <div className="flex items-center justify-center min-h-screen px-3 pt-6 pb-6 text-center sm:block sm:p-0 rounded">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className={`relative inline-block align-bottom bg-white md:rounded-lg text-left shadow-lg transform transition-all sm:my-8 sm:align-middle w-1/2 ${
                modalShow ? "opacity-100 ease-in duration-100" : "opacity-0"
              }`}
            >
              {!isLoading && (
                <span className="absolute -right-4 -top-4 z-10">
                  <button
                    className="text-white bg-red-400 text-xl h-10 w-10 flex justify-center items-center rounded-full"
                    onClick={() => closeModal()}
                  >
                    <HiX />
                  </button>
                </span>
              )}

              <div className="bg-white px-4 py-6 rounded-lg relative overflow-x-hidden overflow-y-auto max-h-[75vh]">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="mb-6">
                      <div className="h-6 bg-slate-200 w-1/2 rounded mb-1"></div>
                      <div className="h-4 bg-slate-200 w-3/4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="h-20 bg-slate-200 rounded"></div>
                      <div className="h-20 bg-slate-200 rounded"></div>
                      <div className="h-20 bg-slate-200 rounded"></div>
                    </div>

                    <div>
                      <div className="h-6 bg-slate-200 w-1/2 rounded mb-1"></div>
                      <div className="h-4 bg-slate-200 w-full rounded mb-1"></div>
                      <div className="h-4 bg-slate-200 w-full rounded mb-1"></div>
                      <div className="h-4 bg-slate-200 w-3/4 rounded"></div>
                    </div>
                  </div>
                ) : !isEmpty(data) ? (
                  <>
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold font-bold text-gray-700 mb-1">
                        {data.name}
                      </h1>
                      <p className="text-gray-500 flex items-center">
                        <HiLocationMarker className="mr-1 inline-block text-blue-400" />
                        {`${data.address?.city_name} - ${data.address?.address_line_one}, ${data.address?.country_name} ${data.address?.zip}`}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg border border-gray-200 p-3 flex items-center">
                        <div className="flex-none mr-3">
                          <div className="bg-blue-500 text-white text-lg font-body font-medium p-2 rounded">
                            {data.review_rating}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold font-body text-gray-800">
                            {data.review_rating_desc}
                          </p>
                          <p className="text-sm text-gray-500 font-body">
                            {data.review_count} Reviews
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-3">
                        <p className="font-semibold font-body text-gray-800 flex items-center">
                          <HiStar className="text-yellow-500 font-base inline-block mr-1 text-xl" />
                          {data.star_rating}
                        </p>
                        <p className="text-sm text-gray-500 font-body">
                          {data.rating_count} Rated
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-3 flex items-center">
                        <div className="flex-none mr-3">
                          <div className="bg-green-400 text-white text-3xl font-body font-medium p-2 rounded">
                            <HiOutlineShieldCheck />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium font-body text-gray-800 text-sm">
                            Travel Sustainable property
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="border-l-4 border-blue-500 pl-4 mb-4">
                        <h2 className="text-lg font-bold font-bold text-gray-600 mb-1">
                          Gallery
                        </h2>
                      </div>

                      <Swiper slidesPerView={1} className="mySwiper">
                        {map(data.photo_data, (photo: string, idx: number) => (
                          <SwiperSlide
                            key={`photo-${idx}`}
                            data-hash={`slide-${idx}`}
                          >
                            <div className="relative w-full bg-gray-100 rounded-lg w-full aspect-video overflow-hidden">
                              <img
                                src={photo}
                                alt="image"
                                loading="lazy"
                                className="absolute object-cover w-full h-auto top-0 left-0"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div className="mb-6">
                      <div className="border-l-4 border-blue-500 pl-4 mb-4">
                        <h2 className="text-lg font-bold font-bold text-gray-600 mb-1">
                          Description
                        </h2>
                      </div>

                      <div className="text-sm text-gray-500 font-body">
                        {data.hotel_description}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="border-l-4 border-blue-500 pl-4 mb-4">
                        <h2 className="text-lg font-bold font-bold text-gray-600 mb-1">
                          Facilities
                        </h2>
                      </div>

                      {map(data.amenity_data, (ad: any, id: any) => (
                        <span
                          className="h-8 inline-flex justify-center items-center text-gray-500 border rounded-full text-sm font-body mr-2 px-3 mb-2"
                          key={id}
                        >
                          {ad.name}
                        </span>
                      ))}
                    </div>

                    <div className="mb-6">
                      <div className="border-l-4 border-blue-500 pl-4 mb-4">
                        <h2 className="text-lg font-bold font-bold text-gray-600 mb-1">
                          Available In
                        </h2>
                      </div>

                      {!isEmpty(data.agoda_url) && (
                        <a
                          href={data.agoda_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 inline-flex justify-center items-center text-white bg-rose-600 border rounded-full font-medium font-body mr-2 px-5"
                        >
                          Agoda
                        </a>
                      )}

                      {!isEmpty(data.booking_url) && (
                        <a
                          href={data.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 inline-flex justify-center items-center text-white bg-blue-600 border rounded-full font-medium font-body mr-2 px-5"
                        >
                          Booking.com
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>hotel not found</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHotel;
