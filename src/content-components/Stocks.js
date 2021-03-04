import Stock from './stocks-components/Stock'
import Head from './stocks-components/Head'
import './Stocks.css'

const Content = () => (
    <div>
        <table className="content">
            <Head />
            <tbody>
            <Stock />
            <Stock />
            <Stock />
            <Stock />
            <Stock />
            </tbody>
        </table>
    </div>
    )

export default Content
