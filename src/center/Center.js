import Table from '../universal/Table'
import {BuyStockPanel, SellStockPanel} from '../side-panels/SidePanels'

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



const Center = ({stocks, logged, selectedStock}) => {
    
    return (
        <>
        <SellStockPanel selectedStock={selectedStock} logged={logged} />
        <BuyStockPanel selectedStock={selectedStock} logged={logged} />
        <Table style={style} body={stocks} head={head} />
        </>
    )
}

export default Center
