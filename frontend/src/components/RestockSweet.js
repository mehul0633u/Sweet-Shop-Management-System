import React, { useEffect, useState } from "react";

const RestockSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [restockAmounts, setRestockAmounts] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSweets();
  }, []);

  const getSweets = async () => {
    const res = await fetch("http://localhost:5002/sweets");
    const data = await res.json();
    setSweets(data);
  };

  const handleSearch = async (e) => {
    const key = e.target.value;
    setSearch(key);

    if (!key.trim()) {
      getSweets();
      return;
    }

    const res = await fetch(`http://localhost:5002/search?name=${key}`);
    const data = await res.json();
    setSweets(data.length > 0 ? data : []);
  };

  const handleRestockChange = (id, value) => {
    setRestockAmounts({ ...restockAmounts, [id]: value });
  };

  const handleRestockAll = async () => {
    const itemsToRestock = Object.entries(restockAmounts)
      .filter(([_, qty]) => qty && parseInt(qty) > 0)
      .map(([id, qty]) => ({ id, quantity: parseInt(qty) }));

    if (itemsToRestock.length === 0) {
      alert("Please enter at least one quantity.");
      return;
    }

    for (const item of itemsToRestock) {
      await fetch("http://localhost:5002/sweets/restock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    }

    alert("Restocked successfully!");
    getSweets();
    setRestockAmounts({});
  };

  return (
    <div className="sweet-list">
      <h1>Restock Sweets</h1>

      <input
        type="text"
        placeholder="Search Sweet"
        className="search-sweet"
        value={search}
        onChange={handleSearch}
      />

      {/* Header */}
      <ul>
        <li>Sr.No.</li>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Quantity</li>
        <li>Restock Qty</li>
      </ul>

      {/* Sweets */}
      {sweets.length > 0 ? (
        sweets.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.category}</li>
            <li>{item.price}</li>
            <li>{item.quantity}</li>
            <li>
              <input
                type="number"
                placeholder="Qty"
                className="inputbox restock-input"
                value={restockAmounts[item.id] || ""}
                onChange={(e) =>
                  handleRestockChange(item.id, e.target.value)
                }
              />
            </li>
          </ul>
        ))
      ) : (
        <h2>No Sweets Found</h2>
      )}

      {/* Global Button */}
      <div className="restock-button-wrapper">
        <button
          className="login-button"
          onClick={handleRestockAll}
          disabled={
            Object.values(restockAmounts).filter((q) => parseInt(q) > 0)
              .length === 0
          }
        >
          Restock All
        </button>
      </div>
    </div>
  );
};

export default RestockSweets;
