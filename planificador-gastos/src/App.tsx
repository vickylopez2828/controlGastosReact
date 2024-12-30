import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import { useBudget } from "./hooks/useBudget"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"
import BudgetModal from "./components/BudgetModal"
import ReactLoading from 'react-loading';
import MessageModal from "./components/MessageModal"

function App() {
  const {state} = useBudget()
  // const isValidBudget = useMemo(() => state.budget.initial_budget > 0 , [state.budget.initial_budget])
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white" >
          Planificador de Gastos
        </h1>
      </header>
        {state.is_loading
          ? 
            <>
              <div className="flex items-center justify-center min-h-screen">
                <ReactLoading className="mx-auto" type={"bars"} color={"#362AD2"} height={100} width={100} />
              </div>
            </>
          : state.budget.is_active 
            ? 
            <>
              <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
                <BudgetTracker/> 
                <main className="max-w-3xl mx-auto py-10">
                  <FilterByCategory/>
                  <ExpenseList/>
                  <BudgetModal/>
                  <ExpenseModal/>
                  <MessageModal/>
                </main>
              </div>
            </>
            : 
              <>
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
                  <BudgetForm/>
                </div>
              </>

        }
        
        
      
      
    </>
    
  )
}

export default App
