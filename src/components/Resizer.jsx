import React, { Component, useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';

const Rez = ({ acceptedFiles, setImgToDownload, size, setName }) => {
    const [newImage, setNewImage] = useState('');
    const [newImages, setNewImages] = useState([]);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            //console.log('file', file);

            if (!file) {
                return;
            }

            Resizer.imageFileResizer(
                file,
                size.width,
                size.height,
                'JPEG',
                100,
                0,
                (uri) => {
                    /* if (acceptedFiles.length > 1) {
                    
                    setNewImages([...newImages, uri]);
                    //console.log(newImages);
                    return
                } */

                    setNewImage(uri);
                    setImgToDownload(uri);
                },
                'base64',
                size.width,
                size.height,
            );
        });

    /* const resizeAll = (files) => {
        files.map((file) => {
            Resizer.imageFileResizer(
                file,
                size.width,
                size.height,
                'JPEG',
                0,
                0,
                (uri) => {
                    setNewImages([...newImages, uri]);
                },
                'base64'
            );
        });

        console.log(newImages);
    }; */



    useEffect(() => {
        resizeFile(acceptedFiles[0])

        setName(acceptedFiles[0]?.name);
    }, [acceptedFiles, size]);


    return (
        <div className="Rez">
            {/* {newImage && (
                <>
                    <img src={newImage} alt="new" />
                </>
            )}

            {newImages.length > 1 && (
                <>
                    {newImages.map((image, index) => (
                        <img key={index} src={image} alt="new" />
                    ))}
                </>
            )} */}
        </div>
    );
};

export default Rez;
