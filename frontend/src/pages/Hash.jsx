import { useState } from "react"
import axios from "axios"
export const Hash = () => {
  const [hash, setHash] = useState();
  function computeHash(e) {
    try {
      e.preventDefault();
      axios.post('/hash', {
        hash
      })
      alert('Hash Value inserted.')

      window.open("http://127.0.0.1:5500/backend/test2.html")
    } catch (e) {
      alert("Error in input of hash.")
    }

  }
  return (
    <div className='mt-4 grow bg-contain flex items-center justify-around'
      style={{
        backgroundImage: `url(/assets/images/bg-5.jpg)`,
      }}
    >
      <div className='mb-32'>
        <h1 className='text-4xl text-center text-white mb-4 '>Hash Value</h1>
        <form className='max-w-md mx-auto' onSubmit={computeHash}>
          <input className='w-full border my-1 py-2 px-3 rounded-2xl'
            type="hash"
            placeholder='Enter hash value...'
            value={hash}
            onChange={(e) => { setHash(e.target.value) }}
          />
          <button className='bg-primary p-2 w-full rounded-2xl text-white'>Submit</button>
         
        </form>
      </div>
    </div>
  )
}
