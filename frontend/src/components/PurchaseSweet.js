import React, { useEffect, useState } from "react";

const PurchaseSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [purchaseAmounts, setPurchaseAmounts] = useState({});
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

  const handlePurchaseChange = (id, value) => {
    setPurchaseAmounts({ ...purchaseAmounts, [id]: value });
  };

  const handlePurchaseAll = async () => {
    const itemsToPurchase = Object.entries(purchaseAmounts)
      .filter(([_, qty]) => qty && parseInt(qty) > 0)
      .map(([id, qty]) => ({ id, quantity: parseInt(qty) }));

    if (itemsToPurchase.length === 0) {
      alert("Please enter at least one quantity.");
      return;
    }

    for (const item of itemsToPurchase) {
      const sweet = sweets.find((s) => s.id === item.id);
      if (sweet && sweet.quantity < item.quantity) {
        alert(`Not enough stock for ${sweet.name}`);
        return;
      }

      await fetch("http://localhost:5002/sweets/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    }

    alert("Purchase completed successfully!");
    setPurchaseAmounts({});
    getSweets();
  };

  return (
    <div className="sweet-list">
      <h1>Purchase Sweets</h1>

      <input
        type="text"
        placeholder="Search Sweet"
        className="search-sweet"
        value={search}
        onChange={handleSearch}
      />

      {/* Table Header */}
      <ul>
        <li>Sr.No.</li>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Stock</li>
        <li>Purchase Qty</li>
      </ul>

      {/* Sweets List */}
      {sweets.length > 0 ? (
        sweets.map((item, index) => (
          <ul key={item.id}>
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
                value={purchaseAmounts[item.id] || ""}
                onChange={(e) =>
                  handlePurchaseChange(item.id, e.target.value)
                }
              />
            </li>
          </ul>
        ))
      ) : (
        <h2>No Sweets Found</h2>
      )}

      {/* Purchase Button */}
      <div className="restock-button-wrapper">
        <button
          className="login-button"
          onClick={handlePurchaseAll}
          disabled={
            Object.values(purchaseAmounts).filter((q) => parseInt(q) > 0)
              .length === 0
          }
        >
          Purchase All
        </button>
      </div>
    </div>
  );
};

export default PurchaseSweets;
