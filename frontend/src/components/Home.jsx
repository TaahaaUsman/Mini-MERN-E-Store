import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { MdEditDocument, MdDelete } from "react-icons/md";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api", { withCredentials: true});

        if (response.data.message === "Internal server Error" || 
            response.data.message === "No Users Found") {
          setItems([]);
        } else if (Array.isArray(response.data.message)) {
          setItems(response.data.message);
        }

      } catch (err) {
        setError("Failed to fetch data");
        setItems([]); // Ensure items remain empty on failure
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) =>{
    let response = await axios.get(`http://localhost:3000/api/delete/${id}`, { withCredentials : true});

    if(response.data.message !== "Deleted Successfully") {
      alert(response.data.message);
      return;
    }
    alert("Item deleted successfully");
    setItems(prevItems => prevItems.filter(item => item._id !== id));
  }

  return (
    <>
      {/* Navbar */}
      <nav>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">E-Store</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 flex justify-center items-center">
              <Link to="/create" className='hover:text-gray-400'>Create Product</Link>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li><a>Link 1</a></li>
                    <li><a>Link 2</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className='w-full p-10 flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 lg:gap-8'>

        {/* Show Loading State */}
        {loading && <div className='text-gray-400 font-bold text-3xl'>Loading...</div>}

        {/* Show Error if API Call Fails */}
        {error && <div className='text-red-500 font-bold text-3xl'>{error}</div>}

        {/* Show Message if No Users */}
        {!loading && !items.length && <div className='text-gray-400 font-bold text-3xl'>No Users Yet...</div>}

        {/* Render Items */}
        {items.map((item) => (
          <div key={item._id} className="card bg-base-300 sm:w-96 shadow-sm">
            <figure>
              <img src={item.image || "../assets/default.avif"} alt={item.name || "Image"} className='h-60 w-96' />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{item.name}</h2>
              <p className='text-gray-400 font-bold text-xl'>$ {item.price}</p>
              <div className="card-actions justify-end">
                <Link to={`/update/${item._id}`}><button className="btn btn-neutral"><MdEditDocument className='w-6 h-6' /></button></Link>
                <button className="btn btn-primary" onClick={() => handleDelete(item._id)}><MdDelete className='w-6 h-6 ' /></button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
};

export default Home;
