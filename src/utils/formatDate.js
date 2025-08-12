

export function formatDate(date){
    return new Date(date).toLocaleString('pt-BR',{
        month: 'short',
        day:'2-digit',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit'
    })
}