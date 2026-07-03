import { useEffect, useState } from "react";
import axios from "axios";

import InventoryTable from "./components/InventoryTable";
import AddItemForm from "./components/AddItemForm";
import EditItemModal from "./components/EditItemModal";
import FetchProduct from "./components/FetchProduct";
import Summary from "./components/Summary";

const API = "http://127.0.0.1:5000";

function App() {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const loadInventory = async () => {
    try {
      const response = await axios.get(`${API}/inventory`);
      setInventory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const addItem = async (item) => {
    await axios.post(`${API}/inventory`, item);
    loadInventory();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/inventory/${id}`);
    loadInventory();
  };

  const updateItem = async (item) => {
    await axios.patch(`${API}/inventory/${item.id}`, item);
    setEditingItem(null);
    loadInventory();
  };

  return (
    <div className="container">

      <h1>Inventory Management System</h1>

      <Summary items={inventory} />

      <FetchProduct />

      <AddItemForm addItem={addItem} />

      <InventoryTable
        items={inventory}
        onDelete={deleteItem}
        onEdit={setEditingItem}
      />

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onSave={updateItem}
          onCancel={() => setEditingItem(null)}
        />
      )}

    </div>
  );
}

export default App;