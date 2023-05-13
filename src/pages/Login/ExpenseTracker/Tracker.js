import React, {useEffect, useState} from "react";
import classes from "./expensetracker.module.css";
import axios from "axios";


const ExpenseTracker = () =>{
  const [expense,setExpense] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("food");
  const [editExpense, setEditExpense] = useState(null);


  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get('https://react-http-d874d-default-rtdb.firebaseio.com/expense.json');
        if(response.data){
          const loadedExpense = Object.keys(response.data).map(key=>({
            id:key,
            ...response.data[key]
          }));
          setExpense(loadedExpense);
        
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchData();
  },[]);

  const addExpenseHandler = async (event) =>{
  event.preventDefault();
  const newExpense = {
    amount:+amount,
    description,
    category,
    timestamp:Date.now(),
  };
  try {
    const response = await axios.post('https://react-http-d874d-default-rtdb.firebaseio.com/expense.json', newExpense);
    const updatedExpense = [...expense, {
      id: response.data.name,
      ...newExpense
    }];
    setExpense(updatedExpense);
    setAmount("");
    setDescription("");
    setCategory("Food");  
  } catch (error) {
    console.log(error);
  } 
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

const submitHandler =async (event,expense) =>{
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
  try{
     await axios.put(`https://react-http-d874d-default-rtdb.firebaseio.com/expense/${editExpense.id}.json`,{

     amount:+amount,
     description,
     category,
     })
     setExpense(updatedExpense);
     setAmount("");
     setDescription("");
     setCategory("Food");
     setEditExpense(null);
  }catch(error){
    console.log(error);
  }
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
