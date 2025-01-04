import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTodos } from '../../redux/todoSlice'

const TodoList = () => {
	const todos = useSelector(state => state.todos.data)
  const dispatch = useDispatch()

  useEffect(()=>{
    fetch('https://gorest.co.in/public/v2/users/7616562/todos', {
			headers: {
				'Authorization': 'Bearer cf7dc2a04cbe8334b06d1f884660c74333ca7f1739b4fac557d1f0579dc4c932',
				'Content-Type': 'application/json'
			}
		})
    .then(response=>response.json())
    .then(data=>{
      dispatch(getTodos(data))
    })
  }, [])

	return (
    <>
      {todos.length === 0 && 
        <div>
          Todos not found
        </div>
      }

      {todos.length !== 0 && todos.map(item => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <h6>{item.status}</h6>
        </div>
      ))}
    </>
  )
}

export default TodoList