import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    address: { type: String },
    role: { type: String, enum: ['citizen', 'paralegal', 'employee', 'admin'], required: true },
    isDeleted: { type: Boolean, default: false },
    refreshToken: { type: String }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { _id: this._id, email: this.email, fullName: this.fullName, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d' }
    );
};

export default mongoose.model('User', userSchema);