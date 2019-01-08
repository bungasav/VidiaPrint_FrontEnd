import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import landing from '../../../img/background.jpg';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../../_helpers';
import { alertActions } from '../../../_actions';
import { userActions } from '../../../_actions';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import Moment from 'react-moment';

class Register extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment()
        };
        this.handleChangea = this.handleChangea.bind(this);

        this.state = {
            user:
                {
                    email: '',
                    password: '',
                    confirmpassword: '',
                    phone: '',
                    fullname: '',
                    birthdate: '',
                    gender: ''
                },
            submitted: false,
            Phone: '',
            Pass: '',
            Confirm:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    handleChangea(date) {
        this.setState({
            startDate: date,
            date
        });
        const input = document.getElementById('birthdate');
        input.value = moment(date).format("MM-DD-YYYY");
    }


    handleChange(e) {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user:
                {
                    ...user,
                    [name]: value
                }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("mulai submit");

        this.setState({ submitted: true });
        const birth = document.getElementById('birthdate').value;
        const { user } = this.state;
        user.birthdate = birth;
        const { dispatch } = this.props;
        if (user.email && user.password && user.phone && user.fullname && user.birthdate && user.gender) {
            dispatch(userActions.register(user));
        }
        console.log(user.birthdate);
        console.log(user.gender);
    }

    handleChanges(evt) {
        const Phone = (evt.target.validity.valid) ? evt.target.value : this.state.Phone;

        this.setState({ Phone });
    }

    handleChange1(e)
    {
        const Pass = (e.target.validity.valid) ? e.target.value : this.state.Pass;

        this.setState({ Pass });
    }

    
    handleChange2(e)
    {
        const Confirm = (e.target.validity.valid) ? e.target.value : this.state.Confirm;

        this.setState({ Confirm });
    }


    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        const { alert } = this.props;
    return (
      <div className="app flex-row align-items-center"  style={{ backgroundImage: `url(${landing})`, backgroundSize: 'cover' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form className={'form'} onSubmit={this.handleSubmit}>
                   {alert.message &&
                                <div className="row col-md-12">
                                    <div className={`alert auto ${alert.type}`}>{alert.message}</div>
                                </div>
                            }
                    <h1 style={{color:"gray"}}>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className={' auto form-group' + (submitted && !user.password ? ' has-error' : '')}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="txtName" className={'form-control'} style={{ textAlign: "center" }} placeholder="Name" name="fullname" onChange={this.handleChange}  />
                    </InputGroup>
                     {submitted && !user.fullname &&
                                        <div className="help-block">Name is required</div>
                                    }
                    <InputGroup className={' auto form-group' + (submitted && !user.password ? ' has-error' : '')}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="txtEmail" className={'form-control'} style={{ textAlign: "center" }} placeholder="Email" name="email" onChange={this.handleChange}/>
                    </InputGroup>
                      {submitted && !user.email &&
                                        <div className="help-block">Email is required</div>
                                    }
                    <InputGroup className={' auto form-group' + (submitted && !user.password ? ' has-error' : '')}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="txtPhone" pattern="[0-9]*" maxLength="15" onInput={this.handleChanges.bind(this)} value={this.state.Phone} className={'form-control'} style={{ textAlign: "center" }} placeholder="Phone" name="phone" onChange={this.handleChange} />
                    </InputGroup>
                    {submitted && !user.phone &&
                                        <div className="help-block">Phone is required</div>
                                    }
                    <InputGroup className={'auto form-group'}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-calendar"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <DatePicker
                      onChange={this.handleChangea}
                       value={this.state.date}
                      maxDate={new Date()}
                        />
                    </InputGroup>
                  
                    <Input type="hidden" name="birthdate" id="birthdate" onClick={this.handleChange} />                     
                     {submitted && !user.birthdate &&
                                    <div style={{ marginLeft: "16px", width: "43%" }} className="help-block">Birth Date is required</div>
                                }
                    <InputGroup className={' auto form-group'}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-intersex"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                     <Input type="select"  id="gender" name="gender" style={{ width: "40%" }} onChange={this.handleChange}>
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        </Input>
                    </InputGroup>
                    {submitted && !user.gender &&
                                    <div className="help-block">Gender is required</div>
                                }
                    <InputGroup className={' auto form-group' + (submitted && !user.password ? ' has-error' : '')}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="txtPassword" pattern="[0-9]*" onInput={this.handleChange1.bind(this)} value={this.state.Pass}  className={'form-control'} style={{ textAlign: "center" }} placeholder="PIN" name="password" onChange={this.handleChange}  />
                    </InputGroup>
                      {submitted && !user.password &&
                                        <div className="help-block">PIN is required</div>
                                    }
                                    {submitted && user.password.length < 6 &&
                                        <div className="help-block">Minimum character is 6!</div>
                                    }
                    <InputGroup className={' auto form-group' + (submitted && !user.password ? ' has-error' : '')}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="txtConfirm" pattern="[0-9]*" onInput={this.handleChange2.bind(this)} value={this.state.Confirm}  className={'form-control'} style={{ textAlign: "center" }} placeholder="Confirm PIN" name="confirmpassword" onChange={this.handleChange}  />
                    </InputGroup>
                     {submitted && !user.confirmpassword &&
                                        <div className="help-block">Confirm PIN is required</div>
                                    }
                                    {submitted && user.password != user.confirmpassword &&
                                        <div className="help-block">PIN is not match</div>
                                    }
                    <Button color="success" block>Create Account</Button>
                    {registering &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                    <hr/>
                    <center>
                    <p>Already have account ? <Link to="/login"><a>Login</a> </Link> </p></center>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    const { alert } = state;
    return {
        registering,
        alert
    };
}

export default  connect(mapStateToProps)(Register);