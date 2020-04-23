module.exports = {
	launch: {
		headless: true,  // для отображения в клиенте
		args: ['--disable-dev-shm-usage'],
	},
	server: {
		command: 'npm start',
		host: 'localhost',
		port: 3000,
		launchTimeout: 9999990, // 10000
		debug: true,
	},
};
