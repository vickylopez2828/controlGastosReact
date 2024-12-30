import { useMemo } from "react"
import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions 
} from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"
import { deleteExpense } from "../services/GastosService"



type ExpenseDetailProps = {
    expense : Expense
}
//consultar categroias
export default function ExpenseDetail({expense}: ExpenseDetailProps) {
    const {state,dispatch,fetchBudget } = useBudget();

    const removeExpense = async () => {
          try{ 
            
            await deleteExpense(expense.id)
            fetchBudget()
            dispatch({type:'remove-expense', payload:{id :expense.id}})
        } catch(error){
            console.log(`Hubo un error al eliminar el gasto ${error}`);
        }
        
    }
   
    // const categoryInfo = useMemo(() => state.categories.filter(cat => cat.id === expense.category)[0] , [state.categories])
    const categoryInfo = useMemo(
        () => state.categories.find((cat) => cat.id === expense.category) || null,
        [state.categories, expense.category]
    );
    const leadingActions = () =>(
        <LeadingActions>
            <SwipeAction
                onClick={()=>{dispatch({type:'get-expense-by-id', payload:{id :expense.id}})}}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () =>(
        <TrailingActions>
            <SwipeAction
                onClick={()=>{removeExpense()}}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
  
    return (
        
    <SwipeableList>
        
        <SwipeableListItem
            maxSwipe={30}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                {/* <div className="">
                    <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gasto" className="w-20" />

                </div> */}
                
                {categoryInfo?.icon && (
                   
                        <div>
                            <img
                                src={`${categoryInfo.icon}`}
                                alt={`Icono ${categoryInfo.name}`}
                                className="w-20"
                            />
                        </div>
                )}
                <div className="flex-1 space-y-2">
                    <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name || "Categoría desconocida"}</p>
                    <p>{expense.expense_name}</p>
                    <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                </div>
                <AmountDisplay
                    amount={expense.amount}
                />
            </div> 
        </SwipeableListItem>
          
    </SwipeableList>
    
  )
}


