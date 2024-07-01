const Button = ({ text, onClick, className='', children }) => {
    return (
        <button
            onClick={onClick}
            className= {`
                p-2   
                text-sm
                font-semibold
                rounded-md 
                text-blue-700
                transition-all
                bg-blue-50
                hover:text-blue-700
                hover:bg-blue-100
                cursor-pointer
                ${className}
            `}>{text}{children}</button>
    )
}

export default Button
