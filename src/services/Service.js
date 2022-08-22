import http from '../http-common';

const token = process.env.REACT_APP_TOKEN;
const headers = { headers: { 'Authorization': token } };
console.log(headers);

const getAll = () => {
  return http.get('/customers', headers);
};

const get = (id) => {
  return http.get(`/customers/${id}`, headers);
};

const create = (data) => {
  return http.post('/customers', data, headers);
};

const update = (id, data) => {
  return http.put(`/customers/${id}`, data, headers);
};

const remove = (id) => {
  return http.delete(`/customers/${id}`, headers);
};

const removeAll = () => {
  return http.delete(``);
};

const findByName = (name) => {
  return http.get(`/customers?name=${name}`, headers);
};

const DataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};

export default DataService;
