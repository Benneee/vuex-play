// import axios from 'axios'

import axios from "axios"

const state = {
  todos : []
}

// In order for us to get the todos gotten from the API interaction above,
// we can create a getter
const getters = {
  allTodos: (state) => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    // console.log('data: ', response.data)

    /**
     * 1st argument: the mutation we want to use,
     * 2nd argument: the data we want to pass to the mutation object
     */
    commit('setTodos', response.data)
  },

  async addTodo({ commit }, title) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title, completed: false
    })

    commit('newTodo', response.data)
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    commit('removeTodo', id)
  },

  async filterTodos({ commit }, e) {
    const response =  await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${e}`)

    commit('setTodos', response.data)
  },

  async updateTodo({ commit }, updatedTodo) {
    const response =  await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo)

    commit('updateTodo', response.data)
  }

}

  // To update the mutation, we do not call the object directly,
  // we 'commit' into it
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex(todo => todo.id == updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo)
    }
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
