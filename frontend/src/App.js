import { useEffect, useState } from "react";
import Task from "./components/Task";
import { getAllTasks, addTask, updateTask, deleteTask, toggleIsDoneTask } from "./utils/HandleApi";
import FieldAndBtn from "./components/FieldAndBtn";


function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [task_id, setTaskId] = useState("");

  const [boards, setBoards] = useState([])
	const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    getAllTasks(setTasks);
  }, [])

	useEffect(() => {
		setBoards(filterTasks(
					task => !task.isDone,
					task => task.isDone
				));
	}, [tasks])

	const filterTasks = (filterToDo, filterIsDone) => {
		return [
			{id: 1, title: "ToDo", items: [...tasks.filter(task => filterToDo(task))]},
			{id: 2, title: "Is Done", items: [...tasks.filter(task => filterIsDone(task))]}
		]
	}

  const updateMode = (task_id, title) => {
    setIsUpdating(true);
    setTitle(title);
    setTaskId(task_id);
  }

	const [currentBoard, setCurrentBoard] = useState(null)
	const [currentTask, setCurrentTask] = useState(null)

	function dragOverHandler(e) {
		e.preventDefault();
		if(e.target.className === "task") {
			e.target.style.boxShadow = '0 4px 3px rgb(15, 221, 15)';
		}
	}	

	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	function dragStartHandler(e, board, item) {
		setCurrentBoard(board);
		setCurrentTask(item);
	}

	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none';
	}

	function dragDropHandler(e, board, item) {
		e.preventDefault();
		const currentIndex = currentBoard.items.indexOf(currentTask);
		currentBoard.items.splice(currentIndex, 1);
		if(currentBoard !== board) { 
			currentTask.isDone = !currentTask.isDone;
			toggleIsDoneTask(currentTask.task_id, currentTask.isDone)
		}
		const dropIndex = board.items.indexOf(item);
		board.items.splice(dropIndex, 0, currentTask);

		setBoards(boards.map(b => {
			if(b.id === board.id) { return board; }
			
			if(b.id === currentBoard.id) { return currentBoard;	}

			return b;
		}))
		e.target.style.boxShadow = 'none';
	}

	function dropBoardHandler(e, board) {
		if(e.target.className === "task") {
			return; 
		}
		if(currentBoard !== board) { 
			currentTask.isDone = !currentTask.isDone;
			toggleIsDoneTask(currentTask.task_id, currentTask.isDone)
		}
		board.items.push(currentTask);
		const currentIndex = currentBoard.items.indexOf(currentTask);
		currentBoard.items.splice(currentIndex, 1);
		setBoards(boards.map(b => {
			if(b.id === board.id) { return board; }
			
			if(b.id === currentBoard.id) { return currentBoard;	}

			return b;
		}));

		e.target.style.boxShadow = 'none';
	}

	const searchTask = () => {
		setBoards(filterTasks(
			task => !task.isDone && task.title.search(new RegExp(`${searchTitle}`,'g')) !== -1,
			task => task.isDone && task.title.search(new RegExp(`${searchTitle}`,'g')) !== -1
		));

	}

	const onChangeSearch = (title) => {
		setSearchTitle(title);
		if (title === "") {
			setTasks([...tasks]);
		}
	}

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
					<FieldAndBtn 
					placeholder="Add todo"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onClick=	{
            isUpdating ? () => updateTask(task_id, title, setTitle, setTasks, setIsUpdating, tasks) 
                       : () => addTask(title, setTitle, setTasks, tasks)
            }
					title={ isUpdating ? "Update" : "Add" }
					/>
					
					<FieldAndBtn 
					placeholder="Search todo"
					value={searchTitle}
					onChange={(e) => onChangeSearch(e.target.value)}
					onClick={() => searchTask()}
					title={ "Search" }
					/>
					
        </div>
					<div className="wrapper">
						{
						boards.map(board => 
							<div 
							className="board"
							onDragOver={(e) => dragOverHandler(e)}
							onDrop={e => dropBoardHandler(e, board)}
							>
								<div className="board__title">{board.title}</div>
								{board.items.map(task => 
									<Task 
									dragOverHandler={(e) => dragOverHandler(e)}
									dragLeaveHandler={e => dragLeaveHandler(e)}
									dragStartHandler={e => dragStartHandler(e, board, task)}
									dragEndHandler={e => dragEndHandler(e)}
									dragDropHandler={e => dragDropHandler(e, board, task)}
									isDraggable={true}
									key = {task.task_id} 
									title = {task.title} 
									updateMode = {() => updateMode(task.task_id, task.title)}
									deleteTask = {() => deleteTask(task.task_id, setTasks, tasks)}
									/>
								)}
							</div>)
						}
					</div>
      </div>
    </div>
  );
}

export default App;
