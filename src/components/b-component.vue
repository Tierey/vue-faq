<template>
	<div class="b-component">

		<button @click="doAction">doAction</button>

	</div>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers as ns} from "vuex";

const  m1 = ns('module1')
const  m2 = ns('module2')

export default {

	computed:{
		... m1.mapGetters(["doGetter"]),
		//... m2.mapGetters(["doGetter"]),
	},

	methods:{
		... m1.mapActions(["doAction"])
	}

}
</script>

<style lang="stylus" >

.b-component
	//
	

</style>