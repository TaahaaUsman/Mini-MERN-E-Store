import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CreateProduct = () => {
  const [existedItem, setExistedItem] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

    const handleSubmit = async (e) => {

      e.preventDefault();
      if(!name) {
        alert("Please Enter product name");
        return;
      }
      if(!price) {
        alert("Please Enter price of product");
        return;
      }
      if(!image) {
        alert("Please Enter Image link");
        return;
      }

      let response = await axios.post(`http://localhost:3000/api/update/${id}`, { name, price, image }, { withCredentials: true });

      if(response.data.message !== "Updation successfull") {
        alert(response.data.message);
        return;
      } 
      if(response.data.message === "Updation successfull") {
        navigate('/');
        return;
      }
      return;
    }

    const checkItem = async () => {
      let response = await axios.get(`http://localhost:3000/api/getOne/${id}`, {withCredentials: true});
      if(typeof response.data.message !== "object") {
        alert(response.data.message);
        return;
      } else {
        setExistedItem(response.data.message);
        return;
      }
    }

    useEffect(() => {
      checkItem();
    }, []);

    useEffect(() => {
      if(existedItem) {
        setName(existedItem.name);
        setPrice(existedItem.price);
        setImage(existedItem.image);
      }
    }, [existedItem])


  return (
    <div className='h-screen w-full flex justify-center items-center'>

      <form onSubmit={handleSubmit} className='w-full sm:w-96 lg:w-1/3 sm:p-10 md:p-14 lg:p-16 sm:border-2 sm:bg-gray-900 border-white rounded-lg rounded-tr-[70px] rounded-bl-[70px] flex flex-col items-center gap-8 '>

      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-400 mb-6'>Update Product</h1>

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" required />

      <input type="numbder" value={price} onChange={(e) => setPrice(e.target.value)} className="input" required />

      <label className="input validator">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></g></svg>
        <input type="url" required value={image} onChange={(e) => setImage(e.target.value)} />
      </label>

      <button type='submit' className='bg-gray-500 text-white py-2 lg:py-3 px-6 lg:px-8 rounded-lg border-none cursor-pointer hover:bg-gray-600 mt-6'>Update</button>

      </form>
      
    </div>
  )
}

export default CreateProduct;







