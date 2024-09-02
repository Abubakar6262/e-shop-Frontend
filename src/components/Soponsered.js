import React from 'react'
import styles from '../styles/styles'

const Soponsered = () => {
    return (
        <div className={`${styles.section} hidden sm:block bg-white py-[10px] px-[5px] mb-12 cursor-pointer rounded-xl`}>
            <div className='flex justify-between w-full'>
                <div className='flex items-start '>
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" alt="" className='w-[150px] object-contain' />
                </div>
                <div className='flex items-start '>
                    <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" alt="" className='w-[150px] object-contain' />
                </div>
                <div className='flex items-start '>
                    <img src="https://th.bing.com/th/id/OIP.xnCmeIubOmmCx9j5jcAd4QHaEK?rs=1&pid=ImgDetMain" alt="" className='w-[150px] object-contain' />
                </div>
                <div className='flex items-start '>
                    <img src="https://th.bing.com/th/id/OIP.-YzNxFgXai7xpeemFi5vvgHaEK?rs=1&pid=ImgDetMain" alt="" className='w-[150px] object-contain' />
                </div>
            </div>
        </div>
    )
}

export default Soponsered