import { useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const createUserValidation = object({
    name: string({
        required_error: "Name is required",
    }),
    password: string({
        required_error: "Password is required",
    }).min(6, "Password too shor - should be 6 chars minimum"),
    passwordConfirmation: string({
        required_error: "Password Confirmation is required",
    }),
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email"),

}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
})

function RegisterPage() {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(createUserValidation)
    });

    function onSubmit(values) {
        console.log({ values })
    }

    console.log({ errors });

    return (
        <>
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