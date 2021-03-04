import Stocks from './content-components/Stocks'
import UserPanel from './content-components/UserPanel'
import BuyStock from './content-components/BuyStock'
import './Content.css'

const Content = () => (
<>
    <UserPanel />
    <BuyStock />
    <Stocks />
</>
)

export default Content
