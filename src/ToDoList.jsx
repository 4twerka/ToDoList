import React from "react";

function ToDoList() {
    return(
        <div className="container mx-auto p-6">
            <div className="bg-slate-700 p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-white text-5xl font-bold mb-8">TODO</h1>
                <div className="flex w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Enter Todo" 
                        className="h-12 w-full rounded-l-md pl-4 text-white focus:outline-none focus:ring-2 focus:ring-green-400" 
                    />
                    <button className="bg-green-500 h-12 px-6 rounded-r-md text-white font-semibold hover:bg-green-600 focus:outline-none">Add</button>
                </div>
                <div className="text-white text-2xl mt-10 mb-4">My TODOS:</div>
                <ul className="w-full max-w-md space-y-4">
                    <li className="bg-slate-800 flex justify-between items-center p-4 rounded-lg shadow">
                        <span className="flex items-center space-x-3">
                            <button className="text-green-400 hover:text-green-500 focus:outline-none">✅</button>
                            <span className="text-white">New todo task</span>
                        </span>
                        <button className="text-red-400 hover:text-red-500 focus:outline-none">🗑️</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ToDoList;
