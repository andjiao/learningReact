import React, { FormEvent, useState } from 'react'


const Form = () => {
    const [person, setPerson] = useState({
        name:"",
        age:""
    })

 

    const handleSubmit =(event: FormEvent)=>{
        event.preventDefault()
    }
  return (
      <form onSubmit={handleSubmit}>

          <div className="mb-3">
          <label className="form-label" htmlFor='name' >Name</label>
          <input 
          onChange ={(event)=>setPerson({...person, name:event.target.value})}
        value={person.name} // this secure that the value alwaus relies on the value in oure state variable
          
          id="name" 
          type="text" 
          className="form-control" />
      </div>

      <div className="mb-3"><label htmlFor="age" className="form-label">Age</label>
      <input 
      onChange ={(event)=>setPerson({...person, age :event.target.value})}
      value = {person.age} // this secure that the value alwaus relies on the value in oure state variable
          id="age" 
          type="number" 
          className="form-control" />
     
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>

      </form>
      
    
  )
}

export default Form