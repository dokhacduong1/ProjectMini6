export const auth = (status)=>{
    return{
        type:"CHECK_AUTH",
        status:status
    }
}