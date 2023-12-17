// category page  

import React from 'react'
import { addCategory } from '../../api/categoriesApi'

const Categories = () => {

    const handelAddCategoty = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const form = e.currentTarget
            const category :string = form.category.value
            debugger
            const data = await addCategory(category);
            if (data) {
                alert('Category Added')
            }
            else {
                alert('Category Not Added')
            }
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
      <h1>Categories page</h1>
      <form className='categoriesForm' onSubmit={handelAddCategoty}>
        <label htmlFor='category'>Category</label>
        <input type='text' name='category' id='category' />
        <button type='submit'>Add Category</button>
        </form>
    </div>
  
  )
}

export default Categories
