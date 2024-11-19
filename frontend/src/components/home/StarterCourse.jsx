import React, { useEffect, useState } from "react";

export default function StarterCourse() {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  try {
    const Course = async () => {
      const response = await fetch(
        "https://one00xdevs-cx2s.onrender.com/api/course/starter",
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setLoading(true)
      if(response.ok){
        setLoading(false)
        setError("")
        setCourse(result.item)
      }
    };
    useEffect(() => {
      Course();
    }, []);
  } catch (err) {
    setError(err.message);
  }

  return (
    <div>
      <div className="pt-32">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:w-[1000px] mx-auto">
          {loading ? (
            <>
              <h1 className="text-3xl font-bold text-black mx-auto text-center my-10">
                Loading...
              </h1>
            </>
          ) : (
            ""
          )}
          {course.map((item) => (
            <div
              key={item._id}
              className="card w-72 md:w-80 h-auto mx-auto border-2 border-gray-400 rounded-2xl"
            >
              <img src={item.image} className="rounded-t-2xl" />
              <div className="p-2">
                <h1 className="text-center mt-3 text-black font-bold text-xl">
                  {item.title}
                </h1>
                <div className="prices flex justify-between mx-5 mt-8">
                  <p>
                    <i className="fa-solid fa-indian-rupee-sign"> &nbsp;</i>
                    {item.price}
                  </p>
                  <p>16 off</p>
                </div>
                <div className="btn mt-5">
                  <button className="bg-blue-600 w-full rounded-3xl py-2 text-lg text-white mb-2  hover:bg-blue-800 delay-200">
                   <a href={`/course/${item._id}`}> View Details</a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
