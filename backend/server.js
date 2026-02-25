const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/checklists', require('./routes/checklists'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/stores', require('./routes/stores'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/reports', require('./routes/reports'));
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: { message: err.message, status: err.status || 500 } });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor iniciado na porta ${PORT}`);
});
module.exports = app;