import { Post, Get, Del, Patch } from "../utils/request";

export const getJobs = async () => {
  const result = await Get(`jobs`);
  return result;
};
export const getJobsByIdCompany = async (idCompany = "") => {
  const result = await Get(`jobs?idCompany=${idCompany}`);
  return result;
};
export const getJobsById = async (idCompany = "") => {
  const result = await Get(`jobs?id=${idCompany}`);
  return result;
};
export const createJobs = async (options = {}) => {
  const result = await Post("jobs", options);
  return result;
};
export const deleteJobs = async (id) => {
  const result = await Del(`jobs/${id}`);
  return result;
};
export const updateJobs = async (id, options) => {
  const result = await Patch(`jobs/${id}`, options);
  return result;
};
export const searchJobs = async (city = "", keyword = "") => {
  if (city !== "" || keyword !== "") {
    return await Get(`jobs?tags_like=${city}&city_like=${keyword}`);
  }

  return await Get(`jobs`);
};
