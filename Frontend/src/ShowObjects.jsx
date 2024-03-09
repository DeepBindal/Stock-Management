import { useEffect, useState } from "react";

export default function ShowObjects() {
  let [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function getResponse() {
      let response = await fetch("http://localhost:5000/api");
      let res = await response.json();
      setStocks(res);
    }
    getResponse();
  });

  let deleteStock = async (e) => {
    let id = e.target.id;
    try {
      const response = await fetch(`http://localhost:5000/api/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("Response from server:", responseData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="container my-5 mx-auto sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-5/6">
        <h1 className="text-center font-semibold text-2xl mb-6">Stock Data</h1>
        <table className="min-w-full mb-8 bg-white border border-gray-300 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Slug</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id}>
                <td className="py-2 px-4 border-b">{stock.slug}</td>
                <td className="py-2 px-4 border-b">{stock.quantity}</td>
                <td className="py-2 px-4 border-b">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    id={stock._id}
                    onClick={deleteStock}
                    className="w-full p-1 m-1 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300"
                  >
                    Delete
                  </button>
                </td>
                {/* Add more cells based on your data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
