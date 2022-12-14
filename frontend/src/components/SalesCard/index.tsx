import { useEffect, useState } from 'react';
import NotificationButton from '../NotificationButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Sale } from '../../models/sale';

function SalesCard() {
    const date = new Date(new Date().setDate(new Date().getDate() - 365));

    const [from, setFrom] = useState(date);
    const [to, setTo] = useState(new Date());
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const dmin = from.toISOString().slice(0, 10);
        const dmax = to.toISOString().slice(0, 10);

        axios.get(`${BASE_URL}/sales?from=${dmin}&to=${dmax}`).then(response => {
            setSales(response.data.content);
        });
    }, [from, to]);

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={from}
                        onChange={(date: Date) => { setFrom(date) }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={to}
                        onChange={(date: Date) => { setTo(date) }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length > 0 && sales.map((sale, index) => {
                            return (
                                <tr key={index}>
                                    <td className="show992">{sale.id}</td>
                                    <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.sellerName}</td>
                                    <td className="show992">{sale.visited}</td>
                                    <td className="show992">{sale.deals}</td>
                                    <td>R$ {sale.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <div className="dsmeta-red-btn">
                                                <NotificationButton saleId={sale.id} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default SalesCard;