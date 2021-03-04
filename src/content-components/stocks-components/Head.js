import './Head.css'

const Head = () => (
        <thead className="content-head">
            <tr>
                <th className="number">#</th>
                <th colSpan="2">Stock</th>
                <th>Price</th>
                <th>Available</th>
                <th colSpan="2">Action </th>
            </tr>
        </thead>
    )


export default Head
