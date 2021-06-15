import API from "./index";

export const fetchAllReportUser = () => API.get(`/reportUser/getAll`);

export const createReportUser = (report) =>
  API.post(`/reportUser/create`, report);

export const acceptReportUser = (idReport) =>
  API.put(`/reportUser/${idReport}/accept`);

export const denyReportUser = (idReport) =>
  API.put(`/reportUser/${idReport}/deny`);
