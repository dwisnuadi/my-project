    import { useState, useEffect } from "react"
    import axios from "axios"
    import {Link} from "react-router-dom"



    export default function AddCourse() {

    const [courses,setCourses] = useState([])
    const [id,setId] = useState(null)

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [image,setImage] = useState("")
    const [price,setPrice] = useState("")
    const [tutor,setTutor] = useState("")
    const [experience,setExperience] = useState("")
    const [tutorImage,setTutorImage] = useState("")

    // GET COURSES
    const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/course")
    setCourses(res.data)
    }

    useEffect(()=>{

        
    fetchCourses ()
    },[])

    // ADD COURSE
    const addCourse = async (e)=>{
    e.preventDefault()

    const newCourse = {
        title,
        description,
        image,
        price,
        tutor,
        experience,
        tutorImage
    }

    await axios.post("http://localhost:5000/course", newCourse)

    alert("Course berhasil ditambahkan")

    clearForm()
    fetchCourses()
    }

    // EDIT COURSE
    const editCourse = (course)=>{
    setId(course.id)
    setTitle(course.title)
    setDescription(course.description)
    setImage(course.image)
    setPrice(course.price)
    setTutor(course.tutor)
    setExperience(course.experience)
    setTutorImage(course.tutorImage)
    }

    // UPDATE COURSE
    const updateCourse = async ()=>{

    const updateData = {
        title,
        description,
        image,
        price,
        tutor,
        experience,
        tutorImage
    }

    await axios.put(`http://localhost:5000/course/${id}`, updateData)

    alert("Course berhasil diupdate")

    clearForm()
    fetchCourses()
    }

    // DELETE COURSE
    const deleteCourse = async(id)=>{
    await axios.delete(`http://localhost:5000/course/${id}`)

    alert("Course berhasil dihapus")

    fetchCourses()
    }

    // CLEAR FORM
    const clearForm = ()=>{
    setId(null)
    setTitle("")
    setDescription("")
    setImage("")
    setPrice("")
    setTutor("")
    setExperience("")
    setTutorImage("")
    }

    return (
        // title 

    <div className="min-h-screen bg-gray-50">

    <header className="w-full bg-white shadow">
    <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">

        <img
        src="/images/Logo.png"
        alt="logo"
        className="h-10"
        />

        <div className="flex items-center gap-4">

        <Link to="/home">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Home
            </button>
        </Link>

        </div>

    </div>
    </header>



    <div className="p-10 max-w-6xl mx-auto mt-16">
        
        
        
    {/* card */}
    <form
    onSubmit={addCourse}
    className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >

    <h1 className="text-3xl font-bold text-center mb-6">
    Admin Input Course
    </h1>

    {/* ROW 1 */}

    <div className="grid grid-cols-4 gap-4">

    <input
    type="text"
    placeholder="Judul Course"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    className="border rounded-lg p-3"
    />

    <input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
    className="border rounded-lg p-3"
    />

    <input
    type="text"
    placeholder="Image URL"
    value={image}
    onChange={(e)=>setImage(e.target.value)}
    className="border rounded-lg p-3"
    />

    <input
    type="number"
    placeholder="Harga"
    value={price}
    onChange={(e)=>setPrice(e.target.value)}
    className="border rounded-lg p-3"
    />

    </div>

    {/* ROW 2 */}

    <div className="grid grid-cols-4 gap-4">

    <input
    type="text"
    placeholder="Tutor"
    value={tutor}
    onChange={(e)=>setTutor(e.target.value)}
    className="border rounded-lg p-3"
    />

    <input
    type="text"
    placeholder="Tutor Experience"
    value={experience}
    onChange={(e)=>setExperience(e.target.value)}
    className="border rounded-lg p-3"
    />

    <input
    type="text"
    placeholder="Tutor Image URL"
    value={tutorImage}
    onChange={(e)=>setTutorImage(e.target.value)}
    className="border rounded-lg p-3"
    />

    {price && (
    <p className="text-sm text-gray-500 text-right mt-2">
    {new Intl.NumberFormat("id-ID",{
    style:"currency",
    currency:"IDR"
    }).format(price)}
    </p>
    )}

    </div>

    {/* BUTTON */}

    <div className="grid grid-cols-3 gap-4 pt-4">

    <button
    type="submit"
    className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
    >
    Tambah Course
    </button>

    <button
    type="button"
    onClick={updateCourse}
    className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
    >
    Update Course
    </button>

    <button
    type="button"
    onClick={clearForm}
    className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
    >
    Reset Form
    </button>

    </div>

    </form>

    {/* TABLE */}

    <div className="bg-white mt-10 p-6 rounded-xl shadow">

    <h2 className="text-xl font-bold mb-4">
    Daftar Course
    </h2>

    <table className="w-full text-left">

    <thead className="border-b">

    <tr>
    <th className="py-2">Title</th>
    <th>Tutor</th>
    <th>Price</th>
    <th>Action</th>
    </tr>

    </thead>

    <tbody>

    {courses.map((course)=>(
    <tr key={course.id} className="border-b">

    <td className="py-2">{course.title}</td>
    <td>{course.tutor}</td>

    <td>
    {new Intl.NumberFormat("id-ID",{
    style:"currency",
    currency:"IDR"
    }).format(course.price)}
    </td>

    <td className="flex gap-2 py-2">

    <button
    onClick={()=>editCourse(course)}
    className="bg-yellow-400 px-3 py-1 rounded"
    >
    Edit
    </button>

    <button
    onClick={()=>deleteCourse(course.id)}
    className="bg-red-500 text-white px-3 py-1 rounded"
    >
    Delete
    </button>

    </td>

    </tr>
    ))}

    </tbody>

    </table>

    </div>

    </div>

    </div>

    )
    }