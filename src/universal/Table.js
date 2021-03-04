import './Table.css'



const Table = ({head, body, style}) => (
        <table style={style} className="table">
            <thead>
                {head}
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
    )

export default Table;