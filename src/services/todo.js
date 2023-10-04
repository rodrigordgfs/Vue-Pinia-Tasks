export default (httpClient) => ({
    getAll: async () => {
        const response = await httpClient.get('/todos')
        return {
            data: response.data
        }
    },

    insert: async (task) => {
        const response = await httpClient.post('/todos/add', task)
        return {
            data: response.data
        }
    },

    update: async (task) => {
        const response = await httpClient.patch(`/todos/${task.id}`, {
            completed: !task.completed
        })
        return {
            data: response.data
        }
    },

    delete: async (id) => {
        const response = await httpClient.delete(`/todos/${id}`)
        return {
            data: response.data
        }
    }
})