import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface User {
  name: string;
  age: string;
  fatherName: string;
  CGPA: string;
  salary: string;
  passingYear: string;
}
const FetchDataFromMongoDB = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [user, setUser] = useState<null | User[]>([]);
  useEffect(() => {
    const newRequest = async () => {
      try {
        const result = await fetch("http://localhost:5000/api/students");
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
      <div className="container mx-auto px-4 py-6">
        <table className="min-w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Father's Name</th>
              <th className="px-4 py-2 text-left">CGPA</th>
              <th className="px-4 py-2 text-left">Salary</th>
              <th className="px-4 py-2 text-left">Passing Year</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          {user && user.length > 0 ? (
            <tbody>
              {user.map((student, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b-2">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.age}</td>
                  <td className="px-4 py-2">{student.fatherName}</td>
                  <td className="px-4 py-2">{student.CGPA}</td>
                  <td className="px-4 py-2">{student.salary}</td>
                  <td className="px-4 py-2">{student.passingYear}</td>
                  <td className="px-4 py-2 flex gap-1">
                    <button className=" border-2 px-2">Delete</button>
                    <button className=" border-2 px-2">Edit</button>
                  </td>
                </tr>
              ))}
              <hr />
            </tbody>
          ) : (
            <p className="py-1 text-center">No data available</p>
          )}
        </table>
      </div>
    </>
  );
};

export default FetchDataFromMongoDB;
