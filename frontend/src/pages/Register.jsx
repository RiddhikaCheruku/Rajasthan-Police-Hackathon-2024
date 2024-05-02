import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
export const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    function registerUser(e) {
        try {
            e.preventDefault();
            axios.post('/register', {
                name, email, password
            })
            alert('Registration successful Now you can login')
        } catch (e) {
            alert("Registration failed.")
        }
    }
    return (
        <div className='mt-4 grow flex bg-contain border-s-white items-center justify-around ' style={{
            backgroundImage: `url(/assets/images/bg-2.jpg)`,
        }}>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4 text-white '>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input className='w-full border my-1 py-2 px-3 rounded-2xl'
                        type="text"
                        placeholder='Type your name...'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                    <input className='w-full border my-1 py-2 px-3 rounded-2xl'
                        type="email"
                        placeholder='Type your email...'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <input className='w-full border my-1 py-2 px-3 rounded-2xl'
                        type="password"
                        placeholder='Password...'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <button className='bg-primary p-2 w-full rounded-2xl text-white'>Register</button>
                    <div className='text-center py-2 text-white '>
                        Already have an account? <Link to={'/login'} className='underline text-white'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
