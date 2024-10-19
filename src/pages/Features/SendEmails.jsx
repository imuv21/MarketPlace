import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailsInBulk } from '../../slices/featuresSlice';
import toast from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const SendEmails = () => {

    const dispatch = useDispatch();
    const { emailMessage, emailStatus } = useSelector((state) => state.features);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailArray, setEmailArray] = useState('');
    const [subject, setSubject] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        const emails = emailArray.split(',').map(email => email.trim()).filter(email => email);

        if (!emails.length) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Eamils are not found!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        if (!subject || !msg) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> Subject and message are required!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await dispatch(sendEmailsInBulk({ emailArray: emails, subject, msg })).unwrap();
            if (emailStatus === "success") {
                toast(<div className='flex center g5'> < VerifiedIcon /> {emailMessage}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {emailMessage}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> {error.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setEmailArray('');
            setSubject('');
            setMsg('');
            setIsSubmitting(false);
        }
    }

    return (
        <Fragment>
            <Helmet>
                <title>Send Emails in Bulk | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/send-bulk-emails" />
            </Helmet>

            <div className='page flex start-center'>
                <div className="flexcol start-center g10 wh">
                    <form className="flexcol center g10 wh" onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter emails separated by commas...' value={emailArray} onChange={(e) => setEmailArray(e.target.value)} />
                        <input type="text" placeholder='Enter subject...' value={subject} onChange={(e) => setSubject(e.target.value)} />
                        <textarea placeholder='Enter your message...' value={msg} rows={20} onChange={(e) => setMsg(e.target.value)}></textarea>
                        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
};

export default SendEmails;