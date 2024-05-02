// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext)
    async function loginUser(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email, password
            })
            setUser(data)
            alert('Login successful')
            setRedirect(true)
        } catch (e) {
            alert("Login failed.")
        }
    }

    if (redirect) {
        return <Navigate to={'/hash'} />
    }
    return (
            <div className='mt-4 grow bg-contain flex items-center justify-around'
                    style={{
                        backgroundImage: `url(/assets/images/bg-2.jpg)`,
                    }}
            >
                <div className='mb-32'>
                    <h1 className='text-4xl text-center text-white mb-4 '>Login</h1>
                    <form className='max-w-md mx-auto' onSubmit={loginUser}>
                        <input className='w-full border my-1 py-2 px-3 rounded-2xl'
                            type="email"
                            placeholder='Type your email...'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} />
                        <input className='w-full border my-1 py-2 px-3 rounded-2xl'
                            type="password"
                            placeholder='Password...'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <button className='bg-primary p-2 w-full rounded-2xl text-white'>Login</button>
                        <div className='text-center py-2 text-white '>
                            Don&apos;t have an account yet? <Link to={'/register'} className='underline text-white'>Register now</Link>
                        </div>
                    </form>
                </div>
            </div>
    )
}
