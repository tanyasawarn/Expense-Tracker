import React, {useEffect, useState} from "react";
import classes from "./expensetracker.module.css";
 


const ExpenseTracker = () =>{
  const [expense,setExpense] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("food");
  const [editExpense, setEditExpense] = useState(null);


  useEffect(()=>{
    const fetchData = async () =>{
      const data = localStorage.getItem("expense");
      if(data){
        setExpense(JSON.parse(data));
      }
    };
    fetchData();
  },[]);

  const addExpenseHandler = (event) =>{
  event.preventDefault();
  const newExpense = {
    amount:+amount,
    description,
    category,
    timestamp:Date.now(),
  };
  const updatedExpense = [...expense, newExpense]
  localStorage.setItem("expense", JSON.stringify(updatedExpense));
  setExpense(updatedExpense);
  setAmount("");
  setDescription("");
  setCategory("Food");  
  };
 
  const deleteHandler = ()=>{
   
    localStorage.removeItem("expense");
    setExpense([]);

  }
   
const editHandler = (currentExpense)=>{
  
  setEditExpense(currentExpense);
  setAmount(currentExpense.amount);
  setDescription(currentExpense.description);
  setCategory(currentExpense.category);
};

const submitHandler = (event,expense) =>{
  event.preventDefault();
  const updatedExpense = expense.map((item)=>{
    if(item.timestamp === editExpense.timestamp){
      return{
        ...item,
        amount:+amount,
        description,
        category,
      };
    }
    return item;
  });
  localStorage.setItem("expense", JSON.stringify(updatedExpense));
  setExpense(updatedExpense);
  setAmount("");
  setDescription("");
  setCategory("Food");
  setEditExpense(null);
};

  return (
    <section>
        <form className={classes.form} onSubmit={(event) => editExpense ? submitHandler(event, expense) : addExpenseHandler(event)}>
            <label htmlFor="money">Money Spent: $ </label>
            <input type="number" required value={amount} onChange={(event)=>setAmount(event.target.value)}/>
            <label htmlFor="description">Description </label>
            <input type="text" required value={description} onChange={(event)=>setDescription(event.target.value)}/>
            <label htmlFor="money">Category </label>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="restaurant">Restaurant</option>
                <option value="others">Others</option>
            </select>
            <button>Add Expense</button>
        </form>
        <div key= {expense.id} className={classes.expense}>
        {expense.length > 0 && (
        <div key={expense.id} className={classes.expense}>
          {expense.map((expense) => (
            <div key={expense.timestamp}>
              <p>Amount: ${expense.amount}</p>
              <p>Description: {expense.description}</p>
              <p>Category: {expense.category}</p>
              <button onClick={() => editHandler(expense)} style={{marginBottom:".5rem"}}>Edit</button>
            </div>
          ))}
          <button onClick={deleteHandler}>Delete</button>
           
        </div>
      )}
      </div>
    </section>
  );
};

export default ExpenseTracker;