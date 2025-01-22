import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
interface flags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}
interface Joke {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  flags: flags;
  id: number;
  safe: boolean;
  lang: string;
}
const RandomJokes = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const FetchJokes = async () => {
    try {
      setFetching(true);
      const joke = await fetch("https://v2.jokeapi.dev/joke/Any");
      if (!joke) throw new Error("No Joke Found");
      const result = await joke.json();
      console.log("result:", result);
      setJoke(result);
      setFetching(false);
      return;
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {fetching ? (
        <p className="text-3xl font-extrabold text-red-600 text-center">
          <LoadingSpinner /> Fetching ...
        </p>
      ) : (
        <div>
          <p className="text-3xl font-extrabold text-green-600 text-center">
            {(joke?.joke && joke.joke) || "No Joke available"}
          </p>
        </div>
      )}
      <button
        onClick={FetchJokes}
        disabled={fetching}
        className="p-1 border px-4 bg-grey-300 disabled:cursor-not-allowed"
      >
        Fetch
      </button>
    </div>
  );
};

export default RandomJokes;
