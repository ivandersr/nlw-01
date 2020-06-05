import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {

    const[selectedFileUrl, setSelecetedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        setSelecetedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div {...getRootProps()} className='dropzone'>
            <input {...getInputProps()} accept='image/*' />
            {
                selectedFileUrl
                    ? <img src={selectedFileUrl} alt="Point thumbnail"/>
                    : <p><FiUpload />Arraste e solte, ou clique para selecionar sua imagem</p>
            }
        </div>
    )

}

export default Dropzone;