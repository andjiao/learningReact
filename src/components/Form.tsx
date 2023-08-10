
import { useForm, FieldValues } from 'react-hook-form'

interface FormData {
    name:string;
    age:number;
}

const Form = () => {
    
    const {
        register, 
        handleSubmit, 
        formState: {errors}
        /*
        on line 19 we call the useForm-hook and pass the interface, 
        this securee automcomplete when writting errors on line 33 and 34
        */
    } =useForm<FormData>() 

    const onSubmit = (data: FieldValues) => console.log(data)
    
  return (
      <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
          <label className="form-label" htmlFor='name' >Name</label>
          <input 
          {...register ("name", {required:true, minLength:3})} 
          id="name" 
          type="text" 
          className="form-control" />
         {errors.name?.type === "required" && <p className='text-danger'>The name field is required</p>}
        {errors.name?.type==="minLenght" && <p className='text-danger'>The name must be at least three characters</p>}
      </div>

      <div className="mb-3"><label htmlFor="age" className="form-label">Age</label>
      <input 
      {...register("age")}
         id="age" 
          type="number" 
          className="form-control" />
     
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>

      </form>
      
    
  )
}

export default Form