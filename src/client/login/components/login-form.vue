<script type="text/babel">
	import loginService from '../services/login-service';

	export default {
		data() {
			return {
				login: 'pies',
				password: ''
			}
		},
		methods: {
			send() {
				alert('test2');
			}
		}
	}
</script>

<template>
	<form>
		{{login}}
		<div class="input-group">
			<label for="login">Login:</label>
			<input type="text" v-model="login" name="login" class="form-control" id="login">
		</div>
		<div class="input-group">
			<label for="password">Hasło:</label>
			<input type="password" v-model="password" name="password" class="form-control" id="password">
		</div>
		<br>
		<button type="button" class="btn btn-primary" @click="send">Zaloguj</button>
	</form>
</template>

<style lang="less">
	body {
		background-color: blues;
	}
</style>