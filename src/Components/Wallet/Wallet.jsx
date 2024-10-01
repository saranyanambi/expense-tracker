
import { useEffect,useState } from "react";
// import Modal from "react-modal";
import Model from "react-modal";
import "./Wallet.css";
import Piechart from "../Piechart/Piechart";
// import Piechart from "../PieChart/PieChart"
const Wallet=({categories,Balance,setBalance,expense,setExepense,handleexpenseUpdate})=>{
    console.log(expense)
    const model={
      content:{ 
         top:"50%",
        left:"40%",
        bottom:"auto",
        right:"auto",
        backgroundColor:"#FFFFFFC4",
        // maxWidth:"500px"
        borderRadius:"1rem"
      }



    }
    const[income,setincome]=useState("");
    const[newexpense,setNewexpense]=useState({
        title:"",
        category:"",
        id:"",
        price:"",
        date:"",
    })
    
    const[incomeform,setIncomeform]=useState(false);
    const[expenseform,setExpenseform]=useState(false);

    const handleincomechange=(e)=>{
        setincome(e.target.value);
    }

    const handleexpensexhange=(e)=>{
        const{name,value}=e.target;
        setNewexpense((prev)=>({...prev,[name]:value}));
        console.log(name,value)

    }

    const addincome=(e)=>{
        e.preventDefault();
        const newBalance = Balance + parseInt(income, 10);
        setBalance(newBalance);
        localStorage.setItem("Balance", newBalance);
        setIncomeform(!incomeform);
        setincome("");
        
    }

    const addexpense=(e)=>{
        e.preventDefault();
       
        newexpense.id=Date.now();

        let expensetoAdd={...newexpense,id:Date.now() }

        let updateExpense=[...expense,expensetoAdd];
       localStorage.setItem("Expense",JSON.stringify(updateExpense));
       handleexpenseUpdate(updateExpense);
    
        setExpenseform(!expenseform);
        setNewexpense({
            title:"",
            category:"",
            id:"",
            price:"",
            date:"",
        })

    }

    
    useEffect(()=>{
        if(!localStorage.getItem("Balance"))
        {
            localStorage.setItem("Balance","5000")
        }
      
    },[])

    return(
        <>
        <div style={{display:"flex",justifyContent:"flex-start", color:"#FFFFFF"}}>
        <h1>Expense Tracker</h1>
        </div>
        
        <div className="container">
            
            <div className="wallet-box-container">
                <div className="wallet-box">
                    <h1 className="head">Wallet Balance:<span style={{color:"#9DFF5B"}}>{Balance}</span></h1>
                    <button onClick={()=>setIncomeform(!incomeform)} className="addincome">+Add Income</button>
                </div>
                <div className="wallet-box">
                    <h1 className="head">Wallet Balance:<span>5000</span></h1>
                    <button onClick={()=>setExpenseform(!expenseform)} className="addexpense">+Add expense</button>
                </div>
                <Piechart expense={expense}/>
                
                </div>
                <div>
                    <Model
                    isOpen={incomeform}
                     onRequestClose={() => setIncomeform(false)} 
                     style={model}>  
                    {incomeform &&
                        <form onSubmit={addincome}>
                            <h2>Add New Income</h2>
                            <input
                            className="income-input btn"
                            required
                            name="income"
                            placeholder="income amount"
                            type="number"
                            onChange={(e)=>handleincomechange(e)}/>
                            <button type="submit" className="incomebtn">Add Income</button>
                            <button className="income-cancel" onClick={()=>setIncomeform(!incomeform)}>Cancel</button>
                        </form>
                    }
                    </Model>
                </div>
                <div>
                <Model isOpen={expenseform}
                     onRequestClose={() => setExpenseform(false)} 
                     style={model}>
                    {expenseform &&

                        <form onSubmit={addexpense} >
                            <h2>Add New Expense</h2>
                            <div>
                            <input required type="text" placeholder="Title" name="title" onChange={(e)=>handleexpensexhange(e)} className="btn"/>
                            <input required type="text" placeholder="Price" name="price" onChange={(e)=>handleexpensexhange(e)}  className="btn"/>
                            </div>
                            <div>
                            <select
                            required
                            name="category"
                             className="btn"
                            onChange={handleexpensexhange}>
                                <option value={""}>select a Category</option>
                                    {categories.map((category,idx)=>(
                                        <option key={idx} value={category}>{category}</option>
                                    ))}
                                    
                               
                            </select>
                            <input type="date" placeholder="date" name="date" required onChange={(e)=>handleexpensexhange(e)}  className="btn"/>
                            </div>
                            <div>
                            <button type="submit" className="incomebtn">Add Expense</button>
                            <button type="button" onClick={()=>setExpenseform(!expenseform)}  className="btn">Cancel</button>
                            </div>
                        </form>
                    }
                    </Model>
                </div>

           
        </div>
        </>
    )
}
export default Wallet;