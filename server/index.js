import 'dotenv/config';
import cors from 'cors';
import mongoose from "mongoose";
import express from 'express';
import { Todo } from './models/Todo.js';
const app = express();
app.use(express.json());
const allowedOrigin = process.env.ORIGINS
app.use(cors({
    origin: allowedOrigin,
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    credentials: false // Allow credentials (cookies, authorization headers)
}));

app.get('/todo', async (req, res) => {
    const todos = await Todo.find();
    const updatedTodo = todos.map(todo => {
        return {
            id: todo.id,
            status: todo.status,
            title: todo.title,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        }
    })
    res.json({
        data: updatedTodo,
        success: true,
        message: ""
    });
});

app.post('/todo/create', async (req, res) => {
    try {
        const newTask = new Todo({
            title: req.body.title
        });
        const savedTodo = await newTask.save();
        const { _id, __v, ...responseObject } = savedTodo.toObject();
        res.status(200).json({
            data: responseObject,
            success: true,
            message: "Task created successfully."
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/todo/edit', async (req, res) => {
    try {
        const result = await Todo.findOneAndUpdate(
            { id: req.query.id },
            { $set: { title: req.body.title, updatedAt: Date.now() } },
            { new: true }
        );
        if (!result) {
            return res.status(200).json({
                data: [],
                success: false,
                message: 'Task not found.'
            });
        }
        const { _id, __v, ...responseObject } = result.toObject();
        res.status(200).json({
            data: responseObject,
            success: true,
            message: 'Task has been updated successfully.'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/todo/complete', async (req, res) => {
    try {
        const result = await Todo.findOneAndUpdate(
            { id: req.query.id },
            { $set: { status: 1, updatedAt: Date.now() } },
            { new: true }
        );
        if (!result) {
            return res.status(200).json({
                data: [],
                success: false,
                message: 'Task not found.'
            });
        }
        const { _id, __v, ...responseObject } = result.toObject();
        res.status(200).json({
            data: responseObject,
            success: true,
            message: 'Task has been marked as completed successfully.'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/todo/delete', async (req, res) => {
    try {
        const result = await Todo.findOneAndDelete({ id: req.query.id });
        if (!result) {
            return res.status(200).json({
                data: [],
                success: false,
                message: 'Task not found.'
            });
        }
        const { _id, __v, ...responseObject } = result.toObject();
        res.status(200).json({
            data: responseObject,
            success: true,
            message: 'Task has been deleted successfully.', data: responseObject
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect(process.env.DB_URI, { tls: true })
    .then(() => app.listen(process.env.PORT))
    .catch((error) => console.log(error))
