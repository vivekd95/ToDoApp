import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);
const TodoSchema = new mongoose.Schema({
    id: { type: Number },
    status: { type: Number, default: 0 },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

TodoSchema.plugin(AutoIncrement, {
    inc_field: 'id',     // Field to increment
    start_seq: 1,        // Start counting from 1
    disable_hooks: false  // Prevent plugin from adding pre-save hooks
});

export const Todo = mongoose.model('Todo', TodoSchema);