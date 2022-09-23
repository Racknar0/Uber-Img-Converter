import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import './Converter.css';
import icon from '../assets/img/icon_drag.png';
import Basic from '../components/DragNDrop';
import Rez from '../components/Resizer';
import Swal from 'sweetalert2';
import Dashboard from '../services/dashboard';

const Converter = () => {
    const { logout } = useContext(AuthContext);
    const [ref, setRef] = useState(null);
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [imgToDownload, setImgToDownload] = useState('');
    const [size, setSize] = useState({ width: 2880, height: 2304 });
    const [name, setName] = useState('');
    const [inputDimension, setInputDimension] = useState({ width: 0, height: 0 });
    const [outputDimension, setOutputDimension] = useState({ width: 0, height: 0 });

    const dashboard = new Dashboard();

    const clickHandler = () => {
        console.log('ref', ref);
        ref.current.click();
    };


    //fucnion para descargar
    const download = () => {

        if (imgToDownload === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nothing to download!',
            });
            return;
        }

        

        

        //validar que la imagen antes de descargarse pese 10000kb
        const img = new Image();
        /* const inputImg = acceptedFiles[0]; */
        img.src = imgToDownload;
        img.onload = () => {
            setOutputDimension({ width: img.width, height: img.height });

            const imgSize = img.src.length;
            if (imgSize > 10000000) {
                Swal.fire({
                    title: 'Error!',
                    text: 'La imagen pesa mas de 10MB',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            } else {
                //Hora con formato aaaammddhhmmss
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hour = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();

                const fecha =
                    year +
                    'Y' +
                    month +
                    'M' +
                    day +
                    'D_' +
                    hour +
                    'H' +
                    minutes +
                    'M' +
                    seconds +
                    'S';
                console.log(fecha);

                const link = document.createElement('a');
                //poner nombre con formato aaaammddhhmmss
                link.download = fecha + '__' + name;
                link.href = imgToDownload;
                link.click();

                //limpiar el input
            }
        };
    };

    //validar si esta checkeado un radio
    const validateRadio = () => {
        //capturar valor del radio
        const radioValue = document.querySelector(
            'input[name="size"]:checked'
        ).value;
        const input_box = document.querySelectorAll('.input_box');

        if (radioValue === 'default') {
            input_box.forEach((input) => {
                //añadir atributo disabled
                input.setAttribute('disabled', 'disabled');
                setSize({ width: 2880, height: 2304 });
            });
            return;
        }

        if (radioValue === 'custom') {
            //remover disabled al input
            //input_box.removeAttribute('disabled');
            input_box.forEach((input) => {
                input.removeAttribute('disabled');
            });
            setSize({ width: 0, height: 0 });
            return;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (acceptedFiles.length === 0 || !acceptedFiles) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nothing to download!',
            });
            return;
        }

        if (size.width < 30 || size.height < 30) {
            Swal.fire({
                title: 'Error!',
                text: 'Fields cannot be empty or with values ​​less than 30px',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            return;
        }

        //saber dimensiones de acceptedFiles[0]
        console.log(acceptedFiles[0]);
        const img = new Image();
        const inputImg = acceptedFiles[0];
        img.src = URL.createObjectURL(inputImg);
        img.onload = () => {
            setInputDimension({ width: img.width, height: img.height });         
        };
        
        dashboard.createData({
            NameImage: name,
            InitialSize: `${inputDimension.width}x${inputDimension.height}`,
            FinalSize: `${outputDimension.width}x${outputDimension.height}`,
            Date: new Date().toISOString().split('T')[0],
        }, 'ConvertImage');


        download();
    };



    return (
        <>
            <div className="dashboard_container d-flex flex-column justify-content-center align-items-center vh-100">
                <div className="box_converter d-flex justify-content-center flex-column align-items-center">
                    <h2>Uber</h2>
                    <h1 className="dashboard_login text-black fs-1 text-center">
                        Image Converter
                    </h1>

                    <form action="">
                        <button
                            className="button_files mt-3"
                            onClick={clickHandler}
                        >
                            Click Here to Open File(s)
                        </button>

                        <p>or</p>

                        <div>
                            <Basic
                                setRef={setRef}
                                setAcceptedFiles={setAcceptedFiles}
                            />
                        </div>

                        {/* radio button */}
                        <div className="mt-4">
                            <div className="d-flex mb-2">
                                <input
                                    type="radio"
                                    id="default"
                                    value="default"
                                    name="size"
                                    onChange={validateRadio}
                                    defaultChecked
                                />
                                <p className="ms-2 mb-0">
                                    Use Default Resolution (2880 Width x 2304
                                    Height)
                                </p>
                            </div>
                            <div className="d-flex">
                                <input
                                    type="radio"
                                    id="custom"
                                    value="custom"
                                    name="size"
                                    onChange={validateRadio}
                                />
                                <p className="ms-2 mb-0">Custom Resolution</p>
                            </div>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center pt-3">
                                <div className="d-flex gap-2">
                                    <p className="m-0 fw-bold">Width</p>
                                    <input
                                        className="input input_box"
                                        type="number"
                                        value={size.width}
                                        onChange={(e) =>
                                            setSize({
                                                ...size,
                                                width: e.target.value,
                                            })
                                        }
                                        disabled
                                        min={10}
                                        max={5000}
                                    />
                                </div>
                                <div className="d-flex  gap-2">
                                    <p className="m-0 fw-bold">Height</p>
                                    <input
                                        className="input input_box"
                                        type="number"
                                        value={size.height}
                                        onChange={(e) =>
                                            setSize({
                                                ...size,
                                                height: e.target.value,
                                            })
                                        }
                                        disabled
                                        min={10}
                                        max={5000}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            className="button_files buton_convert mt-3"
                            onClick={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            Convert & Download Image(s)
                        </button>
                    </form>
                </div>

                <button className="mt-2" onClick={logout}>
                    Logout
                </button>

                <Rez
                    acceptedFiles={acceptedFiles}
                    setImgToDownload={setImgToDownload}
                    size={size}
                    setName={setName}
                />
            </div>
        </>
    );
};

export default Converter;
