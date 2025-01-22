import { ChangeEvent, useState } from "react";

interface IFormData {
  name: string;
  age: string;
  fatherName: string;
  CGPA: string;
  salary: string;
  passingYear: string;
}
interface IFormEvent extends React.FormEvent<HTMLFormElement> {}

const Contact = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setformData] = useState<IFormData>({
    name: "",
    age: "",
    fatherName: "",
    CGPA: "",
    salary: "",
    passingYear: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const HandleSubmit = async (e: IFormEvent) => {
    e.preventDefault();
    setErrors([]);
    const response = await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log("response", response);

    if (response.ok) {
      setformData({
        name: "",
        age: "",
        fatherName: "",
        CGPA: "",
        salary: "",
        passingYear: "",
      });
    } else {
      const data = await response.json();
      console.log("errooooooors frontend", data);

      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <div className="max-w-[40%] m-auto">
      <form
        className="flex m-auto  flex-col gap-1 mt-3"
        onSubmit={HandleSubmit}
      >
        <div className="flex gap-0 flex-col">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="border-2 border-black"
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-0 flex-col">
          <label>Age</label>
          <input
            type="number"
            name="age"
            className="border-2 border-black"
            value={formData.age}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-0 flex-col">
          <label>F.Name</label>
          <input
            type="text"
            name="fatherName"
            className="border-2 border-black"
            value={formData.fatherName}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-0 flex-col">
          <label>CGPA</label>
          <input
            type="number"
            name="CGPA"
            className="border-2 border-black"
            value={formData.CGPA}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-0 flex-col">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            className="border-2 border-black"
            value={formData.salary}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-0 flex-col">
          <label>Passing Year</label>
          <input
            type="text"
            name="passingYear"
            className="border-2 border-black"
            value={formData.passingYear}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="rounded-md p-2 border-cyan mt-2 bg-green-700 text-white border-2 border-black"
        >
          Submit
        </button>
      </form>
      <div>
        {errors.length > 0 && (
          <ul className="text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Contact;
