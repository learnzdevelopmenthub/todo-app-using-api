import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTodosAsync } from '../../redux/todoSlice'

const TodoList = () => {
	const {data, loading, error} = useSelector(state => state.todos)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTodosAsync())
  }, [])

  if (loading) {
      return <h1>Loading....</h1>
  }
	return (
    <>
      {error && <h2>{error}</h2>}
      
      {data.length === 0 && 
        <div>
          Todos not found
        </div>
      }

      {data.length !== 0 && data.map(item => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <h6>{item.status}</h6>
        </div>
      ))}
    </>
  )
}

export default TodoList