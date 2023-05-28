
import { Post, Get, Del, Patch } from "../utils/request"

export const getUser = async (email="",password="")=>{
  const result = await Get(`company?email=${email}&password=${password}`);
  return result;
}
export const checkEmail = async (email="")=>{
  const result = await Get(`company?email=${email}`);
  return result;
}
export const getCompany = async ()=>{
  const result = await Get(`company`);
  return result;
}
export const getCompanyById = async (idCompany="")=>{
  
  const result = await Get(`company?id=${idCompany}`);
  return result;
}
export const editInfoCompanyById = async (id,option={})=>{

  const result = await Patch(`company/${id}`,option);
  return result;
}