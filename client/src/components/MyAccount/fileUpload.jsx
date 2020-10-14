import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { actionFileUpload } from "../../redux/usersActions";


const FileUpload = (props) => {
    
    const {user} = props;
    const dispatch = useDispatch();

    const [file,setFile]= useState();
    const [fileName, setFileName] = useState('ChooseFile');

    const onChange  = e => {
        setFile(e.target.files[0]);  // en teoria aca capturo el nombre del file
        setFileName(e.target.files[0].name)
    };

    const onSubmit = async e =>{
        e.preventdefault();   
        const formData = new FormData(); // para enviar inputs del form se envia con 
        formData.append('file',file);
    }
    return(
      
            <Fragment>
                <form onSubmit={onSubmit}>
                <div className="custom-file">
                <input 
                type="file" 
                className="custom-file-input" 
                id="customFile"  
                onChange={onChange}/>
                <label className="custom-file-label" htmlFor="customFile">
                    {fileName}
                </label>
                </div>

                <input
                type='submit'
                value='upload' 
                className= 'btn btn-primary btn-block '
                onClick={event => {
                    dispatch(actionFileUpload(fileName,file));
                }}
                    />
                </form>
            </Fragment>
     
    )
}



export default FileUpload;