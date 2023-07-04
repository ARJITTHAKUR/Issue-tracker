import "./style.css"
interface props {
    text : string,
    onClick ?: (e : React.MouseEvent<HTMLButtonElement>)=> void,
    loading ?: boolean
}

export default function Button({text, onClick} : props){

    const load = <span className="loading"><span>span</span></span>

    return <>
        <button className="btn-class" onClick={(e)=>onClick ? onClick(e) : null} tabIndex={0}>
            { text }
        </button>
    </>
}