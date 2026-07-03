function InventoryTable({ items, onDelete, onEdit }) {
  return (
    <table>

      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Barcode</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {items.map((item) => (

          <tr key={item.id}>

            <td>{item.id}</td>

            <td>{item.name}</td>

            <td>{item.barcode}</td>

            <td>${item.price}</td>

            <td>{item.quantity}</td>

            <td>

              <button onClick={() => onEdit(item)}>
                Edit
              </button>

              <button
                className="delete"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default InventoryTable;