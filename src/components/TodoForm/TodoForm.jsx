import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../../redux/todoSlice";

const TodoForm = () => {

	const [title, setTitle] = useState("")
	const dispatch = useDispatch()

	const createTask = () => {
		let obj = {title: title, status: "pending" }

		fetch('https://gorest.co.in/public/v2/users/7616562/todos', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer cf7dc2a04cbe8334b06d1f884660c74333ca7f1739b4fac557d1f0579dc4c932',
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify(obj)
		})
		.then(response => response.json())
		.then(data => {
			// dispatch({type: "CREATE_TODO", payload: data})
			dispatch(createTodo(data))
		})
	}

  return (
		<>
			<input type="text" placeholder="Enter task name" value={title} onChange={e=>setTitle(e.target.value)}/>
			<button onClick={createTask}>Add</button>
		</>
	)
};

export default TodoForm;
