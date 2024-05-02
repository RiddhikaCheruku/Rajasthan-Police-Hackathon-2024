import { useContext, useState } from "react"
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
export const Account = () => {

    const { ready, user, setUser } = useContext(UserContext)
    let { subPage } = useParams();
    const [redirect, setRedirect] = useState(null)

    async function logOut() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    if (!ready) {
        return 'Loading...'
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}></Navigate>
    }

    if (subPage === undefined) {
        subPage = 'profile';
    }

    function linkClasses(type = null) {
        let classes = ' inline-flex gap-1 py-2 px-6 rounded-full'
        if (type === subPage) {
            classes += ' bg-primary text-white '
        } else {
            classes += ' bg-gray-200'
        }
        return classes
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    My Profile</Link>
            </nav>
            {
                subPage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto">
                        Logged in as {user.name} ({user.email})<br />
                        <button onClick={logOut} className="bg-primary p-2 w-full max-w-sm rounded-2xl text-white mt-2">Logout</button>
                    </div>
                )
            }
        </div>
    )
}
