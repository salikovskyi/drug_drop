import React, { useEffect, useState } from "react";
import "../styles/style.css";

export default function DrugDrop() {
  const groups = [1, 2  ];
  const initialItems = [
    { id: 1, group: 1, value: "Item1" },
    { id: 2, group: 1, value: "Item2" },
    { id: 3, group: 1, value: "Item3" },
    { id: 4, group: 2, value: "Item4" },
    { id: 5, group: 2, value: "Item5" },
    { id: 6, group: 2, value: "Item6" },
  ];

  const [items, setItems] = useState(initialItems);
  const [dragData, setDragData] = useState({});

  const addItem = (key) => {
    const newItem = {
      id: items.length + 1,
      group: key,
      value: `Item${items.length + 1}`,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleDragStart = (e, id, group) => {
    setDragData({ id: id, initialGroup: group });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const changeCategory = (itemId, group) => {
    const newItems = [...items];
    newItems[itemId - 1].group = group;
    setItems([...newItems]);
  };

  const handleDrop = (e, group) => {
    const selected = dragData.id;
    changeCategory(selected, group);
  };

  return (
    <>
      <div className="groups">
        {groups.map((group) => (
          <div
            className="group"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, group)}
            key={group}
          >
            <h1 className="title">LIST {group}</h1>
            <div>
              {items
                .filter((item) => item.group === group)
                .map((item) => (
                  <div
                    key={item.id}
                    id={item.id}
                    className="items"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id, group)}
                  >
                    {item.value}
                  </div>
                ))}
            </div>
            <button className="addBtn" onClick={() => addItem(group)}>Добавить</button>
          </div>
        ))}
      </div>
    </>
  );
}
