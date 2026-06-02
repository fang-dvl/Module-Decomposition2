import express from'express';
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 3000;

const messages=[];

const requestLogger = (req, res, next) => {
    const time = new Date().toISOString();
    next()
};

const validateMessage = (req, res, next) => {
    if (req.method === 'POST') {
        const { text } = req.body;
        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Text cannot be empty!' });
        }
    }
    next();
};
app.use(requestLogger);
app.use(validateMessage);

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages',(req,res) => {
    const message=req.body;
    messages.push(message);
    res.status(201).json(message);
})

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})

