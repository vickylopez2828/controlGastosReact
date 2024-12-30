import { Value } from "../types";

export function formatCurrency(amount:number){
    return new Intl.NumberFormat('en-US', {style:'currency', currency: 'USD'}).format(amount)
}

export function formatDate(dateStr: string) : string {
    const dateObj = new Date(dateStr + 'T00:00:00')
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}

export const formatDateForBackend = (value: Value): string | null => {
    if (value instanceof Date) {
        return value.toISOString().split('T')[0]; // Convierte a 'YYYY-MM-DD'
    }
    if (Array.isArray(value)) {
        // Si es un rango de fechas, toma la primera fecha del rango
        const [start] = value;
        return start ? start.toISOString().split('T')[0] : null;
    }
    return null; // Si es null, retorna null
};