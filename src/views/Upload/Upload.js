import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { authHeader } from '../../_helpers';
import Loading from '../Loading/loading';
import Paging from '../paging/paging';
import { connect } from 'react-redux';
import { userfileActions } from '../../_actions';
import moment from 'moment';
import $ from "jquery";

class Cards extends Component {
   constructor() {
        super();
        this.state = {
            loading: false,
            currentfiles: [],
            currentPage: 0,
            totalPages: 0,

        };

        this.delete = this.delete.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);

    }
    componentDidMount() {
        this.props.dispatch(userfileActions.getFiles());
    }

    download() {
        var chkArray = [];

        $(".cbFile:checked").each(function () {
            chkArray.push($(this).val());
        });
        debugger;
        var selected;
        selected = chkArray.join(',');

        if (selected.length > 0) {
            setTimeout(() => {
                var a = selected.split(","),
                    i;
                for (i = 0; i < a.length; i++) {
                    const response = {
                        file: a[i],
                    };

                    window.open("https://api.vidiaprint.com/upload" + response.file);
                }
            }, 1000);
        } else {
            alert("Please at least check one of the checkbox");
        }

    }

    delete () {
        let chkArray = [];

        $(".cbFile:checked").each(function () {
            chkArray.push($(this).attr('urlid'));
        })

        if (chkArray.length > 0) {
             //loading
             this.loading(true);
    
            chkArray.forEach(function(el,idx){
                console.log('el',el);

                fetch('https://api.vidiaprint.com/upload/api/userfiles/'+el, {
                    method: 'DELETE',
                    headers: authHeader()
                }).then(
                    response => response,
                ).then(
                    success => {
                        // chekc if all complete
                        if(idx == chkArray.length - 1){  
                            //loading
                            this.loading(false);
                            alert("Delete Success");
                            window.location.reload();
                        }
                    }, 
                ).catch(
                    error => window.location.reload(),
                );

            });


        } else {
            alert("Please at least check one of the checkbox");
        }

    }


    loading(isLoading) {

        this.setState((prevState) => {
            // Important: read `prevState` instead of `this.state` when updating.
            return { loading: isLoading }
        });
    }

    upload(token) {
        const formData = new FormData();
        var data = document.querySelector('input[type="file"]').files[0]; //file
        formData.append('file', data);
        this.loading(true);
            console.log(token);
        fetch('https://api.vidiaprint.com/upload/api/Userfiles', { // Your POST endpoint
            method: 'POST',
            headers:
                {
                    'Authorization': 'Bearer ' + token
                },
            body: formData // This is your file object
        }).then(
            response => response.json(),// if the response is a JSON object
        ).then(
             success => window.location.reload(), // Handle the success response object       
        ).catch(
            error => alert('error') // Handle the error response object
        );
    };

    onPageChanged(data){
        const { userfiles } = this.props;
        const { currentPage, totalPages, pageLimit } = data;
        console.log(data);
        const offset = (currentPage - 1) * pageLimit;
        let currentfile = [] ;
        if(userfiles.items){
             currentfile = [...userfiles.items.slice(offset,offset + pageLimit)];
        }
        this.setState({ currentPage:currentPage,currentfiles:currentfile, totalPages:totalPages });
    };

    render() {
        const { user, userfiles } = this.props;
        const { currentfiles,currentPage,totalPages,loading} = this.state;
        let totalFiles = 0;

        if(userfiles.items){            
            totalFiles = userfiles.items.length;
        }else{
            totalFiles = 0;

        }

        let loading_component;

        if (loading) {
            loading_component = <Loading />
        } else {
            loading_component = "";
        }
 
    return (
      <div className="animated fadeIn"  style={{ textAlign: "center", verticalAlign: "middle" }}>
      {loading_component}
            <div className="resume-item d-flex flex-column flex-md-row mb-5" style={{ textAlign: "center", verticalAlign: "middle", paddingTop:"40px" }}>
              <div className="col-md-3">&nbsp;</div>
              <div className="col-md-6" style={{ textAlign: "center", backgroundColor: "#FCAF41", paddingBottom: "2em",  }}>
                <h4 style={{ color: "#fff", fontSize: "16px", fontFamily: "Avenir Next", textAlign: "center", marginTop: "10px" }} >{user.FullName}'s document</h4>
                <table className="tabled tabled-striped tabled-bordered" style={{ fontSize: "12px",width: "100%" }}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Uploaded On</th>
                      <th>File Name</th>
                    </tr>
                  </thead>
                  {userfiles.loading && <tbody><tr><td colSpan="3">Loading your files ...</td></tr></tbody>}
                                        {userfiles.error && <span className="text-danger">ERROR: {userfiles.error}</span>}
                                        {userfiles.items &&
                                            <tbody>
                                                {currentfiles.map((file, index) =>
                                                    <tr>
                                                        <td><input type="checkbox" name="input" urlid={file.UserFileId} value={file.FileURL} className="cbFile" /> </td>
                                                        <td>{moment(file.CreatedOn).format("DD MMMM YYYY")}
                                                        </td>
                                                        <td>{file.Name}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        }
                                   </table>
                           <div className=" center-div">
                                    {totalFiles > 0 ? ( <Paging
                                            totalRecords={totalFiles}
                                            pageLimit={10}
                                            pageNeighbours={1}
                                            onPageChanged={this.onPageChanged}
                                            /> ): null 
                                    }
                                    </div>
                <br />
               <a className="btn-doc" id="btnDownload" onClick={this.download} style={{ color: "#fff", fontSize: "12px", marginRight: "5px", cursor: "pointer" }}>DOWNLOAD</a>
                                    <a className="btn-del" onClick={this.delete} style={{ color: "#fff", fontSize: "12px", cursor: "pointer" }}>DELETE</a>
                                   
                                    <div className="col-md-12 upload auto">
                                        <label htmlFor="choose" style={{ color: "#FFF", textAlign: "center", cursor: "pointer" }}><br />UPLOAD</label>
                                        <form encType="multipart/form-data" action="">
                                            <input type="file" name="upload" id="choose" accept=".jpg, .png, .jpeg, .doc, .docx, .ppt, .pptx, .xls, .pdf" href=""
                                                onChange={() => this.upload(user.access_token)} />
                                        </form>
                                    </div>
              </div>
            </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
    const { authentication, userfiles, transaction } = state;
    const { user } = authentication;
    // const {location} = state;
    return {
        user,
        userfiles,
        transaction
    };
}
export default connect(mapStateToProps)(Cards);