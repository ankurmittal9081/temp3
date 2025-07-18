import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => /^[0-9]{12}$/.test(v),
            message: 'Aadhaar number must be 12 digits.'
        }
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: v => v === null || v === '' || /^[0-9]{10}$/.test(v),
            message: 'Phone number must be 10 digits.'
        }
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ['citizen', 'paralegal', 'employee', 'admin'],
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Password Hashing Middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password Comparison Method
userSchema.methods.comparePassword = function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);