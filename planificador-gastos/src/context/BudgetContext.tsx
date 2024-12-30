import { createContext, Dispatch, ReactNode, useEffect, useMemo, useReducer} from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState,  } from "../reducers/budget-reducer"
import { Expense } from "../types"
import { getBudget } from "../services/PresupuestoService"
import { getGastosPorPrepuesto } from "../services/GastosService"
import { getCategorias } from "../services/CategoriaService"

type BudgetContextProps ={
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
    fetchBudget: () => Promise<void>
}

type BudgetProviderProps = {
    children: ReactNode
}


export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {
    // const [state, dispatch] = useReducer(budgetReducer, initialState)
    const [state, dispatch] = useReducer(budgetReducer, initialState)
  

    //veerrr de separar funciones
    // const getGastos()= async () => {
    //     try {
    //         const expenses = await  Promise.all([getGastosPorPrepuesto(budget.id), getCategorias()]);
    //         dispatch({ type: 'set-expenses', payload: { expenses} });
    //     } catch (error) {
    //         //   setError("Error al cargar los gastos...")
    //         console.error("Error fetching expenses:", error);
    //     }
    // }

    const fetchBudget = async () => {
        const budget = await getBudget();
       
        if (budget) { 
            try {
                const [expenses, categories] = await  Promise.all([getGastosPorPrepuesto(budget.id), getCategorias()]);
                dispatch({ type: 'set-initial-data', payload: { expenses, categories, budget } });
                dispatch({type: 'set-loading'})
            
            } catch (error) {
                //   setError("Error al cargar los gastos...")
                console.error("Error fetching:", error);
            }
        } else {
            dispatch({type: 'set-loading'})
        }
    };
    
    useEffect(() => {
        fetchBudget();
    }, []);

    const totalExpenses = useMemo(()=> 
        //toma el total y obj actual => ejecuta calculo, valor inicial
        state.expenses.reduce((total:number, expense:Expense)=> expense.amount + total, 0), 
        [state.expenses])
    
    const remainingBudget = state.budget.initial_budget 
        ? state.budget.initial_budget - totalExpenses 
        : 0;
    
    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget,
                fetchBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
        )
}

