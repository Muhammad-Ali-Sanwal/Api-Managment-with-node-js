import { useEffect, useState } from "react";

const FetchCountries = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const FetchCountries = async () => {
      try {
        const data = await fetch("https://restcountries.com/v3.1/all");
        if (!data.ok) throw new Error("Failed to fetch countries...");
        const countries = await data.json();
        console.log(countries);
        setCountries(countries);
      } catch (error) {
        console.log(error);
      }
    };
    FetchCountries();
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-center items-center ml-4">
      <select className=" p-2 bg-green-100 border-4 rounded border-black font-extrabold">
        {countries &&
          countries.length > 0 &&
          countries.map((country: any) => {
            return (
              <option className="text-red-600 font-extrabold border-b-2 border-red">
                {country?.idd.root} &nbsp; {country?.flag} &nbsp;{" "}
                {country?.capital}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default FetchCountries;
