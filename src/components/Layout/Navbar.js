import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

const Navbar = ({active}) => {
    // console.log("This is active ",active );
    return (
        <div className={`block 800px:${styles.noramlFlex}`}>
            {
                navItems && navItems.map((item, index) => {
                    return <div className="flex" key={index}>
                        <Link to={item.url} className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black800px:text-[#fff]"}  font-[500] px-6 cursor-pointer pb-[25px] 800px:pb-0`}>
                            {item.title}
                        </Link>
                    </div>
                })
            }
        </div>
    )
}

export default Navbar