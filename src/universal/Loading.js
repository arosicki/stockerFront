import loading from './../img/loading.svg'
import './Loading.css'



const Loading = ({size}) => {
    return (
        <img src={loading} style={{height: size}} className="loading-gif" alt="loading"/>
    )
}

export default Loading
