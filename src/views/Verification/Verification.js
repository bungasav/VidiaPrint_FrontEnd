import React from 'react';
import { Link, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import logo2 from '../../img/background.jpg';
import location from "jquery";


class VerifPage extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount;
    }

    componentDidMount() {
        var path = window.location.href;        
        console.log(path);
        this.props.dispatch(userActions.confirm(path));
    }

    render() {
        const { confirm } = this.props;
        const { alert } = this.props;
        return (
            <div className="app flex-row align-items-center"  style={{ backgroundImage: `url(${logo2})`, backgroundSize: 'cover' }}>
                <h3 id="counter" style={{ color: "#fff" }}>
                    {alert.message &&
                        <div className="row col-md-12">
                            <div>{alert.message}</div>
                        </div>
                    }
                </h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { confirm } = state;
    const { alert } = state;    
    return {
        confirm,
        alert
    };
}

export default connect(mapStateToProps)(VerifPage);
