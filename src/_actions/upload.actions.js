import { locationConstants } from '../_constants';
import { locationService } from '../_services';
import { alertActions } from './';

export function uploadSuccess({ data }) {
    return {
      type: 'UPLOAD_DOCUMENT_SUCCESS',
      data,
    };
  }
  
  export function uploadFail(error) {
    return {
      type: 'UPLOAD_DOCUMENT_FAIL',
      error,
    };
  }
  
  export function uploadDocumentRequest({ file, name }) {  
    let data = new FormData();
    data.append('file', document);
    data.append('name', name);
  
    // return (dispatch) => {
    //   axios.post('/files', data)
    //     .then(response => dispatch(uploadSuccess(response))
    //     .catch(error => dispatch(uploadFail(error)))
    // };
  }