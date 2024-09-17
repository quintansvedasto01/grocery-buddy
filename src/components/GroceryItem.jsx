import { useState } from 'react'
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";

const GroceryItem = ({ item, handleEditItem, handleDeleteItem }) => {

  const [newItem, setNewItem] = useState(item.name)
  const [isEdit, setIsEdit] = useState(false)
  const [error, setError] = useState("")

  const onEdit = () => {
    if(newItem){
      handleEditItem(item.id, newItem)
      setIsEdit(false)
      setError("")
    } else {
      setError("Please add an item first.")
    }
  }


  return (
    <div className='grocery-item'>
      {isEdit 
        ? <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onEdit()}/> 
        : <span>{item.name}</span>
      }
      <div className='grocery-action'>
        <button 
          onClick={() => { 
            isEdit 
              ? onEdit() 
              : setIsEdit(true)
          }} 
          className={isEdit ? 'save-btn' : 'edit-btn'}
        >
          {isEdit ? <FaCheckCircle/> : <FaEdit/>}
        </button>
        <button onClick={() => handleDeleteItem(item.id)} className='delete-btn'>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  )
}

export default GroceryItem