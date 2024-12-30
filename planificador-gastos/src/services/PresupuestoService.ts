import axios from "axios";
import { Budget, DraftBudget } from "../types";
import { formatDateForBackend } from "../helpers";
const URL = "http://localhost:8000"
// const URL = "https://apigastos.onrender.com"
export const saveBudget = async (budget: DraftBudget): Promise<Budget> => {
   
    try{
        const formattedBudget = {
            ...budget,
            start_date: formatDateForBackend(budget.start_date),
            end_date: budget.end_date ? formatDateForBackend(budget.end_date) : undefined,
            is_active:true
        };
        const response = await axios.post(`${URL}/api/presupuestos/`, formattedBudget, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch(error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error del backend:', error.response.data);
            throw new Error(error.response.data.message || 'Error al guardar el presupuesto');
        }
        console.error('Error desconocido:', error);
        throw new Error('Error desconocido al guardar el presupuesto');
    }
    
};


export  async function getBudget() : Promise<Budget | undefined> {
    try {
        const response = await axios.get(`${URL}/api/presupuestos/active/`);
        return response.data; 
    } catch (error) {
        console.info("No hay presupuestos activos:", error);
    }
};


export const editBudget = async (budget: DraftBudget, id:Budget['id']): Promise<Budget> => {
    try{
        let formattedBudget = {}
        if (typeof budget.start_date !== "string"){
            formattedBudget = {
                ...budget,
                start_date: formatDateForBackend(budget.start_date),
            };
        } else{
            formattedBudget = {
                ...budget
            }
        }
        
        const response = await axios.put(`${URL}/api/presupuestos/${id}/`, formattedBudget, {
             headers: {
                 'Content-Type': 'application/json',
             },
         });
 
         return response.data;
     } catch(error) {
         if (axios.isAxiosError(error) && error.response) {
             console.error('Error del backend:', error.response.data);
             throw new Error(error.response.data.message || 'Error al editar el presupuesto');
         }
         console.error('Error desconocido:', error);
         throw new Error('Error desconocido al editar el presupuesto');
     }
     
};


export const clearBudget = async (id:Budget['id']): Promise<Budget> => {
    try{
        const response = await axios.put(`${URL}/api/presupuestos/close/`, { presupuesto_id: id }, {
             headers: {
                 'Content-Type': 'application/json',
             },
         });
 
         return response.data;
     } catch(error) {
         if (axios.isAxiosError(error) && error.response) {
             console.error('Error del backend:', error.response.data);
             throw new Error(error.response.data.message || 'Error al cerrar el presupuesto');
         }
         console.error('Error desconocido:', error);
         throw new Error('Error desconocido al cerrar el presupuesto');
     }
     
};