import { useState, useReducer } from "react"
const AdminForm = () => {
    const [isFormLogin, setIsFormLogin] = useState()
    const [reducer, dispatch] =useReducer()
  return (
    <div>
        <form action="">
            <p>
            <label htmlFor="">Email:</label>
            <input type="text" name="" id="" />
            </p>
            <p>
            <label htmlFor="">Password:</label>
            <input type="text" name="" id="" />
            </p>
        </form>
    </div>
  )
}
export default AdminForm