import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import landing from '../../../img/background.jpg';
import logo2 from '../../../img/logo2.png';
import { connect } from 'react-redux';
import { history } from '../../../_helpers';
import { alertActions } from '../../../_actions';
import { userActions } from '../../../_actions';

class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

  render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        const { alert } = this.props;
    return (
      <div className="app flex-row align-items-center land" style={{ backgroundImage: `url(${landing})`, backgroundSize: 'cover' }} >
     <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                        <div  className={'form-group col-md-10' + (submitted && !username ? ' has-error' : '')}>                      
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="username" placeholder="Email/Phone" value={username} onChange={this.handleChange}/>
                      </InputGroup>
                       {submitted && !username &&
                                            <div style={{paddingTop: "-10px",}} className="help-block">Username is required</div>
                                        }
                        </div>
                      <div  className={'form-group col-md-10' + (submitted && !password ? ' has-error' : '')}>                     
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={this.handleChange}/>
                                  </InputGroup>
                        {submitted && !password &&
                                            <div className="help-block">Password is required</div>
                                        }
                  </div>
                       <Row>
                        {alert.message &&
                          <div className="row col-md-12 ">
                              <p className="alert-danger auto" >Username or Password is incorrect </p>
                          </div>
                         }
                      </Row>
                      <Row>
                        <Col xs="6">
                         {!loggingIn &&  <Button color="primary" className="px-4">Login</Button>
                                    }
                                    {loggingIn &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                        </Col>
                        <Col xs="6" className="text-right">
                       </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none" style={{ width: 44 + '%', backgroundColor: "#F79520" }}>
                  <Row>
                    <img src={logo2} style={{ width: "35%", height: "35%", margin: "auto" }} ></img>
                  </Row>
                  <CardBody className="text-center">
                    <div>
                      <p style={{margin:"20px"}}>Welcome to the Vidiaprint. Please Register if you don't have an account.</p>
                      <Link to="/register">
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

//const connectedLogin = connect(mapStateToProps)(Login);
export default  connect(mapStateToProps)(Login);//export default Login;