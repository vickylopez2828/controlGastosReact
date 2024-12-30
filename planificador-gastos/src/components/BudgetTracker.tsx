import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {
    const {state, dispatch, totalExpenses, remainingBudget} = useBudget()
    
    const percentage = +((totalExpenses/state.budget.initial_budget)*100).toFixed(2)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100 ? '#DC2626' :'#3b82f6',
                    trailColor:'#f5f5f5',
                    textSize:8,
                    textColor: percentage === 100 ? '#DC2626' :'#3b82f6'
                })}
                text={`${percentage}% Gastado`}
            />
        </div>
        <div className=" flex flex-col justify-center items-center gap-8">
            <button
                type="button"
                onClick={()=>{dispatch ({type:'change-budget'})}}
                className="bg-slate-800 hover:bg-slate-950 w-full p-2 text-white uppercase font-bold rounded-lg"
            >
                Cambiar Presupuesto
            </button>
            <button
                type="button"
                onClick={()=>{dispatch ({type:'close-budget'})}}
                className="bg-pink-600 hover:bg-pink-700 w-full p-2 text-white uppercase font-bold rounded-lg"
            >
                Cerrar Presupuesto
            </button>
            <AmountDisplay
                label="Presupuesto"
                amount={state.budget.initial_budget}
            />
            <AmountDisplay
                label="Disponible"
                amount={remainingBudget}
            />
            <AmountDisplay
                label="Gastado"
                amount={totalExpenses}
            />
        </div>

    </div>
  )
}
