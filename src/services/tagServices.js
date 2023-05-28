
import { Post, Get, Del, Patch } from "../utils/request"

export const getTags = async ()=>{
  const result = await Get(`tags`);
  return result;
}
