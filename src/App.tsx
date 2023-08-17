
import { useState, useEffect } from 'react';
import {CanceledError} from "./services/api-client"
import userService, { User } from './services/user-service';


function App(){

  const [users, setUsers] = useState<User[]>([])
  const  [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    

    setIsLoading(true)
    const { request, cancel} = userService.getAllUsers()
    request.then(res => {
      setUsers(res.data)
    setIsLoading(false)
    })
    .catch(err => {
      if( err instanceof CanceledError) return;
      setError(err.message)
      setIsLoading(false)
    
    })

    return ()=> cancel()
  }, [])

  const deleteUser = (user:User) =>{
    const originalUsers = [...users]
    setUsers(users.filter(u => u.id !== user.id))

    userService.deleteUser(user.id)
    .catch(err => {
      setError(err.message)
      setUsers(originalUsers)
    
    })
  }

  const addUser =()=>{
    const originalUsers = [...users]
    const newUser = {id:0, name: "Andrea"}
    setUsers([newUser, ...users])

    userService.createUser(newUser)
    .then(({data:savedUser}) => setUsers([savedUser, ...users])) // savedUser is an alias for data
    .catch((err) =>{
      setError(err.message)
      setUsers(originalUsers)

    })
  }

  const updateUser = (user:User) =>{
    const originalUsers = [...users]
    const updatedUser = {...user, name:user.name + "!"}
    setUsers(users.map(u => u.id === user.id ? updatedUser : u))

    userService.updateUser(updatedUser)
    .catch (err =>{
      setError(err.message)
      setUsers(originalUsers)

    })

  }

 
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
    {isLoading && <div className="spinner-border"></div>}
     <button className="btn btn-primary mb-3" onClick={addUser}>Add</button>
   <ul className="list-group">
     {users.map(user => 
     <li 
     key ={user.id} 
     className="list-group-item d-flex justify-content-between">
       {user.name}
       <div>
         <button 
         className="btn btn-outline-secondary mx-1" 
         onClick={() => updateUser(user)}>
                Update
              </button>
     <button
     onClick={()=> deleteUser(user)} 
     className="btn btn-outline-danger">Delete</button>
       </div>
        
     </li>)}
   </ul>
    </>
       
 
  )
}

export default App;