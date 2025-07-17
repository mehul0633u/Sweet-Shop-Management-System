import React from "react";
import { useNavigate } from "react-router-dom";

const AddSweet = () => {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const addSweet = async () => {
    if (!id || !name || !category || !price || !quantity) {
      setError(true);
      return;
    }

    const result = await fetch("http://localhost:5002/add-sweet", {
      method: "POST",
      body: JSON.stringify({ id, name, category, price, quantity }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await result.json();
    console.log("Sweet Added:", data);

    if (data && data.sweet) {
      alert("Sweet added successfully!");
      navigate("/"); // redirect to sweet list
    }
  };

  return (
    <div className="add-sweet">
      <h1>Add Sweet</h1>

      <input
        type="number"
        placeholder="Enter Sweet ID"
        className="inputbox"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      {error && !id && <span className="invalid-input">Enter valid ID</span>}

      <input
        type="text"
        placeholder="Enter Sweet Name"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className="invalid-input">Enter valid Name</span>}

      <input
        type="text"
        placeholder="Enter Category"
        className="inputbox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid Category</span>
      )}

      <input
        type="number"
        placeholder="Enter Price"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span className="invalid-input">Enter valid Price</span>}

      <input
        type="number"
        placeholder="Enter Quantity"
        className="inputbox"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      {error && !quantity && (
        <span className="invalid-input">Enter valid Quantity</span>
      )}

      <br />
      <button type="submit" onClick={addSweet} className="login-button">
        Add Sweet
      </button>
    </div>
  );
};

export default AddSweet;
