import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface IDogs {
  message: string;
  status: string;
}
const RandomDogs = () => {
  const [dogs, setDogs] = useState<null | IDogs>(null);
  const [isFetchingDogs, setisFetchingDogs] = useState(false);

  const FetchDogs = async () => {
    try {
      setisFetchingDogs(true);
      const dog = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!dog) throw new Error("No Dog Available");
      const data = await dog.json();
      setDogs(data);
      setisFetchingDogs(false);
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setisFetchingDogs(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {isFetchingDogs ? (
        <p className="text-4xl py-5 text-red-600">
          <LoadingSpinner /> Fetching Dogs ........{" "}
        </p>
      ) : (
        <img
          src={`${dogs?.message}`}
          alt={`${dogs?.message}`}
          height={300}
          width={300}
        />
      )}
      <button
        onClick={FetchDogs}
        disabled={isFetchingDogs}
        className="border px-4 py-2 bg-grey-200 disabled:cursor-not-allowed"
      >
        Fetch Dog
      </button>
    </div>
  );
};

export default RandomDogs;
