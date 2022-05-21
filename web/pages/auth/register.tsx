import { useState } from "react"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import axios from 'axios';
import { useRouter } from "next/router";

export const createUserValidation = object({
    name: string().nonempty({ message: "Name is required" }),
    password: string().nonempty({ message: "Password is required" }).min(6, "Password too shor - should be 6 chars minimum"),
    passwordConfirmation: string().nonempty({ message: "PasswordConfirmation is required" }),
    email: string().nonempty({ message: "Email is required" }).email("Not a valid email"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
})

type CreateUserInput = TypeOf<typeof createUserValidation>;

function RegisterPage() {
    const router = useRouter();
    const { registerError, setRegisterError } = useState(null);

    const { register, formState: { errors }, handleSubmit } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserValidation)
    });

    async function onSubmit(values: CreateUserInput) {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`, values)
            router.push("/")
        } catch (error: any) {
            setRegisterError(error.message)
        }
    }

    console.log({ errors });

    return (
        <>
            <p>{registerError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-element'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" placeholder='ckymn@gmail.com' id='email'{...register("email")} />
                    <p>{errors.email?.message}</p>
                </div>
                <div className='form-element'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" placeholder='ckymn' id='name'{...register("name")} />
                    <p>{errors.name?.message}</p>
                </div>
                <div className='form-element'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" placeholder='*******' id='password'{...register("password")} />
                    <p>{errors.password?.message}</p>
                </div>
                <div className='form-element'>
                    <label htmlFor='passwordConfirmation'>Password Confirmation</label>
                    <input type="password" placeholder='*******' id='passwordConfirmation'{...register("passwordConfirmation")} />
                    <p>{errors.passwordConfirmation?.message}</p>
                </div>
                <button type="submit">SUBMIT</button>
            </form>
        </>
    )
}

export default RegisterPage