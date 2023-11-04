import axios from 'axios';


const API = axios.create({baseURL:"http://localhost:5000"})


export const getMedicines = (data)=>  API.post("/medicine", data)
export const getPharmacologicalProperties = (data)=> API.get(`/medicine/properties?name=${data}`)