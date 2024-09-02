import React from 'react'
import styles from '../../../styles/styles'
import { brandingData, CategoralData } from '../../../static/data'
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    // console.log("Category ", brandingData);
    const navigate = useNavigate();
    return (
        <>
            <div className={`${styles.section} hidden sm:block`}>
                <div className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}>
                    {
                        brandingData && brandingData.map((item, index) => {
                            return <div className='flex items-start' key={index}>
                                {item.icon}
                                <div className="px-3">
                                    <h3 className="font-bold text-sm md:text-base">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs md:text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div >

            <div className={`${styles.section} bg-white rounded-lg mb-12`} id='categories'>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 xl:grid-cols-5 xl:gap[30px]" >
                    {
                        CategoralData && CategoralData.map((item, index) => {
                            const handleSubmit = (i) => {
                                navigate(`/products?category${i.title}`)
                            }
                            return (
                                <div className='w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden'
                                    key={item.id}
                                    onClick={() => handleSubmit(item)}
                                >
                                    <h5 className={`text-[18px] leading-[1.3]`}>{item.title}</h5>
                                    <img src={item.image_url} alt="" className='w-[120px] object-cover' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Categories