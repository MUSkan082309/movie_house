import { useState, useEffect } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY}`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setIsLoading(false);
        // If it's a search (`Search` exists), return the array
        setMovie(data.Search ? data.Search : data);
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
        setIsLoading(false);
      }
    } catch (error) {
      setIsError({ show: true, msg: "Something went wrong" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getMovie(`${API_URL}${apiParams}`);
    }, 500); // debounce can be shorter
    return () => clearTimeout(timeOut);
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
