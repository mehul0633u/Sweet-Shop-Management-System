import React, { useEffect, useState } from "react";

const Sweets = () => {
  const [sweet, setsweet] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getSweet();
  }, []);

  const getSweet = async () => {
    const response = await fetch("http://localhost:5002/sweets");
    const result = await response.json();
    setsweet(result);
  };

  const deleteSweet = async (id) => {
    const response = await fetch(`http://localhost:5002/sweet/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result) {
      alert("Sweet Deleted Successfully");
      getSweet();
    }
  };

  const searchhandle = async (event) => {
    const key = event.target.value;

    if (!key.trim()) {
      getSweet(); // reset full list
      return;
    }

    const response = await fetch(`http://localhost:5002/search?name=${key}`);
    const result = await response.json();
    setsweet(result.length > 0 ? result : []);
  };

  const handleSort = async () => {
    if (!sortField) return;

    const response = await fetch(
      `http://localhost:5002/sort?field=${sortField}&order=${sortOrder}`
    );
    const result = await response.json();
    setsweet(result);
  };

  return (
    <div className="sweet-list">
      <h1>Sweet List</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search Sweet"
        className="search-sweet"
        onChange={searchhandle}
      />

      {/* 🔃 Sort Dropdowns */}
      <div className="sort-controls">
        <select
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button onClick={handleSort}>Sort</button>
        <button onClick={getSweet}>Reset</button>
      </div>

      {/* 🧾 Table Header */}
      <ul>
        <li>Sr.No.</li>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Quantity</li>
        <li>Operation</li>
      </ul>

      {/* 📦 Render Sweets */}
      {sweet.length > 0 ? (
        sweet.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.category}</li>
            <li>{item.price}</li>
            <li>{item.quantity}</li>
            <li>
              <button onClick={() => deleteSweet(item._id)}>Delete</button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Products Found</h1>
      )}
    </div>
  );
};

export default Sweets;
