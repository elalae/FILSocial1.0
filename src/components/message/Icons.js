import React, { useState, useEffect, useRef } from 'react'

const Icons = ({ setContent, content }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const reactions = [   
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
    ]

    const handleIconClick = (icon) => {
        setContent(content + icon)
        setDropdownOpen(false)
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <span
                className="cursor-pointer px-2 py-1 rounded-full"
                id="navbarDropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <span className="opacity-40">😄</span>
            </span>

            {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                    <div className="grid grid-cols-6 gap-2 p-2">
                        {reactions.map((icon) => (
                            <span
                                key={icon}
                                className="cursor-pointer text-xl hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1"
                                onClick={() => handleIconClick(icon)}
                            >
                                {icon}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Icons
