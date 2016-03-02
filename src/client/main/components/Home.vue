<script>
	import user from 'models/user.js';
	import utils from 'utils.js';

	export default {
		name: "Home",
		methods: {
			msg: function() {
				alert(utils.plus(user.a,  user.b));
			}
		}
	}
</script>

<template>
    <div class="row">
      <div class="medium-8 medium-offset-2 columns">
        <h1 @click="msg">Congratulations your app is working!</h1>
        <h4>Now navigate around to find out more</h4>
      </div>
    </div>
</template>
