import React, { Component } from 'react';
import Paging from './paging/paging';
import { connect } from 'react-redux';
import { userfileActions } from '../../_actions';
import moment from 'moment';
import $ from "jquery";

class Cards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currenttransaction: [],
            currentPage: 0,
            totalPages: 0,
        };

        this.onPageChanged = this.onPageChanged.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userfileActions.getTransaction());
    }

    onPageChanged(data) {
        const { transaction } = this.props;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;

        let currenttransaction = [];


        if (transaction.items) {
            currenttransaction = [...transaction.items.slice(offset, offset + pageLimit)];
        }

        this.setState({ currentPage: currentPage, currenttransaction: currenttransaction, totalPages: totalPages });
    };

    render() {
        const { transaction } = this.props

        const { currenttransaction } = this.state;


        let totalTransactions = 0;

        if (transaction.items) {
            totalTransactions = transaction.items.length;
        } else {
            totalTransactions = 0;

        }

        return (
            <div className="animated fadeIn" style={{ textAlign: "center", verticalAlign: "middle" }}>
                <h5 style={{ textAlign: "center", color: "#fff", fontSize: "16px" }}>TRANSACTION HISTORY</h5>
                <table className="table table-striped table-bordered" style={{ fontSize: "12px", marginLeft: '15%', width: '75%', backgroundColor:'#fcAf41' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Qty</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {transaction.loading && <tbody><tr><td colSpan="3">Loading your files ...</td></tr></tbody>}
                    {transaction.error && <span className="text-danger">ERROR: {transaction.error}</span>}
                    {transaction.items &&
                        <tbody>
                            {currenttransaction.map((file, index) =>
                                <tr key={`trasaction${index}`}>
                                    <td>{moment(file.InvoiceDate).format("DD MMMM YYYY HH:mm")}
                                    </td>
                                    <td>{file.JobType}</td>
                                    <td>{file.NumOfPages}</td>
                                    <td>{file.Total}</td>
                                    <td>{file.PaymentStatus}</td>
                                </tr>
                              
                            )}
                             
                        </tbody>
                    }
                </table>
                <div className="center-div">
                    {totalTransactions > 0 ? (<Paging
                        totalRecords={totalTransactions}
                        pageLimit={10}
                        pageNeighbours={1}
                        onPageChanged={this.onPageChanged}
                    />) : null
                    }
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { authentication, transaction } = state;
    const { user } = authentication;
    // const {location} = state;
    return {
        user,
        transaction
    };
}
export default connect(mapStateToProps)(Cards);