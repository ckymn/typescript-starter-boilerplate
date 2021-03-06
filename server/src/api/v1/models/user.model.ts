import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from 'config';

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    let user = this as unknown as UserDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) {
        return next();
    } else {
        const salt = await bcrypt.genSalt(Number(process.env.saltWorkFactory));
        const hash = await bcrypt.hashSync(user.password, salt);

        user.password = hash;
        return next();
    }
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel