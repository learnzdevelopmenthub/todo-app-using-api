import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAsync } from "../../redux/todoSlice";

const TodoForm = () => {

	const [title, setTitle] = useState("")
	const dispatch = useDispatch()
	const {createError, createLoading} = useSelector((state)=> state.todos)

	const createTask = () => {
		let obj = {title: title, status: "pending" }
		dispatch(createTodoAsync(obj))
		setTitle("")
	}

  return (
		<>
			<input type="text" placeholder="Enter task name" value={title} onChange={e=>setTitle(e.target.value)}/>
			<button onClick={createTask} disabled={createLoading}>{createLoading ? "Adding": "Add"}</button>
			{createError && <p>{createError}</p>}
		</>
	)
};

export default TodoForm;
