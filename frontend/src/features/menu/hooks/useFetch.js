import { useState, useEffect } from "react";

export function useFetch(url, fallbackUrl = "/menu.json") {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("api");

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP " + res.status);
        }
        return res.json();
      })
      .then((json) => {
        if (active) {
          setData(json);
          setError(null);
          setSource("api");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        // Fallback to local /menu.json if cloud backend is waking up or not yet configured
        if (fallbackUrl && url !== fallbackUrl) {
          fetch(fallbackUrl)
            .then((res) => {
              if (!res.ok) throw new Error("Fallback HTTP " + res.status);
              return res.json();
            })
            .then((json) => {
              if (active) {
                setData(json);
                setError(null);
                setSource("fallback");
              }
            })
            .catch(() => {
              if (active) setError(err.message);
            })
            .finally(() => {
              if (active) setIsLoading(false);
            });
        } else {
          if (active) {
            setError(err.message);
            setIsLoading(false);
          }
        }
      });

    return () => {
      active = false;
    };
  }, [url, fallbackUrl]);

  return {
    data,
    isLoading,
    error,
    source
  };
}