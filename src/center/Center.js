import Table from '../universal/Table'
import Button from '../universal/Button'

const testData = {"result":[{"id":1,"name":"Tesla Inc.","short":"TSLA","price":123,"number":"10000"},{"id":2,"name":"ZSL sp. z o.o.","short":"ZSL","price":1223,"number":"10000"},{"id":3,"name":"Yombu","short":"NASDAQ","price":643,"number":"10000"},{"id":4,"name":"Avamm","short":"NYSE","price":364,"number":"10000"},{"id":5,"name":"Jaloo","short":"NYSE","price":63,"number":"10000"},{"id":6,"name":"Babbleopia","short":"NYSE","price":73,"number":"10000"},{"id":7,"name":"Rhynoodle","short":"NYSE","price":856,"number":"10000"},{"id":8,"name":"Linklinks","short":"NASDAQ","price":95,"number":"10000"},{"id":9,"name":"Tambee","short":"NYSE","price":234,"number":"10000"},{"id":10,"name":"Yambee","short":"NASDAQ","price":36,"number":"10000"},{"id":11,"name":"Avaveo","short":"NASDAQ","price":1442,"number":"10000"},{"id":12,"name":"Brightbean","short":"NYSE","price":564,"number":"10000"},{"id":13,"name":"Chatterpoint","short":"NYSE","price":975,"number":"10000"},{"id":14,"name":"Zoombox","short":"NYSE","price":532,"number":"10000"},{"id":15,"name":"Wordify","short":"NYSE","price":643,"number":"10000"},{"id":16,"name":"Buzzdog","short":"NYSE","price":634,"number":"10000"},{"id":17,"name":"Wordtune","short":"NYSE","price":1243,"number":"10000"},{"id":18,"name":"Wordify","short":"NASDAQ","price":345,"number":"10000"},{"id":19,"name":"Skipfire","short":"NASDAQ","price":972,"number":"10000"},{"id":20,"name":"Realcube","short":"NYSE","price":876,"number":"10000"},{"id":21,"name":"Zoonder","short":"NYSE","price":675,"number":"10000"},{"id":22,"name":"Ooba","short":"NASDAQ","price":2132,"number":"213"},{"id":23,"name":"Vimbo","short":"NASDAQ","price":532,"number":"223"},{"id":24,"name":"Photobug","short":"NYSE","price":222,"number":"2231"},{"id":25,"name":"Abata","short":"NASDAQ","price":22132,"number":"23"}],"success":true};

const btnStyle = {
    width: "100px",
    height: "42px"
}

let iteration = 0;
const displayData = testData.result.map(({id, name, short, price, number}) => {
    iteration++
    return (
        <tr key={id}>
            <td className="id">{iteration}</td>
            <td className="medium">{name}</td>
            <td className="small">{short}</td>
            <td className="small">{price}</td>
            <td className="small">{number}</td>
            <td className="button" style={{padding: 0, width: "100px"}} ><Button text="Sell" type="secondary" style={btnStyle} /></td>
            <td className="button" style={{padding: 0, width: "100px"}}><Button text="Buy" type="primary" style={btnStyle} /></td>
        </tr>
    )

})

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



const Center = () => {
    return (
        <Table style={style} body={displayData} head={head} />
    )
}

export default Center
