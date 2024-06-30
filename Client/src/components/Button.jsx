const Button = ({ text, onClick, className='' }) => {
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
            `}>{text}</button>
    )
}

export default Button
