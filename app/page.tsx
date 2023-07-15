import Image from 'next/image'
import {TodoList }from '@/components'

const Home = async () => {
  return (
   <div className="h-screen">
      <h1 className="text-3xl sm:text-4x1 font-black tracking-wide text-center pt-20 pb-10 sm:pb-10">
        Todo List
      </h1>

      <div className="grid place-items-center">
          <TodoList />
      </div>
   </div>
  )
}

export default Home;