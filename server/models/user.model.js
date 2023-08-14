const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    magic_id: {
        type: String,
        default: "",
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName:{
        type: String,
        required: true,
    },
    profession:{
        type: String,
        required: true,
    },
    theme: {
        type: Object
    },
    credits: {
        value: {
            default: 100,
            type: Number,
        },
        last_updated: {
            type: Date,
            default: Date.now(),
        },
        expiry_date: {
            type: Date,
        }
    },
    total_code_optimizations: {
        default: 0,
        type: Number,
    },
    total_code_debuggings: {
        default: 0,
        type: Number,
    },
    total_code_generations: {
        default: 0,
        type: Number,
    },
    total_code_summarizations:{
        default: 0,
        type: Number,
    },
    total_code_translations:{
        default: 0,
        type: Number,
    },
    codes: [
        {
            code_id: {
                type: String,
            },
            code: {
                type: String,
            },
            language: {
                type: String,
            },
            file_name: {
                type: String,
            },
            last_edited: {
                type: Date,
                default: Date.now(),
            },
            created_at: {
                type: Date,
                default: Date.now(),
            }
        }
    ],
    plan: {
        plan_name: {
            type: String,
            enum: ["Basic", "Pro"],
            default: "Basic",
        },
        price: {
            type: Number,
        },
        payment_signature: {
            type: String,
        },
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date,
        }
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;