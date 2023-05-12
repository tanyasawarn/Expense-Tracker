import React, {useState} from "react";
import classes from "./expensetracker.module.css";

const ExpenseTracker = () =>{
  const [expense,setExpense] = useState([]);

  const addExpenseHandler = (event) =>{
  event.preventDefault();
  const expense = {
    id:Math.random().toString(),
    amount:event.target[0].value,
    description:event.target[1].value,
    category:event.target[2].value,
  };
  setExpense((prevState)=>[...prevState,expense]);
   
  };
  return (
    <section>
        <form className={classes.form} onSubmit={addExpenseHandler}>
            <label htmlFor="money">Money Spent: $ </label>
            <input type="number" required/>
            <label htmlFor="description">Description </label>
            <input type="text" required/>
            <label htmlFor="money">Category </label>
            <select>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="restaurant">Restaurant</option>
                <option value="others">Others</option>
            </select>
            <button>Add Expense</button>
        </form>
        <div key= {expense.id} className={classes.expense}>
        {expense.map((expense) => (
          <div key={expense.id}>
            <p>Amount: ${expense.amount}</p>
            <p>Description: {expense.description}</p>
            <p>Category: {expense.category}</p>
          </div>
        ))}
        </div>
    </section>
  );
};

export default ExpenseTracker;