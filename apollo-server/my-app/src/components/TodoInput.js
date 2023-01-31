import React from "react";

const TodoInput = () => {
  return (
    <>
      <form className="mb-3 drop-shadow-lg">
        <input
          type="text"
          placeholder="What needs to be done?"
          className=" m-0 w-96 py-4 px-2 italic font-normal focus:border-none"
        />
        <button
          className="bg-white p-4 text-gray-400 "
        >
          Add
        </button>
      </form>
    </>
  );
};

export default TodoInput;
