import { Post, Get, Del, Patch } from "../utils/request"
export const getCity = async ()=>{
    const result = await Get(`city`);
    return result;
  }