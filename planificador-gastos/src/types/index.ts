export type Expense ={
    id: number
    expense_name: string
    amount: number
    category: number
    date: Value
    is_paid:boolean
    budget: number
}

export type DraftExpense = Omit<Expense, 'id'>

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
    id: number
    name: string
    icon: string
}

export type Budget = {
    id: number
    name: string
    initial_budget: number
    start_date: Value
    end_date?:Value
    is_active:boolean
}

export type DraftBudget = Omit<Budget, 'id'>