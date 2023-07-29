const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    magic_id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    theme: {
        type: Object
    },
    credit: {
        value: {
            default: 10,
            type: Number,
        },
        last_updated: {
            type: Date,
        },
        expiry_date: {
            type: Date,
        }
    },
    total_optimizations: {
        default: 0,
        type: Number,
    },
    total_debugs: {
        default: 0,
        type: Number,
    },
    total_code_generations: {
        default: 0,
        type: Number,
    },
    codes: [
        {
            code_id: {
                type: String,
                required: true,
            },
            code: {
                type: String,
            },
            language: {
                type: Object,
            },
            file_name: {
                type: String,
                required: true,
            },
            total_lines: {
                type: Number,
                required: true,
            },
            last_edited: {
                type: Date,
                required: true,
            },
            created_at: {
                type: Date,
                required: true,
            }
        }
    ],
    plan: {
        planName: {
            type: String,
            enum: ["Basic", "Pro"],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;