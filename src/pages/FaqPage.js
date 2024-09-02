import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import styles from '../styles/styles'
import { FaAngleRight } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'

const FaqPage = () => {
    return (
        <div >
            <Header activeHeading={5} />
            <Faq />
            <Footer />
        </div>
    )
}

const Faq = () => {
    const [activeTab, setActiveTab] = useState(0);
    const ToggleTab = (tab) => {
        if (activeTab === tab) {
            setActiveTab(0);
        } else {
            setActiveTab(tab);
        }
    }

    const faqs = [
        {
            id: 1,
            question: "What is the return policy?",
            answer: "You can return any item within 30 days of purchase as long as it's in its original condition.",
        },
        {
            id: 2,
            question: "How do I track my order?",
            answer: "You can track your order using the tracking number provided in the confirmation email.",
        },
        {
            id: 3,
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping to select countries. Please check our shipping policy for more details.",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto my-4">
            <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>
            {faqs.map((faq) => (
                <div key={faq.id} className="mb-4">
                    <button
                        onClick={() => ToggleTab(faq.id)}
                        className="flex items-center justify-between w-full text-left p-4 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none"
                    >
                        <span className="text-xl font-semibold">{faq.question}</span>
                        {activeTab === faq.id ? <IoCloseOutline size={25} /> : <FaAngleRight size={25} />}
                    </button>
                    {activeTab === faq.id && (
                        <div className="mt-2 p-4 bg-gray-100 rounded-md">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}


export default FaqPage