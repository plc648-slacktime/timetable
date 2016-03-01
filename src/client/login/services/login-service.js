import http from 'lib/superagent';

export default function(login, pass, cb) {
	http
		.post('/api/login')
		.send({
			login,
			pass
		})
		.end(cb);
}
