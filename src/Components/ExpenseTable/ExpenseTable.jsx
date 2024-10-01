import { useState } from "react"
import "./ExpenseTable.css"
import { MdModeEditOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

import { FaPizzaSlice, FaShoppingCart, FaPlane, FaUtensils ,FaFilm,FaShoppingBasket,FaEllipsisH} from 'react-icons/fa'; // Example imports
import Modal from "react-modal";

const ExpenseTable=({categories,expense,handleexpenseUpdate})=>{
    const categoryIcons={
       Food:<FaPizzaSlice/>,
        Grocery:<FaShoppingBasket/>,
        Travel:<FaPlane/>,
        Entertainment:<FaFilm/>,
        Shopping:<FaShoppingCart/>,
        Others:<FaEllipsisH/>
    }

    const modalStyle = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "500px",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "10px",
          border: "border: 1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: " 0 8px 12px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        },
      };
      const [isModalOpen, setIsModalOpen] = useState(false);
    const[edit,setEdit]=useState(false);
    const[remove,setRemove]=useState(false);
    const[expenseChange,setExpensechange]=useState({});
    const[currpage,setCurrpage]=useState(1);

    const expenseCount=3;
    const totalPageCount=Math.ceil(expense.length/expenseCount);
    const showedExpense=expense.slice((currpage-1)*expenseCount,currpage*expenseCount);
    const handleexpensexhange=(e)=>{
        const{name,value}=e.target;
        setExpensechange((prev)=>({...prev,[name]:value}));

    }
    const handleremove=(id)=>{
        const updatedExpense=expense.filter((data)=>data.id!=id);
        handleexpenseUpdate(updatedExpense);
    }
    const handleedit=(item)=>{
        setEdit(!edit)
        setExpensechange(item)
        setIsModalOpen(true)
    }

    const updateexpense=(e)=>{
        e.preventDefault();
        const index=expense.findIndex((data)=>data.id===expenseChange.id)
        const updatedExpense=[...expense]
        if(index!=-1)
        {
            updatedExpense[index]={
                ...updatedExpense[index],
                ...expenseChange
            }
        }
        handleexpenseUpdate(updatedExpense);
        setEdit(!edit);
        setIsModalOpen(false)

    }

    return(
        <div className="expense-conatiner">
         <div style={{display:"flex",justifyContent:"flex-start", color:"#FFFFFF"}}>
        <h2>Recent Transation</h2>
        </div>   
        <br/>
        <div  className="expense-table-container">
        {showedExpense.length > 0 && 
         showedExpense.map((item, idx) => (
            <div>
        <div key={idx} className="expense-row-container">
            <div className="expense-right-container">
                <div className="categoryicon">{categoryIcons[item.category]}</div>
            <div className="expense-right">
            <div>{item.title}</div>
            <div>{item.date}</div>
            </div>
            </div>
            <div className="expense-left-container">

                <div style={{color:"orange"}}>
                    {`₹${item.price}`}
                </div>
                    
                <div>
                <button className="deleteicon" style={{backgroundColor:"#FF3E3E"}} onClick={()=>handleremove(item.id)}><TiDeleteOutline style={{color:"white"}}/></button>
                
                </div>
                <div className="">
                <button className="editicon" style={{backgroundColor: "#F4BB4A"}} onClick={()=>handleedit(item)}><MdModeEditOutline style={{color:"white"}}/></button>
                </div>
                </div>
               
        </div>
        <hr/>
        </div>
        
    ))
}
   
    {/* <Pagination currpage={currpage} setCurrpage={setCurrpage} totalPageCount={totalPageCount}/> */}

    <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyle}
        contentLabel="Edit Expense"
      >
        {edit &&
             <form onSubmit={updateexpense} className="expenseform">
             <h2>Add New Expense</h2>
             <div>
             <input required type="text" placeholder="Title" name="title" value={expenseChange.title} onChange={(e)=>handleexpensexhange(e)}/>
             <input required type="text" placeholder="Price" name="price" value={expenseChange.price} onChange={(e)=>handleexpensexhange(e)}/>
             </div>
             <div>
             <select
             required
             name="category"
             onChange={(e)=>handleexpensexhange(e)}>
                 
                     {categories.map((category,idx)=>(
                         <option key={idx} value={category}>{category}</option>
                     ))}
                     
                
             </select>
             <input type="date" placeholder="date" name="date" value={expenseChange.date}required onChange={(e)=>handleexpensexhange(e)}/>
             </div>
             <div>
             <button type="submit" className="incomebtn">Add Expense</button>
             <button type="button" onClick={()=>setIsModalOpen(false)}>Cancel</button>
             </div>
         </form>   }
         </Modal>
        </div>
        </div>
    )
}
export default ExpenseTable