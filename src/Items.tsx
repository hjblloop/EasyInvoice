import React from 'react';

const Items = ({ 
    items, 
    setItems
}: { 
    items: { itemName: string; quantity: number; price: number; total: number}[]; 
    setItems: ( newItem: { itemName: string; quantity: number; price: number; total: number}[]) => void }) => {
        
        const handleItemChange = (index: number, 
            field: keyof {itemName: string; quantity: number; price: number; total: number}, 
            value: string | number) => {
            const updatedItems = [...items];
            if (field === 'quantity' || field === 'price') {
                updatedItems[index][field] = parseFloat(value as string) || 0;
                updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
            } else if (field === 'itemName'){
                updatedItems[index][field] = value as string;
            }
            setItems(updatedItems);
        };

        const handleAddItem = () => {
            setItems([...items, {itemName: '',quantity: 0, price: 0, total: 0}]);
        }
        return (
            <div>
                <h3>Items</h3>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <label htmlFor={`itemName-${index}`} style={{ display: 'none' }}>
                                        Item Name
                                    </label>
                                    <input 
                                    type="text"
                                    value={item.itemName}
                                    onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                                    aria-label="Item Name"
                                   />
                                </td>
                                <td>
                                    <label htmlFor={`quantity-${index}`} style={{ display: 'none' }}>
                                        Quantity
                                    </label>
                                    <input 
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    aria-label="Quantity"
                                    />
                                </td>
                                <td>
                                    <label htmlFor={`price-${index}`} style={{ display: 'none' }}>
                                        Price
                                    </label>
                                    <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                    aria-label="Price"
                                    />
                                </td>
                                <td>
                                    {item.total.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="add-item-button" onClick={handleAddItem}>Add Item</button>
            </div>
        )
}

export default Items;