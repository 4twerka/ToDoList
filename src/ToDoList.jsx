import { useState, useEffect } from "react";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [animatedIndexes, setAnimatedIndexes] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("todos");
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems)); 
      } catch (error) {
        console.error("Error parsing localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("todos", JSON.stringify(items));
    } else {
      localStorage.removeItem("todos"); 
    }
  }, [items]);

  const addItem = () => {
    if (inputValue.trim()) {
      const newItems = [...items, inputValue];
      setItems(newItems);
      setInputValue("");
    }
  };

  const deleteItem = (indexDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexDelete);
    setItems(updatedItems);
    setAnimatedIndexes(animatedIndexes.filter((i) => i !== indexDelete));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleAnimation = (index) => {
    if (!animatedIndexes.includes(index)) {
      setAnimatedIndexes((prev) => [...prev, index]);
    }
    moveItemsToTop(index);
  };

  const moveItemsToTop = () => {
    const animatedItems = animatedIndexes.map((i) => items[i]);
    const nonAnimatedItems = items.filter((_, i) => !animatedIndexes.includes(i));
    setItems([...animatedItems, ...nonAnimatedItems]);
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditValue(items[index]);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = (index) => {
    const updatedItems = items.map((item, i) => (i === index ? editValue : item));
    setItems(updatedItems);
    setIsEditing(null);
    setEditValue("");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-slate-700 p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-white text-5xl font-bold mb-8">TODO</h1>

        <div className="flex w-full max-w-md">
          <input
            onChange={handleInputChange}
            value={inputValue}
            type="text"
            placeholder="Enter Todo"
            className="h-12 w-full rounded-l-md pl-4 text-white bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={addItem}
            className="bg-green-500 h-12 px-6 rounded-r-md text-white font-semibold hover:bg-green-600 focus:outline-none"
          >
            Add
          </button>
        </div>

        <div className="text-white text-2xl mt-10 mb-4">My TODOS:</div>

        <ul className="w-full max-w-md space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className={`bg-slate-800 flex justify-between items-center p-4 rounded-lg shadow mt-3 ${
                animatedIndexes.includes(index) ? "border-green-700 border-4" : ""
              }`}
            >
              <span className="flex items-center space-x-3">
                {isEditing === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                    className="bg-slate-700 text-white px-2 py-1 rounded"
                  />
                ) : (
                  <span className="text-white">{item}</span>
                )}
              </span>

              <span className="flex space-x-3">
                <button onClick={() => toggleAnimation(index)}>⭐</button>
                {isEditing === index ? (
                  <button
                    onClick={() => saveEdit(index)}
                    className="text-green-400 hover:text-green-500 focus:outline-none"
                  >
                    💾
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-green-400 hover:text-green-500 focus:outline-none"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => deleteItem(index)}
                  className="text-red-400 hover:text-red-500 focus:outline-none"
                >
                  🗑️
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;