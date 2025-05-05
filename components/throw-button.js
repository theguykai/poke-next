export default function ThrowButton({ onClick, onMouseOver, onMouseLeave, buttonDisabled }) {
    return (
        <button className='py-4 px-2 bg-amber-400 text-amber-50 font-bold text-5xl text-outline rounded-md 
hover:rounded-xl hover:bg-amber-200 hover:scale-110 hover:-translate-y-1 hover:shadow-lg 
hover:brightness-110 hover:cursor-pointer transform transition-all duration-300 ease-out' onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
            onClick={onClick} disabled={buttonDisabled}>THROW!</button>
    )
}