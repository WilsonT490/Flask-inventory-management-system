import { useState } from "react";

function AddItemForm({ addItem }) {

  const [form, setForm] = useState({
    name: "",
    barcode: "",
    price: "",
    quantity: ""
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    addItem(form);

    setForm({
      name: "",
      barcode: "",
      price: "",
      quantity: ""
    });
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>Add Product</h2>

      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Barcode"
        value={form.barcode}
        onChange={(e) =>
          setForm({ ...form, barcode: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
      />

      <button>Add Item</button>

    </form>

  );
}

export default AddItemForm;