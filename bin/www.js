let app = require('../app');

let PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
  console.log(`${PORT} 로 express 실행`);
})
