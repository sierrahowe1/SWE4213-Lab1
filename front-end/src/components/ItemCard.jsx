import React from 'react';

const ItemCard = ({ id, image, title, price, onView, deleteCard, created_at }) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col h-full">

           

            {/* --- Product Details Section --- */}
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-white font-medium text-base truncate mb-1">
                    {title}
                </h3>

                <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-lg font-bold text-white">
                        ${price}
                    </span>

                    
                </div>

                {deleteCard && (<button onClick = {() => {deleteCard(id)}} 
                    className = "absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        x
                    </button>

                    )}

                    <h5 className="text-slate-500 text-[10px] uppercase tracking-wide text-right">
                        {" "}
                        {new Date(created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </h5>


                     {/* --- Product Image Section --- */}
            <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
                <img
                    src={image || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>


            <div className="flex">
                <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onView(); // Triggers the modal in App.jsx
                        }}
                        className="ml-auto bg-slate-700 hover:bg-slate-600 text-white text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded transition-colors border border-slate-600 active:scale-95"
                    >
                        Contact
                    </button>
                </div>


                </div>
            </div>
    );
};

export default ItemCard;