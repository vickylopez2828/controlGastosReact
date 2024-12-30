import { useEffect, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget";
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { DraftBudget, Value } from "../types";
import { editBudget, saveBudget } from "../services/PresupuestoService";


function BudgetForm() {
    
    const { state,dispatch, totalExpenses, fetchBudget} = useBudget();
    const [error, setError] = useState("")
    const initialBudget = {
        name:'',
        initial_budget:0,
        start_date:new Date(),
        is_active:false
    }
    const [budget, setBudget] = useState<DraftBudget>(initialBudget);
    
    useEffect(()=>{
        console.log(state.budget.id)
        if(state.budget.id !== -1){
            setBudget(state.budget)
        }
    }, [state.budget])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value, valueAsNumber } = e.target;
            setBudget({
                ...budget,
                [name]: name === 'initial_budget' ? valueAsNumber : value,
        });
        console.log(budget)
        // setBudget(e.target.valueAsNumber)
    }
    const isValid =  useMemo(() => {
        return isNaN(budget.initial_budget) || budget.initial_budget <= 0 || budget.name === ""
    }, [budget])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentBudget = { ...budget };
        if(state.budget.id !== -1){
            try {
                await editBudget(currentBudget, state.budget.id);
                if(budget.initial_budget < totalExpenses){
                    setError("El presupuesto asignado es menor al total de gastos acumulados")
                    return
                }
                fetchBudget()
                dispatch({ type: 'close-modal-budget' });
            } catch (error) {
                setError(`Hubo un error al editar el presupuesto ${error}`);
            }
        } else {
            try {
                await saveBudget(budget);
                if(budget.initial_budget < totalExpenses){
                    setError("El presupuesto asignado es menor al total de gastos acumulados")
                    return
                }
                // dispatch({ type: 'add-budget', payload: { budget: savedBudget } });
                // dispatch({type: 'set-id-budget',payload:{id: savedBudget.id} })
                fetchBudget()
                dispatch({ type: 'close-modal-budget' });
            } catch (error) {
                setError(`Hubo un error al guardar el presupuesto ${error}`);
            }
        }
        setBudget(initialBudget)
        
    };
  
    const handleChangeDate = (value: Value) =>{
        setBudget({...budget, start_date:value})
    }
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {/* <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-slate-800 font-bold text-center">
                Definir Presupuesto
            </label>
             
            <input 
                type="number"
                className="w-full bg-white border bordger-gray-200 p-2"
                placeholder="Define su presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
            /> 
        </div>*/}
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="name"
                className="text-xl"
            >
                Nombre Presupuesto:</label>
            <input 
                type="text"
                id="name"
                placeholder="Añade el nombre del presupuesto"
                className="bg-slate-100 p-2"
                name="name"
                onChange={handleChange}
                value={budget.name}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="start_date"
                className="text-xl"
            >
                Fecha Inicio Presupuesto:</label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0"
                value={budget.start_date}
                onChange={handleChangeDate}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="initial_budget"
                className="text-xl"
            >
                Presupuesto Inicial:</label>
            <input 
                type="number"
                id="initial_budget"
                placeholder="Añade el monto inicial del presupuesto. Ej 300"
                className="bg-slate-100 p-2"
                name="initial_budget"
                onChange={handleChange}
                value={budget.initial_budget}
            />
        </div>
        <input 
            type="submit" 
            value= "Definir Presupuesto"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
            disabled = {isValid}
        />
        
    </form>
    
  )
}

export default BudgetForm
