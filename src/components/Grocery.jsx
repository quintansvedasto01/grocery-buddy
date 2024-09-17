import { useState, useRef } from 'react'
import GroceryItem from './GroceryItem'
import { FaShoppingCart, FaShoppingBasket  } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const Grocery = () => {
  const item = useRef()

  const [groceries, setGroceries] = useState([])
  const [error, setError] = useState("")

  const handleAdditem = () => {
    if(item.current.value === '') {
      setError("Please add an item first.")
      return
    }
    setGroceries([
      ...groceries, 
      {
        id: uuidv4(), 
        name: item.current.value
      }
    ])
    setError("")
    item.current.value = ''
  }

  const handleEditItem = (id, newItem) => {
    const updatedGrocery = groceries.map((item) => {
      if(item.id === id) {
        return {...item, name: newItem}
      }
      return item
    })
    console.log(updatedGrocery);
    
    setGroceries(updatedGrocery)
  }

  const handleDeleteItem = (id) => {
    setGroceries(groceries.filter((item) => item.id !== id))
  }
  

  return (
    <div className="container">
        <h1>
          <FaShoppingBasket  style={{ color: 'rgb(25, 170, 25)'}}/>
        </h1>
        <div className='input-area'>
          <input ref={item} type="text" placeholder="Enter Grocery Item" onKeyDown={(e) => e.key === 'Enter' && handleAdditem()} className={error ? 'input-error' : ''}/>
          <button onClick={handleAdditem} className='add-btn'><FaShoppingCart/></button>
          {error && <p className='error'>{error}</p>}
        </div>
        <div className='grocery-list'>
          {groceries.map((item) => (
            <GroceryItem key={item.id} item={item} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem}/>
          ))}
        </div>
    </div>
  )
}

export default Grocery