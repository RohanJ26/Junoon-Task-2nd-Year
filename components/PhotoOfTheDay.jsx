"use client";

import { useEffect, useState } from "react";
import Card,{CardHeader,CardContent,CardFooter,Skeleton} from "./ui/Card";

const PhotoOfTheDay = () => {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhoto() {
      try {
        const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
        const data = await response.json();
        setPhotoData(data);
      } catch (error) {
        console.error("Failed to fetch the photo of the day:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPhoto();
  }, []);

  return (
    <Card className="mt-[3vw] mx-auto w-9/12 bg-dark text-white">
      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <>
          <CardHeader className="text-center text-xl font-bold">
            {photoData?.title || "Photo of the Day"}
          </CardHeader>
          <CardContent>
            <img
              src={photoData?.url}
              alt={photoData?.title}
              className="mx-auto h-96 w-full rounded-lg"
            />
            <p className="mt-4 text-sm">{photoData?.explanation}</p>
          </CardContent>
          <CardFooter className="text-center text-xs">
            <p>{photoData?.date}</p>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default PhotoOfTheDay;
