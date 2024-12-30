
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { DraftExpense, Value } from "../types"
import { ChangeEvent, useEffect, useState } from "react"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"
import { editExpense, saveExpense } from "../services/GastosService"


export default function ExpenseForm() {
    const [error, setError] = useState("")
    const [previousAmount, setPreviousAmount] = useState(0)
    const {state,dispatch, remainingBudget, fetchBudget} = useBudget();
    const initialState = {
        amount: 0,
        expense_name: "",
        category:-1,
        date: new Date(),
        is_paid:false,
        budget: state.currentBudgetId
    }
    const [expense, setExpense] = useState<DraftExpense>(initialState)

    useEffect(()=>{
        if(state.editingId !== -1){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> |  ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = e.target;
        // const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: name === 'amount' || name === 'category' ? Number(value) : value
        })
    }

    const handleChangeDate = (value: Value) =>{
        setExpense({
            ...expense,
            date: value
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(Object.values(expense).includes('')){
            setError("Todos los campos son obligatorios")
            return
        }
        if( (expense.amount - previousAmount) > remainingBudget){
            setError("Estas sobrepasando tu presupuesto")
            return
        }
        //agregar nuevo gasto
        if(state.editingId !== -1){
            
            try{ 
                await editExpense(expense, state.editingId)
                fetchBudget()
                dispatch({type:'close-modal'})
               
            } catch(error){
                setError(`Hubo un error al guardar el gasto ${error}`);
            }
            //traerme el gasto
            // dispatch({type: 'update-expense', payload:{expense: {...expense, id: state.editingId}}})
        } else {
            try{ 
                await saveExpense(expense, state.budget.id);
                fetchBudget()
                dispatch({type:'close-modal'})
            } catch(error){
                setError(`Hubo un error al guardar el gasto ${error}`);
            }
            
        }
        //reiniciar state
        setExpense(initialState)
        setPreviousAmount(0)
    }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2" 
        >
            {state.editingId !== -1 ? 'Guardar Cambios' : 'Nuevo Gasto'}</legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expense_name"
                className="text-xl"
            >
                Nombre Gasto:</label>
            <input 
                type="text"
                id="expense_name"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expense_name"
                onChange={handleChange}
                value={expense.expense_name}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Cantidad:</label>
            <input 
                type="number"
                id="amount"
                placeholder="Añade el monto del gasto. Ej 300"
                className="bg-slate-100 p-2"
                name="amount"
                onChange={handleChange}
                value={expense.amount}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            >
                Categoria:</label>
                <select 
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    onChange={handleChange}
                    value={expense.category}
                >
                    <option value="">-- Seleccione --</option>
                    {
                        state.categories.map(category =>(
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }   

            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="date"
                className="text-xl"
            >
               Fecha Gasto:</label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>
        <input 
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
        />
    </form>
  )
}
