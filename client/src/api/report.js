import API from "./index";

export const fetchAllReportUser = () => API.get(`/report/user/list/all`);

export const createReport = (report) => API.post(`/report/create`, report);

export const acceptReport = (idReport) => API.put(`/report/${idReport}/accept`);

export const denyReport = (idReport) => API.put(`/report/${idReport}/deny`);
