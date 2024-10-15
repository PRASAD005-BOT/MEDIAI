import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState(false);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        // Getting current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            // Setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(formattedTime);

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots((prev) => [...prev, timeSlots]);
        }

        setLoading(false);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment');
            return navigate('/login');
        }

        const date = docSlots[slotIndex][0].datetime;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const slotDate = day + "_" + month + "_" + year;

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getDoctosData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    return loading ? (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Loading...</p>
        </div>
    ) : docInfo ? (
        <div className="p-4">
            {/* ---------- Doctor Details ----------- */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div>
                    <img className="bg-primary w-full sm:max-w-72 rounded-lg shadow-lg" src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-lg transition-all hover:shadow-xl">
                    {/* ----- Doc Info: name, degree, experience ----- */}
                    <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" /></p>
                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className="py-0.5 px-2 border text-xs rounded-full bg-gray-200 hover:bg-gray-300">{docInfo.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">About <img className="w-3" src={assets.info_icon} alt="" /></p>
                        <p className="text-sm text-gray-600 max-w-[700px] mt-1">{docInfo.about}</p>
                    </div>

                    <p className="text-gray-600 font-medium mt-4">Appointment fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span></p>
                </div>
            </div>

            {/* Booking slots */}
            <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
                <p>Booking slots</p>
                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSlotIndex(index)}
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${slotIndex === index ? 'bg-primary text-white scale-105' : 'border border-[#DDDDDD] hover:bg-gray-100'}`}
                        >
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                        <p
                            key={index}
                            onClick={() => setSlotTime(item.time)}
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4] hover:bg-gray-100'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6 transition-all duration-300 ease-in-out hover:bg-secondary">
                    Book an appointment
                </button>
            </div>

            {/* Listing Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null;
};

export default Appointment;