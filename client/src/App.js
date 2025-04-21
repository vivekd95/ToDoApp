import React from 'react';
import TaskList from './components/TaskList';
import HttpRequest from './utils/HttpRequest';
import InputField from './components/InputField';

export default function App() {
  const [tasks, setTasks] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState('');
  const [editedTask, setEditedTask] = React.useState('');
  const [filteredTasks, setFilteredTasks] = React.useState([]);
  const [filterBy, setFilterBy] = React.useState(0);

  const handleFilter = (value) => {
    setFilterBy(value);
    if (value !== 2) {
      setFilteredTasks(tasks.filter((item) => item.status === value));
    } else {
      setFilteredTasks(tasks.sort((a, b) => a.status - b.status));
    }
  }

  const addNewTask = (val) => {
    if (val.trim()) {
      HttpRequest('todo/create', { title: val }, (response) => {
        if (response.success) {
          setTasks(prevTasks => [...prevTasks, response.data]);
          setFilteredTasks(prevTasks => [...prevTasks, response.data]);
        }
      }, 'POST');
    }
  }

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  }

  const handleDelete = (id) => {
    let updatedTasks = filteredTasks.filter((item) => item.id !== id);
    HttpRequest(`todo/delete?id=${id}`, {}, (response) => {
      if (response.success) {
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      }
    }, 'DELETE');
  }

  const handleSubmitEdit = (index) => {
    let task = filteredTasks;
    HttpRequest(`todo/edit?id=${task[index].id}`, { title: editedText }, (response) => {
      if (response.success) {
        task[index]['title'] = editedText;
        setTasks(task);
        setIsEditing(false);
        setEditedTask('');
        setEditedText('');
      }
    }, 'PUT');
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask('');
    setEditedText('');
  }

  const markAsComplete = (id) => {
    let task = tasks;
    HttpRequest(`todo/complete?id=${id}`, {}, (response) => {
      if (response.success) {
        let index = task.findIndex(item => item.id === id);
        task[index].status = 1;
        setTasks(task);
        setFilteredTasks(tasks.filter((item) => item.status === 1));
        setFilterBy(1);
      }
    }, 'PUT');
  }

  const handleTaskList = () => {
    HttpRequest('todo', {}, (response) => {
      if (response.success) {
        setTasks(response.data);
        setFilteredTasks(response.data.filter((item) => item.status === 0));
      }
    })
  }

  React.useEffect(() => {
    handleTaskList();
  }, [])

  const props = {
    tasks: tasks,
    isEditing: isEditing,
    editedText: editedText,
    editedTask: editedTask,
    addNewTask: addNewTask,
    markAsComplete: markAsComplete,
    handleDelete: handleDelete,
    setIsEditing: setIsEditing,
    filteredTasks: filteredTasks,
    setEditedTask: setEditedTask,
    setEditedText: setEditedText,
    handleSubmitEdit: handleSubmitEdit,
    handleCancelEdit: handleCancelEdit,
    handleEditChange: handleEditChange,
  }

  return (
    <div className='flex items-center flex-col h-screen bg-pink-200 justify-center' >
      <div className='bg-white flex items-center flex-col rounded-md p-5 w-5/12 h-4/5'>
        <h1 className='text-3xl mb-5'>To-Do </h1>
        <div className='w-full h-full flex flex-col'>
          <select
            id="filterBy"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-30"
            value={filterBy}
            onChange={(e) => handleFilter(Number(e.target.value))}
          >
            <option value={0}>Pending</option>
            <option value={1}>Completed</option>
            <option value={2}>All Tasks</option>
          </select>
          <InputField {...props} />
          {/* <div className="flex flex-col items-center flex-grow w-full overflow-hidden"> */}
          {/* <div className="w-full flex-grow overflow-y-scroll max-h-100"> */}
          <TaskList {...props} />
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div >
  );
}