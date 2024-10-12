import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function DetailC() {
    const [data, setData] = useState([])
    

    const {id} = useParams()
    const detailData =async()=>{
        const response = await fetch(`http://localhost:3000/api/${id}`)
        const result = await response.json()
        setData(result.course)
        console.log(result.course.title)
    }

    useEffect(()=>{
        detailData()
    },[])
    
  return (
    <>
    <div>
        <div className="bg-blue-800 p-12 px-5 w-full  grid text-center justify-center text-white text-2xl font-bold">
            <h1></h1>
        </div>
       
            <div className=" w-96 h-72  bg-black rounded-2xl relative">
                <img src={data.image} className="rounded-t-2xl h-44 w-full" />
                <div className="p-2">
                <p className="text-white">PRICE</p>
                    <div className="absolute grid   text-white  justify-around">
                        <p>2989</p>
                        <p>25.678%</p>
                    </div>
                </div>
                </div>
                

            </div>
        
   
      
    </>
  )
}
