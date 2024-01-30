import axios from "axios";
import { buildWebStorage, setupCache } from "axios-cache-interceptor";


const $host = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
})

// const $host = setupCache(baseAxios, { storage: buildWebStorage(localStorage, 'axios-cache:')})

export {$host}