import React from 'react'
import styles from '../../../styles/styles'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className={`relative min-h-[70vh] 800:min-h-[80vh] w-full bg-no-repeat bg-cover ${styles.noramlFlex}`}
            style={{
                backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
            }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1 className={`text-[35px] leading-1.2 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                    Best collection for <br /> home decorations
                </h1>
                <p className='pt-5 text-[16px] font-Poppins font-[400] text-[#000000ba]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore autem laudantium esse molestias laborum consequuntur accusamus commodi, sint inventore ut praesentium dignissimos. In, repudiandae deserunt totam unde itaque iure deleniti.</p>
                <Link to={"/products"}>
                    <div className={`${styles.button} mt-5 inline-block`}>
                        <span className='text-[#fff] font-Poppins text-[18px]'>Shop Now</span>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default Hero