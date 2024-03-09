import { useState } from "react";

export default function AddObject() {
  let [stock, setStock] = useState({});

  let handleChange = (e) => {
    const { name, value } = e.target;
    setStock((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  let sendDataToServer = async () => {
    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stock),
      });

      if (response.ok) {
        setStock({});
        console.log("stock added successfully");
      } else {
        console.error("Error adding product");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };
  return (
    <>
      <div className="container my-5 mx-auto sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-5/6">
        <h1 className="text-center font-semibold text-2xl mb-6">Add a new Stock</h1>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="slug"
        >
          Stock Name:
        </label>
        <input
          className="appearance-none border mb-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          type="text"
          name="slug"
          value={stock?.slug || ""}
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="quantity"
        >
          Quantity:
        </label>
        <input
          className="appearance-none border mb-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          type="number"
          name="quantity"
          value={stock?.quantity || ""}
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price per Unit:
        </label>
        <input
          className="appearance-none border mb-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          type="number"
          name="price"
          value={stock?.price || ""}
        />

        <button
          onClick={sendDataToServer}
          className="bg-blue-500 p-2 rounded-md w-full sm:w-auto"
        >
          Add Stock
        </button>
      </div>
    </>
  );
}
