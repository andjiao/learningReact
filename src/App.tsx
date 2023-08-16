
import axios, { CanceledError } from "axios"
import { useState, useEffect } from 'react';

interface User{
  id: number,
  name:string
}
function App(){

  const [users, setUsers] = useState<User[]>([])
  const  [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const controller = new AbortController()

    setIsLoading(true)
    axios.get <User[]>('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
    .then(res => {
      setUsers(res.data)
    setIsLoading(false)
    })
    .catch(err => {
      if( err instanceof CanceledError) return;
      setError(err.message)
      setIsLoading(false)
    
    })

    return ()=> controller.abort()
  }, [])

  const deleteUser = (user:User) =>{
    const originalUsers = [...users]
    setUsers(users.filter(u => u.id !== user.id))

    axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
    .catch(err => {
      setError(err.message)
      setUsers(originalUsers)
    
    })

  }

 
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
    {isLoading && <div className="spinner-border"></div>}
   <ul className="list-group">
     {users.map(user => 
     <li 
     key ={user.id} 
     className="list-group-item d-flex justify-content-between">
       {user.name}
     <button
     onClick={()=> deleteUser(user)} 
     className="btn btn-outline-danger">Delete</button></li>)}
   </ul>
    </>
       
 
  )
}

export default App;