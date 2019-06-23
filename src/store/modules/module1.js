import uid from 'uniqid'
export default {

    namespaced   : true,

    state:{
        array   : [
            {
                id  : uid(),
                name: "name1"
            }
        ]
    },

    getters:{
        doGetter( state , getters , rootState , rootGetters ) {
            // this   state 
            // this   getters
            // global state
            // global getters 
            // cl(`root State: `, rootState.module2 ) // rootState.filename of module
            // cl(`rootGetters: `,rootGetters)
            // cl(`rootGetters: `,rootGetters["module2/doGetter"] )
            
            return 2
        }
    },

    mutations: {
        // mutations can do only sync things
        doMutation( state , payload ){

            // payload or object or event
            
            if(payload.originalEvent instanceof Event)
                cl(`mutation event : `, payload.target )
            else
                cl(`mutation object : `,payload)
        }

    },

    actions: {
        // actions can do async
        doAction( context , payload ){
            let { state , rootState, getters, rootGetters, commit, dispatch } = context;

            commit  ("module2/doMutation",{message:"m1 call m2 mutation"},{root:true})
            dispatch("module2/doAction"  ,{message:"m1 call m2 action  "},{root:true})
            
        }
    }

}