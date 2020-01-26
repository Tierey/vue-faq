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
            // console.log(`root State: `, rootState.module2 ) // rootState.filename of module
            // console.log(`rootGetters: `,rootGetters)
            // console.log(`rootGetters: `,rootGetters["module2/doGetter"] )
            
            return 2
        }
    },

    mutations: {
        // mutations can do only sync things
        doMutation( state , payload={} ){

            // payload or object or event
            
            if(payload.originalEvent instanceof Event)
                console.log(`mutation event : `, payload.target )
            else
                console.log(`mutation object : `,payload)

            console.log("this state: ",this.state)
        }

    },

    actions: {
        // actions can do async
        doAction( context , payload ){
            let { state , rootState, getters, rootGetters, commit, dispatch } = context;
            
            // gobal direct access
            console.log(this.state.module1)
            console.log(this.state.module2)

            commit  ("module2/doMutation",{message:"m1 call m2 mutation"},{root:true})
            dispatch("module2/doAction"  ,{message:"m1 call m2 action  "},{root:true})
            
        }
    }

}