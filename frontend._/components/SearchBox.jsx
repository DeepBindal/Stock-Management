"use client"
import { useState } from "react";

export default function SearchBox() {
  let [dropdown, setDropdown] = useState([]);
  let [loading, setLoading] = useState(false);
  let [query, setQuery] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  let handleChange = async (e) => {
    let value = e.target.value
    setQuery(value);
    if (value.length > 3) {
      setLoading(true);
      let response = await fetch(`http://localhost:5000/api/search?q=${query}`);
      let res = await response.json();
      setDropdown(res);
      setLoading(false);
    }else{
        setDropdown([]);
    }
};

let buttonAction = async (action, slug, initialQuantity) => {
    let indexDrop = dropdown.findIndex((item) => item.slug === slug);
    let newDropdown = JSON.parse(JSON.stringify(dropdown));
    if(action == "add"){
        newDropdown[indexDrop].quantity = parseInt(initialQuantity) + 1;
    }else{
        newDropdown[indexDrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropdown(newDropdown);

    setLoadingAction(true);
    const response = await fetch("http://localhost:5000/api/action", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({action, slug}),
    });
    let res = await response.json();
    console.log(res);
    setLoadingAction(false);
  }
  return (
    <div className="container my-5 mx-auto sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-5/6">
      <p className="text-center font-semibold text-2xl mb-6">Search</p>
      <div className="flex ">
        <input
          type="text"
          
          onChange={handleChange}
          placeholder="Search..."
          className="px-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="dropContainer w-full rounded bg-blue-200">
        {dropdown.map((product) => {
          return (
            <div className="flex justify-between p-3 my-3" key={product._id}>
              <span>
                {product.slug} ({product.quantity} available for ₹
                {product.price} / Unit)
              </span>
              <div >
                <button onClick={()=>{buttonAction("minus", product.slug, product.quantity)}} disabled={loadingAction} className="subtract bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-full hover:bg-blue-700 cursor-pointer transition duration-300">-</button>
                <span className="quantity mx-3">{product.quantity}</span>
                <button onClick={()=>{buttonAction("add", product.slug, product.quantity)}} disabled={loadingAction} className="add bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-full hover:bg-blue-700 cursor-pointer transition duration-300">+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
