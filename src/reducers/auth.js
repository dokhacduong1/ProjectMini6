
const authReducer = (state =false,action)=>{
   if(action.type === "CHECK_AUTH"){
      return action.status;
   }else{
      return state;
   }
   
}
export default authReducer