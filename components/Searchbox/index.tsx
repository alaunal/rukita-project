import React, { useState, useEffect, useMemo, useRef } from "react";
import { debounce, map } from "lodash";
import { HiOutlineSearch, HiXCircle } from "react-icons/hi";

import { getLocation } from "@/services/index";

export type ISearchboxProps = {
  isDisabled: boolean;
  handlerSetLocation: any;
};

const Searchbox: React.FC<ISearchboxProps> = ({
  isDisabled,
  handlerSetLocation,
}) => {
  const inputBox = useRef<any>(null);

  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [result, setResults] = useState<any[]>([]);

  const changeHandler = (event: any) => {
    setQuery(event.target.value);
  };

  const handlerSelectLocation = (data: any) => {
    setIsFocus(false);
    handlerSetLocation(data);
  };

  const handlerResetSearch = () => {
    setQuery("");
    setIsFocus(false);
    inputBox.current.value = "";
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 350),
    []
  );

  const fetchLocation = async (query: any) => {
    setLoading(true);
    try {

      const params = {
        q: query,
        format: "json",
        addressdetails: "1",
        polygon_geojson: "0",
      };

      const { data } = await getLocation(params);

      setResults(data);
      setLoading(false);
      inputBox.current.focus();
    } catch (error) {
      setLoading(false);
      setResults([]);
      inputBox.current.focus();
    }
  };

  useEffect(() => {
    if (query.length >= 2) {
      fetchLocation(query);
    } else if (query.length === 0) {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
    }

    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <section className="fixed w-full flex h-20 justify-center items-center backdrop-blur-sm bg-white/30 z-10 px-8">
      <div className="relative w-full lg:w-3/5">
        <input
          type="text"
          placeholder="Search location ..."
          className="relative h-12 w-full flex rounded-md border-0 bg-white text-gray-700 font-body focus:border-0 focus:outline-none px-4 py-1"
          onChange={(e: any) => debouncedChangeHandler(e)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          disabled={isDisabled || loading}
          ref={inputBox}
        />
        <span className="absolute h-full right-4 top-0 flex items-center text-lg text-gray-700">
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : query.length > 0 ? (
            <HiXCircle className="text-red-400 text-2xl" onClick={() => handlerResetSearch()} />
          ) : (
            <HiOutlineSearch />
          )}
        </span>

        {isFocus && result.length > 0 && (
          <div className="absolute w-full rounded-b-lg bg-white py-4 left-0 text-white max-h-96 overflow-auto z-10">
            <ul>
              {map(result, (data: any, idx: number) => (
                <li
                  key={`list-${idx}`}
                  className="block px-4 py-2 text-gray-700 bg-transparent hover:bg-slate-100 font-body cursor-pointer"
                  onClick={() => handlerSelectLocation(data)}
                >
                  <p className="truncate font-semibold block w-full mb-1">
                    {data.display_name}
                  </p>
                  <span className="text-sm text-gray-500">
                    {data.address?.country} - {data.address?.city},{" "}
                    {data.address?.region}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Searchbox;
