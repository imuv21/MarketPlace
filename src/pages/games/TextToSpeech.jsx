import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const TextToSpeech = () => {

    const [text, setText] = useState('');
    const [voices, setVoices] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const populateVoiceList = () => {
            const voices = synth.getVoices();
            setVoices(voices);
            setLanguages([...new Set(voices.map((voice) => voice.lang))]);
        };

        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoiceList;
        } else {
            populateVoiceList();
        }
    }, []);

    const handleSpeak = () => {
        if (isSpeaking) return;
        setIsSpeaking(true);

        if ('speechSynthesis' in window) {
            if (text.trim() !== '') {
                const speech = new SpeechSynthesisUtterance(text);
                speech.lang = selectedLanguage;
                const voice = voices.find((voice) => voice.name === selectedVoice);
                if (voice) {
                    speech.voice = voice;
                }
                window.speechSynthesis.speak(speech);
                speech.onend = () => {
                    setIsSpeaking(false);
                };
                speech.onerror = (event) => {
                    alert('Speech synthesis error:', event.error);
                };
            } else {
                alert('Please enter some text to speak.');
            }
        } else {
            alert('Your browser does not support speech synthesis.');
        }
    };

    return (
        <Fragment>
            <Helmet>
                <title>Text To Speech Page</title>
            </Helmet>
            <div className='page flexcol g5 center'>
                <h1>Text to Speech</h1>

                <label htmlFor="language">Select Language:</label>
                <select id="language" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                    {languages.map((lang, index) => (
                        <option key={index} value={lang}>{lang}</option>
                    ))}
                </select>

                <label htmlFor="voice">Select Voice:</label>
                <select id="voice" value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
                    {voices.map((voice, index) => (
                        <option key={index} value={voice.name}>{voice.name} ({voice.lang})</option>
                    ))}
                </select>

                <textarea value={text} onChange={(e) => setText(e.target.value)} rows="10" cols="30" placeholder="Enter text to hear..." />
                <button onClick={handleSpeak} disabled={isSpeaking}>{isSpeaking ? 'Speaking...' : 'Speak'}</button>
            </div>
        </Fragment>
    );
};

export default TextToSpeech;
