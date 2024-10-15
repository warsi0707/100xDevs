
import Footer from './Footer'
import Course from './Course'
import StarterPage  from'./StarterPage'


export default function Home() {
 
  return (
    <>
    <div className='h-full bg-gray-950 text-gray-300 '>
        <StarterPage/>
        <Course/>
        <Footer/>
    </div>
      
    </>
  )
}



