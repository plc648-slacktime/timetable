<script>
	export default {
		name: "Quote",
		methods: {
			clicker: function() {
				alert('test');
			}
		},
		data: function(){
			return {
				quote: ""
			}
		},
		ready: function() {}
	}
</script>

<template>
	<div class="row">
		<div class="quote-wrapper">
			<h2 @click="clicker">Random Quote</h2>
			<p>
				{{quote}}
			</p>
		</div>
	</div>
</template>

<style lang="less">
  .quote-wrapper{
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.14);
    padding: 2em;
    border: solid 1px gray;
    margin-top: 1em;
  }
</style>
