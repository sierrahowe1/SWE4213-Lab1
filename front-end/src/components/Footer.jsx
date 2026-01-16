// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        // bg-slate-900 or bg-gray-800 provides a professional look for the lab
        <footer className="bg-slate-900 text-gray-300 py-6 mt-auto w-full border-t border-slate-800">

            {/* 1. 'w-full' ensures it spans the entire screen width.
          2. 'px-[50px]' adds the specific 50px padding you requested to the sides.
          3. 'flex items-center' keeps the text vertically aligned.
      */}
            <div className="w-full px-[50px] flex items-center justify-between">

                {/* --- Left Section --- */}
                {/* flex-1 ensures this section takes up space to help center the middle text */}
                <div className="flex-1 flex justify-start"></div>

                {/* --- Middle Section --- */}
                {/* This will remain perfectly centered relative to the whole screen */}
                <div className="flex-1 text-center">
                    <h2 className="text-lg font-semibold text-white tracking-wide">
                        UNB Buy and Sell
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">
                        Student Marketplace
                    </p>
                </div>

                {/* --- Right Section --- */}
                {/* We keep this empty flex-1 div so the middle section stays centered */}
                <div className="flex-1"></div>

            </div>
        </footer>
    );
};

export default Footer;