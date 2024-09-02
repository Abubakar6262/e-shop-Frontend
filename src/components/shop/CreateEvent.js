import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { createEvent } from '../../redux/actions/event';

const CreateEvent = () => {
    const navigate = useNavigate();
    const disPatch = useDispatch();

    const { seller } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.events);

    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState()
    const [discountPrice, setDiscountPrice] = useState()
    const [stock, setStock] = useState()
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const today = new Date().toISOString().slice(0, 10);
    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : today;
    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10);
    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    }

    useEffect(() => {
        if (error) {
            window.notify(error, "error")
        }

        if (success) {
            window.notify('Event Created Successfully', "success")
            navigate('/dashboard')
            window.location.reload(true);
        }

    }, [disPatch, error, success])

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();

        images.forEach((image) => {
            return newForm.append("images", image)
        })
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("shopId", seller._id);
        newForm.append("start_Date", startDate);
        newForm.append("finish_Date", endDate);

        disPatch(createEvent(newForm))
    }
    
    return (
        <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] overflow-y-scroll p-3' >
            <h5 className='text-[30px] font-Poppins text-center '>Create Event</h5>
            {/* create product form */}
            <form action="" onSubmit={handleSubmit}>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Name <span className='text-red-500'>*</span>
                    </label>
                    <input type="text" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Event Product Name..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Description<span className='text-red-500'>*</span>
                    </label>
                    <textarea cols={30} rows={8} type="text" className='mt-2 appearance-none block w-full pt-3 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Your Event Product description..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Category<span className='text-red-500'>*</span>
                    </label>
                    <select name="" id=""
                        className='w-full mt-3 border h-[35px] rounded-[5px]'
                        value={category} onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Choose category">Choose a Category... </option>{
                            categoriesData && categoriesData.map((item) => {
                                return <option value={item.title} key={item.title}>{item.title}</option>
                            })
                        }
                    </select>
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Tags
                    </label>
                    <input type="text" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='tags' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Enter Your Event Product tags..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Original Price
                    </label>
                    <input type="number" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='originalPrice' value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder='Enter Your Event Product original Price..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Price(With Discount)<span className='text-red-500'>*</span>
                    </label>
                    <input type="number" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='discountPrice' value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder='Enter Your Event Product discount Price..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Product Stock<span className='text-red-500'>*</span>
                    </label>
                    <input type="number" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='stock' value={stock} onChange={(e) => setStock(e.target.value)} placeholder='Enter Your Event Product Stock..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Event Start Date<span className='text-red-500'>*</span>
                    </label>
                    <input type="date" id='start-date'
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='stock' value={startDate ? startDate.toISOString().slice(0, 10) : ""} onChange={handleStartDateChange}
                        min={today} placeholder='Enter Your Event Product Stock..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Event End Date<span className='text-red-500'>*</span>
                    </label>
                    <input type="date" id='end-date'
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        name='stock' value={endDate ? endDate.toISOString().slice(0, 10) : ""} onChange={handleEndDateChange}
                        min={minEndDate} placeholder='Enter Your Event Product Stock..' />
                </div>
                <br />
                <div>
                    <label htmlFor="" className='pb-2'>
                        Upload Images<span className='text-red-500'>*</span>
                    </label>
                    <input type="file" id='upload' className='hidden' multiple={true} onChange={handleImageChange} />
                    <label htmlFor="upload">
                        <AiOutlinePlusCircle size={30} className='mt-3 cursor-pointer' color='#555' />
                    </label>
                    <div className='w-full flex items-center flex-wrap'>
                        {
                            images && images.map((item) => {
                                return <img src={URL.createObjectURL(item)} key={item} alt="" className='h-[120px] w-[120px] object-cover m-2' />
                            })
                        }
                    </div>
                </div>
                <br />
                <div>
                    <input type="submit" value={'Create Event'} className='mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] bg-slate-400 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' />
                </div>
            </form>
        </div>
    )
}

export default CreateEvent