

export default {

    namespaced   : true,

    state:{
        array   : []
    },

    getters:{
        doGetter( state , getters , rootState , rootGetters ) {
    
            return 2
        }
    },
    
    mutations: {
        // mutations can do only sync things
        doMutation( state , payload ){

            console.log(payload)
            
        }

    },

    actions: {
        // actions can do async
        doAction( context , payload ){
            let { state , rootState, getters, rootGetters, commit, dispatch } = context;

            commit("doMutation",payload)
            
        }
    }

}