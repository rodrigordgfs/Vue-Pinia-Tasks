import axios from 'axios'
import TodoService from './todo'

const httpClient = axios.create({
    baseURL: 'https://dummyjson.com'
})

export default {
    todo: TodoService(httpClient)
}