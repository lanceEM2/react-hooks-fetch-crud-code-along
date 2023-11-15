import React from "react";

// Destructure the onUpdateItem and onDeleteItem prop
function Item({ item, onUpdateItem, onDeleteItem }) {
  // Add function to handle button click
  function handleAddToCartClick() {
    // add fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // Since our goal is to let users add or remove items from their cart, we need to toggle the isInCart property of the item
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
    .then((r) => r.json())
    // Call onUpdateItem, passing the data returned from the fetch request
    .then((updatedItem) => onUpdateItem(updatedItem));
  }

  // event listener function to enable delete
  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      {/* add the onClick listener */}
      <button 
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      {/* Delete event listener */}
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;

