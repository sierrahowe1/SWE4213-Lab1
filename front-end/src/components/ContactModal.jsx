import React, { useState } from 'react';



const ContactModal = ({ isOpen, onClose, email, title }) => {

    const [copy, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (err) {
            console.err("Email could not be copied.");
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Interested in {title}?</h2>
                    <p className="text-slate-400 mb-6">
                        Send the seller an email to arrange a pickup or for additional information!
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-2">
                        <button
                        onClick={handleCopy}
                        className="ml-auto bg-slate-700 absolute top-38 left-85 hover:bg-slate-600 text-white text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded transition-colors border border-slate-600 active:scale-95">
                        {copy ? 'Copied!' : 'Copy'}
                         
                        </button>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Seller Email</p>
                        <p className="text-lg text-blue-400 font-mono select-all">{email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;