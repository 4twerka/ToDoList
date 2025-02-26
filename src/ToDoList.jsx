import { useState, useEffect } from "react";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

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
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (inputValue.trim()) {
      const newItem = { text: inputValue, favorite: false };
      setItems([...items, newItem]);
      setInputValue("");
    }
  };

  const deleteItem = (indexDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexDelete);
    setItems(updatedItems);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleFavorite = (index) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, favorite: !item.favorite } : item
    );

    updatedItems.sort((a, b) => b.favorite - a.favorite);
    
    setItems(updatedItems);
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditValue(items[index].text);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = (index) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, text: editValue } : item
    );
    setItems(updatedItems);
    setIsEditing(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br">
      <div className="w-full max-w-2xl bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-white text-3xl sm:text-5xl font-bold text-center mb-6">TODO LIST</h1>

        <div className="flex w-full">
          <input
            onChange={handleInputChange}
            value={inputValue}
            type="text"
            placeholder="Enter Todo"
            className="h-12 w-full rounded-l-md px-4 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={addItem}
            className="bg-green-500 h-12 px-6 rounded-r-md text-white font-semibold hover:bg-green-600 focus:outline-none transition"
          >
            Add
          </button>
        </div>

        <div className="text-white text-lg sm:text-2xl mt-6 mb-3">My TODOS:</div>
        <ul className="w-full space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-lg shadow transition ${
                item.favorite ? "bg-yellow-600 border-yellow-500 border-4" : "bg-gray-700"
              }`}
            >
              <span className="flex-1 flex items-center space-x-3">
                {isEditing === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                    className="bg-gray-600 text-white px-2 py-1 rounded w-full"
                  />
                ) : (
                  <span className="text-white break-words">{item.text}</span>
                )}
              </span>

              <span className="flex space-x-3">
                <button 
                  onClick={() => toggleFavorite(index)}
                  className={`text-lg sm:text-xl ${item.favorite ? "text-yellow-300" : "text-gray-400"} hover:text-yellow-400 transition`}
                >
                  ⭐
                </button>
                {isEditing === index ? (
                  <button
                    onClick={() => saveEdit(index)}
                    className="text-green-400 hover:text-green-500 focus:outline-none text-lg sm:text-xl"
                  >
                    💾
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-blue-400 hover:text-blue-500 focus:outline-none text-lg sm:text-xl"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => deleteItem(index)}
                  className="text-red-400 hover:text-red-500 focus:outline-none text-lg sm:text-xl"
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
