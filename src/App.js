import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Movie } from "./components/Movie";
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const loadingRef = useRef(null);

  const fetchMovies = useCallback(async () => {
    if (pageNumber > 0) {
      try {
        // const { data } = await axios.get(
        //   `https://api.pexels.com/v1/search?query=people
        //   `,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${apiKey}`
        //     }
        //   }
        // );
        console.log(apiKey);
        fetch(`https://api.pexels.com/v1/search?query=people`, {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        })
          .then((res) => res.json())
          .then((data) => console.log(data));

        // console.log(data);
        // setMovies((movies) => [...movies, ...data.results]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [pageNumber]);

  // fetching data
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // observing dom node
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((page) => page + 1);
        }
      },
      { threshold: 0.5 }
    );
    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => {
      if (observer.current) {
        observer.unobserve(observer.current);
      }
    };
  }, [loadingRef]);

  return (
    <>
      <header>
        <h1>Movies</h1>
        <p>{movies.length} movies</p>
      </header>
      <div className="movies">
        {movies.map((movie) => {
          return <Movie movie={movie} key={movie.id} />;
        })}
      </div>
      <div className="loader" ref={loadingRef}>
        <h3>Loading....</h3>
      </div>
    </>
  );
}

export default App;
