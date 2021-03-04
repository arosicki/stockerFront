import './Stock.css'
import BtnSecondary from '../../Buttons/BtnSecondary'
import BtnPrimary from '../../Buttons/BtnPrimary'


const Stock = () => (
        <tr className="content-stock">
            <td>1</td>    
            <td>Tesla Inc.</td>
            <td className="content-short">TSLA</td>
            <td className="content-medium">$100</td>
            <td className="content-medium">1000</td>
            <td className="btn-container"><BtnSecondary height="42px" width="100px" text="Sell" /></td>
            <td className="btn-container"><BtnPrimary height="42px" width="100px" text="Buy"  /></td>
        </tr>
    )

export default Stock