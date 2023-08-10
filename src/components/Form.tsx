
import { useForm, FieldValues } from 'react-hook-form'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const schema = z.object({
    name:z.string().min(3, {message:"name must be at least 3 charachters"}),
    age: z.number( {invalid_type_error:"Agefield is required"}).min(18, {message:"age must be at least 18"})
})
/* on line14: this returns a typescript type, which is similar to an interface. so using type we can deinfe a shape.

We need to instal hookform/resolvers library, which include resolvers 
for various schema-based validation-librarys like zod, yup, joi etc.
*/
type FormData = z.infer<typeof schema> 

const Form = () => {
    
    const {
        register, 
        handleSubmit, 
        formState: {errors}
        /*
        on line 19 we call the useForm-hook and pass the interface, 
        this securee automcomplete when writting errors on line 33 and 34
        */
    } =useForm<FormData>({resolver: zodResolver(schema)}) 

    const onSubmit = (data: FieldValues) => console.log(data)
    
  return (
      <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
          <label className="form-label" htmlFor='name' >Name</label>
          <input 
          {...register ("name", )} 
          id="name" 
          type="text" 
          className="form-control" />
         {errors.name && <p className='text-danger'>{errors.name.message}</p>}
       
      </div>

      <div className="mb-3"><label htmlFor="age" className="form-label">Age</label>
      <input 
      {...register("age", {valueAsNumber:true})} // saying to react this should be interpret as a number
         id="age" 
          type="number" 
          className="form-control" />
          {errors.age && <p className='text-danger'>{errors.age.message}</p>}
     
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>

      </form>
      
    
  )
}

export default Form