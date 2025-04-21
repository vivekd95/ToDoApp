import React from "react";

export default function TaskList(props) {
    const { filteredTasks, editedTask, isEditing, handleSubmitEdit, handleCancelEdit, editedText,
        handleDelete, setEditedTask, setEditedText, handleEditChange, markAsComplete, setIsEditing } = props;
    return <div className="w-full flex flex-col items-center overflow-y-scroll max-h-100">
        {
            filteredTasks && filteredTasks.map((item, key) => (
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={key}>
                    {
                        isEditing && editedTask === item.id ?
                            <div>
                                <input
                                    type="text"
                                    className="border border-slate-600 outline-none rounded p-2 mr-2"
                                    value={editedText}
                                    onChange={handleEditChange}
                                />
                                <button
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-3 text-center"
                                    onClick={() => handleSubmitEdit(key)}>Save</button>
                                <button
                                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={() => handleCancelEdit(key)}>Cancel</button>
                            </div> :
                            <div>
                                <span>{item.title}</span>
                            </div>
                    }
                    {
                        !item.status && !(isEditing && editedTask === item.id) ?
                            <button
                                className="text-white bg-gradient-to-l from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => markAsComplete(item.id)}
                            >
                                Complete
                            </button> : ''
                    }
                    {
                        !item.status && !(isEditing && editedTask === item.id) ?
                            <button
                                className="text-white bg-gradient-to-l from-blue-500 to-cyan-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => {
                                    setIsEditing(true);
                                    setEditedTask(item.id);
                                    setEditedText(item.title);
                                }}>
                                Edit
                            </button> : ''
                    }
                    {
                        !item.status && !(isEditing && editedTask === item.id) ?
                            <button
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button> : ''
                    }
                </div>
            ))
        }
    </div >
}