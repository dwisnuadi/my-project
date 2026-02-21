  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchPosts, createPost, removePost } from "../redux/postReducer";

  export default function PostApp() {
    const dispatch = useDispatch();
    const { data = []} = useSelector((state) => state.post);

    console.log("data", data);

    const [title, setTitle] = useState("");

    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    if (status === "loading") return <div>Loading...</div>;
   


    const handleAdd = () => {
      if (title.trim()) return;

      dispatch(createPost({ namaLengkap: title.trim()  }));
      setTitle("");
    };

    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-3">Post CRUD</h1>

        <div className="flex gap-2 mb-4">
          <input
            className="border px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul post"
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-3">
            Tambah
          </button>
        </div>
        
        {data.map((item) => (  
          <div key={item.id } className="border p-2 flex justify-between mb-2">
            <span>{item.namaLengkap}</span>
            <button
              onClick={() => dispatch(removePost(item.id))}  
              className="text-red-500"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    );
  }