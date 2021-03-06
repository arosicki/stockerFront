import Table from '../universal/Table'

const head  = (
    <tr>
        <th className="id">#</th>
        <th colSpan="2" className="very-large" >Company</th>
        <th className="small">Price</th>
        <th className="small">Available</th>
        <th className="large" colSpan="2">Action</th>
    </tr>
)

const style = {
    margin: "0 auto 0 auto"
}



const Center = ({stocks}) => {
    return (
        <Table style={style} body={stocks} head={head} />
    )
}

export default Center
