import ExpenseList from './expense-tracker/components/ExpenseList';
import { useState } from 'react';

function App(){
  const [expenses, setExpenses] = useState([
    {id:1, description:"aaa", amount:10, category: "utilities"},
    {id:2, description:"bbb", amount:10, category: "utilities"},
    {id:3, description:"ccc", amount:10, category: "utilities"},
    {id:4, description:"ddd", amount:10, category: "utilities"},
  ])




  return (
    <div>
     <ExpenseList expenses={expenses} onDelete={(id)=> setExpenses(expenses.filter(e => e.id!==id ))}/>  {/* getting all the expenses except the one with the given id */}
    </div>
 
  )
}

export default App;