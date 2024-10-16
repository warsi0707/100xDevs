import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { MdOutlineCurrencyRupee } from "react-icons/md";
import Footer from "./Footer"

export default function DetailC() {
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const {id} = useParams()

    
    const detailData =async(id)=>{
        try{
            const response = await fetch(`https://one00xdevs-cx2s.onrender.com/api/course/${id}`)
        const result = await response.json()
        setData(result.course)
        }catch(error){
            setError("Course not found"),
            console.error(error)
        }
        
    }

    const boyCourse =async() =>{
        try{
        console.log(id)
            const response = await fetch(`https://one00xdevs-cx2s.onrender.com/api/user/buy/${id}`,{
                method: "POST",
                credentials: 'include'
            })
            const result = await response.json()
            if(response.ok){
                setMessage(result.message)
                setTimeout(() => {
                    navigate("/purchased")
                }, 2000);
            }
            console.log(result)
        }catch(error){
            setError(error)
            console.error(error)
        }

    }
    useEffect(()=>{
        detailData()
    },[])
    
  return (
    <>
    
    <div className="bg-black h-screen " >
        {error && <div className="bg-red-800 p-2 w-96 mx-auto rounded-xl">{error}</div> }
        {message && <div className="bg-green-800 p-2 w-96 mx-auto rounded-xl">{message}</div>}
    
    
        <div className=" md:flex md:justify-evenly  mx-auto space-y-10 py-5">
            <div className="cards w-96 mx-auto mt-8   rounded-2xl border-white border-2  text-2xl ">
                <div><img src={data.image} className="rounded-t-2xl" /></div>
                <div className="text-white flex p-5 md:p-8">
                    <h1>{data.title}</h1>
                </div>
               
            </div>
            <div className="purchase p-5 mb-20  bg-green-500 mx-auto w-96 rounded-2xl border-white border-2 ">
                <div className="data text-left">
                    <div className="text-blue-700 text-xl text-center">
                        <h1>{data.title}</h1>
                    </div>
                    <div className="desc text-center py-2 text-lg">
                        <h1>{data.description}</h1>
                    </div>
                    <div className="content text-white space-y-5">
                       <h1 className="text-xl text-black underline font-bold"> Technology you will learn:</h1> 
                       <p className="text-md">{data.content}</p>
                    </div>
                </div>
                <div className="btns flex justify-evenly mt-5">
                    
                    <h1 className="bg-gray-700 p-2 text-xl text-white rounded-xl px-5 flex"><h1 className="mt-1.5"><MdOutlineCurrencyRupee/></h1>{data.price}</h1>
                    <button className="bg-blue-600 p-2 text-xl text-white rounded-xl px-5 hover:bg-purple-600 " onClick={boyCourse}>Buy</button>
                </div>
               
            </div>
        </div>
    </div>
    <div className="space-y-10">
    <Footer/>
    </div>
   
    </>
  )
}
