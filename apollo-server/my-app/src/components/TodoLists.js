import React from "react";

const TodoList = () => {

  return (
    <div className="flex justify-between align-center w-1/3 mb-1 rounded bg-white p-4 drop-shadow-sm focus:border-[#e8d4d5] ">
      <div>
        <input type="checkbox" className="mx-3" />
        <label
          className="px-2 py-4, mx-3, text-gray-500 font-thin text-xl focus:outline-none"
        >
         
        </label>
      </div>
      <div>
        <button
          className=" mx-1 px-1 rounded text-[#e8d4d5]  text-2xl"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TodoList;
