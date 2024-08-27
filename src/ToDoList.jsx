import React, { useState } from "react";

function ToDoList() {
    const [InputValue, SetInputValue] = useState('');
    const [Items, SetItems] = useState([]);

    const DeleteItem = (indexDelete) => {
        SetItems(Items.filter((item, index) => index !== indexDelete));
    }

    const ButtonAdd = () => {
        if (InputValue.trim()) {
            SetItems([...Items, InputValue]);
            SetInputValue('');
        }
    }

    function ShowVlue(e) {
        SetInputValue(e.target.value);
    }

    return(
        <div className="container mx-auto p-6">
            <div className="bg-slate-700 p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-white text-5xl font-bold mb-8">TODO</h1>
                <div className="flex w-full max-w-md">
                    <input onChange={ShowVlue}
                        value={InputValue}
                        type="text" 
                        placeholder="Enter Todo" 
                        className="h-12 w-full rounded-l-md pl-4 text-white focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                    <button onClick={ButtonAdd} className="bg-green-500 h-12 px-6 rounded-r-md text-white font-semibold hover:bg-green-600 focus:outline-none">Add</button>
                </div>
                <div className="text-white text-2xl mt-10 mb-4">My TODOS:</div>
                {Items.map((item, index) => (
                    <ul key={index} className="w-full max-w-md space-y-4">
                        <li className="bg-slate-800 flex justify-between items-center p-4 rounded-lg shadow">
                        <span className="flex items-center space-x-3">
                            <button className="text-green-400 hover:text-green-500 focus:outline-none">✅</button>
                            <span className="text-white">{item}</span>
                        </span>
                        <button onClick={() => DeleteItem(index)} className="text-red-400 hover:text-red-500 focus:outline-none">🗑️</button>
                    </li>
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default ToDoList;
