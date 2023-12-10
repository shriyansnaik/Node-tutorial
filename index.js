const express = require('express');
const app = express();

const userRoutes = require('./routes/users.routes');
const auth = require('./routes/auth.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/login", auth);

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});