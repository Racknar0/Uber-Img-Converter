import React, { useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import icon from '../assets/img/icon_drag.png';
import '../pages/Converter.css';

function Basic(props) {
    const ref = useRef(null);
    const setAcceptedFiles = props.setAcceptedFiles;

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
        useDropzone({
            accept: {
                'image/jpeg': [],
                'image/png': [],
                'image/jpg': [],
                'image/gif': [],
                'image/webp': [],
            },
            maxFiles: 1,
            maxSize: 1000000,
        });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    useEffect(() => {
        props.setRef(ref);
    }, [props]);

    useEffect(() => {
        setAcceptedFiles(acceptedFiles);
    }, [acceptedFiles]);

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    /* useEffect(() => {
        setFiles(files);
    }, [acceptedFiles]); */
    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />

                <div
                    ref={ref}
                    className="drag_drop_container w-100 d-flex flex-column justify-content-center align-items-center"
                >
                    <img className="mt-4" src={icon} alt="" />
                    <p>Drag or Drop the Image(s) Here</p>
                    <em>(Only JPG, PNG, GIF o WEBP images will be accepted)</em>
                </div>
            </div>

            {/* validar si hay archivos */}
            {files.length > 0 ? (
                <aside>
                    <h5 className="mt-4">Files:</h5>
                    <ul>{files}</ul>
                </aside>
            ) : null}

            {/* validar si hay archivos rechazados */}
            {fileRejectionItems.length > 0 ? (
                <aside>
                    <h5>File Rejections:</h5>
                    <ul>{fileRejectionItems}</ul>
                </aside>
            ) : null}
        </section>
    );
}

export default Basic;
