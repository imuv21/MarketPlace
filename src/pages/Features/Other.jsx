import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const Other = () => {

    const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
    const ends = [100, 150, 200, 250, 300];
    const duration = 3000;
    const numberRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => setCounts(prev => prev.map((_, i) => entry.isIntersecting ? prev[i] : 0))),
            { threshold: 0.5 }
        );
        if (numberRef.current) observer.observe(numberRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const totalSteps = 100;
        const intervalTime = duration / totalSteps;
        const increments = ends.map(end => end / totalSteps);
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setCounts(prev => prev.map((count, i) => Math.min(count + increments[i], ends[i])));
            if (currentStep >= totalSteps) clearInterval(timer);
        }, intervalTime);

        return () => clearInterval(timer);
    }, [counts]);



    return (
        <Fragment>
            <Helmet>
                <title>Other | MarketPlace</title>
                <meta name="description" content="It's a rough page kinda"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/other" />
            </Helmet>

            <div className='page flexcol g10 center' style={{ height: '150vh' }}>
                <div ref={numberRef} style={{ marginTop: '100vh', fontSize: '50px', textAlign: 'center' }}>

                    {counts.map((count, i) => <div key={i}>Count {i + 1}: {Math.floor(count)}</div>)}
                    
                </div>
            </div>
        </Fragment>
    )
};

export default Other;