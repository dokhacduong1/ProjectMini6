import { Post, Get, Del, Patch } from "../utils/request"

export const getCv = async ()=>{
  const result = await Get(`cv`);
  return result;
}
export const getCvByIdCompany = async (idCompany="")=>{
  const result = await Get(`cv?idCompany=${idCompany}`);
  return result;
}
export const deleteCv = async(id)=>{
  const result = await Del(`cv/${id}`);
  return result;
}
export const checkReadStatusCv= async (id)=>{
  const result = await Get(`cv?id=${id}&statusRead=true`);
  return result;
}

export const viewedCv = async (id,option={})=>{
  const result = await Patch(`cv/${id}`,option);
  return result;
}
export const applyCv = async (option={})=>{
  const result = await Post(`cv`,option);
  return result;
}