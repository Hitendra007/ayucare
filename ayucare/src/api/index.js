import axios from 'axios';


const API = axios.create({baseURL:"https://ayucare-hitendra007s-projects.vercel.app/"})


export const getMedicines = (data)=>  API.post("/medicine", data)
export const getPharmacologicalProperties = (data)=> API.get(`/medicine/properties?name=${data}`)