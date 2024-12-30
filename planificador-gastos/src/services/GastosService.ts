import axios from "axios";
import { Budget, DraftExpense, Expense } from "../types";
import { formatDateForBackend } from "../helpers";
import { string } from "prop-types";

// const URL = "https://apigastos.onrender.com"
const URL = "http://localhost:8000"
export  async function getGastos() {
    try {
        const response = await axios.get(`${URL}/api/gastos/`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export  async function getGastosPorPrepuesto(id:Budget['id']) {
    try {
        const response = await axios.get(`${URL}/api/gastos/gastos-por-presupuesto/?presupuesto_id=${id}`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


export const saveExpense = async (expense: DraftExpense, id:Budget['id']): Promise<Expense> => {
    try{
        const formattedExpense = {
            ...expense,
            budget: id,
            date: formatDateForBackend(expense.date),
           
        };
        const response = await axios.post(`${URL}/api/gastos/`, formattedExpense, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch(error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error del backend:', error.response.data);
            throw new Error(error.response.data.message || 'Error al guardar el gasto');
        }
        console.error('Error desconocido:', error);
        throw new Error('Error desconocido al guardar el gasto');
    }
    
};

export const editExpense = async (expense: DraftExpense, id:Expense['id']): Promise<Expense> => {
    console.log(typeof expense.date) 
    
    try{
        let formattedExpense = {}
        if (typeof expense.date !== "string"){
            formattedExpense = {
                ...expense,
                date: formatDateForBackend(expense.date)
            };
        } else{
            formattedExpense = {
                ...expense
            }
        }
        
        const response = await axios.put(`${URL}/api/gastos/${id}/`, formattedExpense, {
             headers: {
                 'Content-Type': 'application/json',
             },
         });
 
         return response.data;
     } catch(error) {
         if (axios.isAxiosError(error) && error.response) {
             console.error('Error del backend:', error.response.data);
             throw new Error(error.response.data.message || 'Error al editar el gasto');
         }
         console.error('Error desconocido:', error);
         throw new Error('Error desconocido al editar el gasto');
     }
     
};

export const deleteExpense = async (id:Expense['id']): Promise<Expense> =>  {
    
    try{
      
        const response = await axios.delete(`${URL}/api/gastos/${id}/`);
 
         return response.data;
     } catch(error) {
         if (axios.isAxiosError(error) && error.response) {
             console.error('Error del backend:', error.response.data);
             throw new Error(error.response.data.message || 'Error al eliminar el gasto');
         }
         console.error('Error desconocido:', error);
         throw new Error('Error desconocido al eliminar el gasto');
     }
     
};

