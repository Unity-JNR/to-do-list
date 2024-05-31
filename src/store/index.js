import { createStore } from 'vuex'
import axios from 'axios'
const users = 'https://to-do-list-5sqk.onrender.com/users'
const login ='https://to-do-list-5sqk.onrender.com/login'
const web = 'https://to-do-list-5sqk.onrender.com/tasks'
const log = 'https://to-do-list-5sqk.onrender.com/logout'
axios.defaults.withCredentials = true

export default createStore({
  state: {
    loginIn:false,
    Task: [],
    singleuser: []
  },
  getters: {
  },
  mutations: {
    setLogged(state,value){
      state.loginIn = value
    },
    setTask(state,value){
      state.Task = value
    },
    setuser(state,value){
      state.singleuser = value
    }

    
  },
  actions: {
    async log_in({commit},user){
      let {data} = await axios.post(login,user)
      console.log(data);
      if (data.token !== undefined) {
        $cookies.set('jwt',data.token)
        let [{userRole}]=data.user
        $cookies.set('userRole',userRole)
        let [user] =data.user
        $cookies.set('user',user)
        let [{user_id}] = data.user
        $cookies.set('user_id',user_id)
        console.log($cookies);
        // await router.push('/')
      } else {
        $cookies.remove('jwt')
        $cookies.remove('user')
        $cookies.remove('userRole')
        $cookies.remove('user_id')
      }
      commit('setLogged')
    },
    async logout(){
      let {data} = await axios.delete(log)
      console.log(data);
      $cookies.remove('jwt')
      $cookies.remove('user')
      $cookies.remove('userRole')
      $cookies.remove('user_id')
  
    },
    async signup({commit},user){
      let {data} = await axios.post(users,user)
      console.log(data);
      alert(data.msg)
    },
    async getTask({commit},id){
      let {data} = await axios.get(web + '/' + id)
      console.log(data);
      commit('setTask',data)
    },
    async addTask({commit},payload){
      let {data} = await axios.post(`${web}?user=${payload.user_id}`,payload)
      console.log(data);
      },
      async deleteTask({commit},id){
        let {data} = await axios.delete(web + '/' + id)
        console.log(data);
      },
      async updateTask({commit},update){
        let {data} = await axios.patch(web+'/'+ update.id,update)
        console.log(data);

      },
      async getuser({commit},id){
        let {data} = await axios.get(users + '/' + id)
        console.log(data);
        commit('setuser',data)
             },
             async deleteuser({commit},id){
              let {data} = await axios.delete(users + '/' + id)
              console.log(data);
            },
            async updateuser({commit},update){
              let {data} = await axios.patch(users+'/'+ update.id,update)
              console.log(data);
            }
  },
  modules: {
  }
})
