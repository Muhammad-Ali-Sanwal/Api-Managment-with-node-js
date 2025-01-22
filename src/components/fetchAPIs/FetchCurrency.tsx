import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface CryptoData {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number | null;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null;
  symbol: string;
  total_supply: number | null;
  total_volume: number;
}

const FetchCurrency = () => {
  const [currency, setCurrency] = useState<null | CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const FetchCurrency = async () => {
      try {
        const result = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await result.json();
        setCurrency(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError((error as Error).message);
      }
    };
    FetchCurrency();
  }, []);
  console.log("Currency got it", currency);

  if (loading)
    <p>
      <LoadingSpinner />
      Loading Data ....
    </p>;
  if (error) <p>Error Loading Data ....</p>;
  return (
    <div>
      <select>
        {currency &&
          currency.length > 0 &&
          currency.map((currency) => {
            return (
              <option value={`${currency.id}`}>{currency.ath_date}</option>
            );
          })}
      </select>
    </div>
  );
};

export default FetchCurrency;
