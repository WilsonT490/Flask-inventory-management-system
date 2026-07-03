import { useEffect, useState } from "react";

function EditItemModal({ item, onSave, onCancel }) {
  const [form, setForm] = useState(item);

  useEffect(() => {
    setForm(item);
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Product</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            value={form.barcode}
            onChange={(e) =>
              setForm({ ...form, barcode: e.target.value })
            }
          />

          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <div className="buttons">
            <button type="submit">Save</button>

            <button
              type="button"
              className="cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default EditItemModal;