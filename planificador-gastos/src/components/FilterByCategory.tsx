import { ChangeEvent } from "react";

import { useBudget } from "../hooks/useBudget";


export default function FilterByCategory() {
  const {state, dispatch} = useBudget()
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
    const selectedCategoryId = parseInt(e.target.value, 10);
    dispatch({type: 'add-filter-category', payload:{id:selectedCategoryId}})
    
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category">Filtrar Gastos</label>
                <select
                  id="category"
                  className="bg-slate-100 p-3 flex-1 rounded"
                  onChange={handleChange}
                >
                  <option value={-1}>-- Todas las categorías --</option>
                  {
                    state.categories.map(category =>(
                      <option
                        value={category.id}
                        key={category.id}
                      >
                        {category.name}
                      </option>
                    ))
                  }
                </select>
            </div>
        </form>
    </div>
  )
}

