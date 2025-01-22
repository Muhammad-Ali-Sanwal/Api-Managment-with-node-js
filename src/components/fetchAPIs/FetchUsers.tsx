import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
interface Geo {
  lat: string;
  lng: string;
}
interface address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: address;
  phone: string;
  website: string;
  company: Company;
}
const FetchUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [user, setUser] = useState<null | User[]>([]);
  useEffect(() => {
    const newRequest = async () => {
      try {
        const result = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!result.ok) throw new Error("Failed to fetch users ...");
        const newUser = await result.json();
        setUser(newUser);
        console.log(newUser);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    newRequest();
  }, []);

  if (loading)
    return (
      <p className="text-red-700 text-center">
        <LoadingSpinner />
        Loading
      </p>
    );
  if (error) return <p className="text-red-700 text-center">Error : {error}</p>;

  return (
    <>
      <div>
        <p className="text-center font-extrabold text-green-500 text-3xl">
          User Details
        </p>
      </div>
      {user &&
        user.length > 0 &&
        user.map((user) => {
          return (
            <div
              key={user.id}
              className="m-4 p-4 border border-gray-300 rounded"
            >
              <p>
                <strong>User ID:</strong> {user.id}
              </p>
              <p>
                <strong>User Name:</strong> {user.name}
              </p>
              <p>
                <strong>User Username:</strong> {user.username}
              </p>
              <p>
                <strong>User Email:</strong> {user.email}
              </p>
              <p>
                <strong>User Address:</strong>
              </p>
              <p>
                <strong>Street:</strong> {user.address.street}
              </p>
              <p>
                <strong>Suite:</strong> {user.address.suite}
              </p>
              <p>
                <strong>City:</strong> {user.address.city}
              </p>
              <p>
                <strong>Zipcode:</strong> {user.address.zipcode}
              </p>
              <p>
                <strong>Geo Location:</strong>
              </p>
              <p>
                <strong>Latitude:</strong> {user.address.geo.lat}
              </p>
              <p>
                <strong>Longitude:</strong> {user.address.geo.lng}
              </p>
              <p>
                <strong>User Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>User Website:</strong> {user.website}
              </p>
              <p>
                <strong>Company:</strong>
              </p>
              <p>
                <strong>Company Name:</strong> {user.company.name}
              </p>
              <p>
                <strong>Catch Phrase:</strong> {user.company.catchPhrase}
              </p>
              <p>
                <strong>Company BS:</strong> {user.company.bs}
              </p>
            </div>
          );
        })}
    </>
  );
};

export default FetchUsers;
