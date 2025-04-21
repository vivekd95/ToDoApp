import React from 'react'

function InputField(props) {
    const [newTask, setNewTask] = React.useState('');
    return (
        <div className='flex flex-row '>
            <input
                type="text"
                placeholder="Enter your task"
                value={newTask}
                onChange={(e) => { setNewTask(e.target.value) }}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg outline-none focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onKeyDown={(e) => e.key === 'Enter' ? (props.addNewTask(newTask), setNewTask('')) : ''}
            />
            <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-r-lg text-sm px-5 py-2.5 text-center"
                onClick={() => { props.addNewTask(newTask); setNewTask('') }}
            >
                Add
            </button>
        </div>
    )
}

export default InputField;