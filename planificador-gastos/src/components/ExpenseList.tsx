import {useMemo} from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";



export default function ExpenseList() {
    // const [error, setError] = useState("")
    const {state} = useBudget()

    const filteredExpenses = useMemo(() => {

        return state.currentCategory !== null && state.currentCategory !== undefined && state.currentCategory !== -1
          ? state.expenses.filter((exp) => exp.category === state.currentCategory)
          : state.expenses;
      }, [state.currentCategory, state.expenses]);
        
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
  return (
    
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p>
        :(
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                {filteredExpenses.map( expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            </>
        )}
        
    </div>
  )
}
