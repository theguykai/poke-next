export default function ThrowButton({ onClick, onMouseOver, onMouseLeave, buttonDisabled }) {
    return (
        <button className='py-4 px-2 bg-amber-400 text-amber-50 font-bold text-7xl rounded-md hover:rounded-xl hover:bg-amber-200 hover:font-8xl hover:cursor-pointer  duration-300' onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
            onClick={onClick} disabled={buttonDisabled}>Throw!</button>
    )
}