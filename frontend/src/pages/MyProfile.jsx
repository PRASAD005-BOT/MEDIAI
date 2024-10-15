import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [showQRCode, setShowQRCode] = useState(false);
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            setUserData(storedUserData);
        }
    }, [setUserData]);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);
            formData.append('aadhaarNumber', userData.aadhaarNumber);
            if (userData.abhaId) {
                formData.append('abhaId', userData.abhaId);
            }
            if (image) {
                formData.append('image', image);
            }
            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                localStorage.setItem('userData', JSON.stringify({ ...userData, image }));
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const toggleQRCode = () => {
        setShowQRCode(!showQRCode);
    };

    const generateAbhaId = (aadhaarNumber) => {
        if (!aadhaarNumber) return '';
        return `ABHA${aadhaarNumber.slice(-4)}`;
    };

    const qrCodeValue = JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        gender: userData.gender,
        dob: userData.dob,
        abhaId: userData.abhaId || generateAbhaId(userData.aadhaarNumber),
        aadhaarNumber: userData.aadhaarNumber,
    });

    const shareQRCode = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Share My Profile QR Code',
                    text: 'Scan this QR code to access my profile details.',
                    url: qrCodeValue, // You can share a link or just the QR code as data
                });
                toast.success('QR Code shared successfully!');
            } catch (error) {
                toast.error('Error sharing QR Code: ' + error.message);
            }
        } else {
            toast.error('Web Share API is not supported in your browser.');
        }
    };

    const handleAadharChange = (e) => {
        const aadhaarNumber = e.target.value;
        setUserData((prev) => ({ ...prev, aadhaarNumber }));

        if (aadhaarNumber) {
            const generatedAbhaId = generateAbhaId(aadhaarNumber);
            setUserData((prev) => ({ ...prev, abhaId: generatedAbhaId }));
        } else {
            setUserData((prev) => ({ ...prev, abhaId: '' }));
        }
    };

    const downloadProfile = async () => {
        const element = document.getElementById('profile-content');
        const qrElement = document.getElementById('qr-code');

        if (element) {
            const canvas = await html2canvas(element);
            const qrCanvas = qrElement ? await html2canvas(qrElement) : null;

            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = canvas.width + (qrCanvas ? qrCanvas.width : 0);
            finalCanvas.height = Math.max(canvas.height, qrCanvas ? qrCanvas.height : 0);
            const finalCtx = finalCanvas.getContext('2d');
            finalCtx.drawImage(canvas, 0, 0);
            if (qrCanvas) {
                finalCtx.drawImage(qrCanvas, canvas.width, (finalCanvas.height - qrCanvas.height) / 2);
            }

            const dataUrl = finalCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'profile_with_qr.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            toast.error('Profile content not found.');
        }
    };

    return userData ? (
        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
            {isEdit ? (
                <label htmlFor='image'>
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
            ) : (
                <img className='w-36 rounded' src={userData.image} alt="" />
            )}

            {isEdit ? (
                <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
            ) : (
                <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
            )}

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            <div id='profile-content'>
                <div>
                    <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                        <p className='font-medium'>Email id:</p>
                        <p className='text-blue-500'>{userData.email}</p>
                        <p className='font-medium'>Phone:</p>
                        {isEdit ? (
                            <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        ) : (
                            <p className='text-blue-500'>{userData.phone}</p>
                        )}
                        <p className='font-medium'>Address:</p>
                        {isEdit ? (
                            <textarea
                                className='bg-gray-50'
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: { line1: e.target.value.split('\n')[0], line2: e.target.value.split('\n')[1] || '' }
                                }))}
                                value={`${userData.address.line1}\n${userData.address.line2}`}
                                rows={3}
                            />
                        ) : (
                            <p className='text-gray-500'>{userData.address.line1} <br />{userData.address.line2}</p>
                        )}
                    </div>
                </div>

                <div className='mt-3'>
                    <p className='text-gray-600 underline'>GENDER AND DOB</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                        <p className='font-medium'>Gender:</p>
                        {isEdit ? (
                            <select className='bg-gray-50' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                                <option value=''>Select</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        ) : (
                            <p className='text-blue-500'>{userData.gender}</p>
                        )}
                        <p className='font-medium'>Date of Birth:</p>
                        {isEdit ? (
                            <input type='date' className='bg-gray-50' value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
                        ) : (
                            <p className='text-blue-500'>{userData.dob}</p>
                        )}
                    </div>
                </div>

                <div className='mt-3'>
                    <p className='text-gray-600 underline'>AADHAAR NUMBER</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                        <p className='font-medium'>Aadhaar Number:</p>
                        {isEdit ? (
                            <input type='text' className='bg-gray-50' value={userData.aadhaarNumber} onChange={handleAadharChange} />
                        ) : (
                            <p className='text-blue-500'>{userData.aadhaarNumber}</p>
                        )}
                        <p className='font-medium'>ABHA ID:</p>
                        <p className='text-blue-500'>{userData.abhaId || generateAbhaId(userData.aadhaarNumber)}</p>
                    </div>
                </div>
            </div>

            <div className='flex justify-between mt-5'>
                <button className='bg-teal-500 text-white py-1 px-3 rounded' onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}>
                    {isEdit ? 'Update' : 'Edit'}
                </button>
                <div className='flex space-x-4'>
                    <button className='bg-teal-500 text-white py-1 px-3 rounded' onClick={downloadProfile}>Download Profile</button>
                    <button className='bg-teal-500 text-white py-1 px-3 rounded' onClick={toggleQRCode}>
                        {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
                    </button>
                </div>
            </div>

            {showQRCode && (
                <div id='qr-code' className='mt-5 flex justify-center'>
                    <QRCode value={qrCodeValue} size={128} />
                </div>
            )}

            {showQRCode && (
                <div className='mt-2 flex justify-center'>
                    <button className='bg-teal-500 text-white py-1 px-3 rounded' onClick={shareQRCode}>Share QR Code</button>
                </div>
            )}
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default MyProfile;
