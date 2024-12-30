import { Budget, Category, Expense } from "../types"

export type BudgetActions = 
    {type: 'add-budget', payload: {budget: Budget}} |
    {type: 'set-budget', payload: {budget: Budget}} |
    {type: 'set-expenses', payload: {expenses: Expense[]}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'close-modal-budget'} |
    {type: 'close-modal-msg'} |
    {type: 'add-expense', payload: {expense: Expense}} |
    {type: 'set-initial-data', payload: { expenses: Expense[],categories: Category[], budget:Budget}} |
    {type: 'remove-expense', payload: {id:Expense['id']}} |
    {type: 'get-expense-by-id', payload: {id:Expense['id']}} |
    // {type: 'set-editing-id', payload: {id:Expense['id']}} |
    {type: 'set-id-budget', payload: {id:Budget['id']}} |
    {type: 'update-expense', payload: {expense:Expense}} |
    {type: 'close-budget'} |
    {type: 'add-filter-category', payload:{id:Category['id']}} |
    {type: 'set-loading'}|
    {type: 'change-budget'}

export type BudgetState = {
    budget: Budget
    modal: boolean
    modalMsg:boolean
    modalBudget: boolean
    expenses:Expense[]
    categories:Category[],
    editingId: Expense['id']
    currentCategory: Category['id'],
    currentBudgetId: Budget['id']
    is_loading: boolean
}

const budgetInitial: Budget = {
    id:-1,
    name:"",
    initial_budget:0,
    start_date:new Date(), 
    is_active:false,
  
}
export const initialState: BudgetState = {
    budget: budgetInitial,
    modal: false,
    modalMsg:false,
    modalBudget: false,
    expenses: [],
    categories:[],
    editingId: -1,
    currentCategory:-1,
    currentBudgetId:-1,
    is_loading: true
}
// const createExpense= (draftExpense:DraftExpense) : Expense => {
//     return {
//         ...draftExpense,
//         id: uuidv4()
//     }
// }

export const budgetReducer : React.Reducer<BudgetState, BudgetActions>= (
    state:BudgetState = initialState,
    actions : BudgetActions
) =>{
    switch (actions.type) {
        case 'add-budget':
            return {
                ...state,
                budget: actions.payload.budget,
                modalBudget:false
            }
        case 'set-budget':
            return {
                ...state,
                budget: actions.payload.budget,
            }
        case 'set-expenses':
            return {
                ...state,
                expenses: actions.payload.expenses,
            }
        case 'show-modal':
            return {
                ...state,
                modal: true
            }
        case 'set-loading':
            return{
                ...state,
                is_loading:false
            }
        case 'close-modal':
            return {
                ...state,
                modal: false,
                editingId: -1
            }
        case 'close-modal-msg':
            return {
                ...state,
                modalMsg: false,
            }
        case 'close-modal-budget':
            return {
                ...state,
                modalBudget:false
            }
        case 'add-expense':
            return{
                ...state,
                expenses: [...state.expenses, actions.payload.expense],
                modal:false
            }
        case 'set-initial-data':
            return {
                ...state,
                expenses: actions.payload.expenses,
                categories: actions.payload.categories,
                budget: actions.payload.budget
            };
        case 'remove-expense': {
            const expenses = state.expenses.filter(exp => exp.id !== actions.payload.id)
            return{
                ...state,
                expenses: expenses
            }
        }
        case 'get-expense-by-id':
            return{
                ...state,
                editingId: actions.payload.id,
                modal:true
            }
        case 'set-id-budget':
            return{
                ...state,
                currentBudgetId: actions.payload.id,
            }
        case 'update-expense':
            return{
                ...state,
                expenses: state.expenses.map(expense => expense.id === actions.payload.expense.id
                    ? actions.payload.expense : expense
                ),
                modal:false,
                editingId: -1
            }
        case 'close-budget':
            return {
                ...state,
                modalMsg:true
            }
        case 'add-filter-category':
            return {
                ...state,
                currentCategory: actions.payload.id
            }
        case 'change-budget':
            return{
                ...state,
                modalBudget:true
            }
        default:
            return state

    }
}