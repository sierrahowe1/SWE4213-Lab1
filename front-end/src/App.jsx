// src/App.jsx
import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import AuthContainer from './components/AuthContainer'
import ContactModal from './components/ContactModal'
import Listings from './components/Listings' // 1. Import the new component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myListings, setMyListings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function onLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setMyListings(false);
  }

  useEffect(() => {//when application loads, this  happens
    const token = localStorage.getItem("token");//holds the login token

    if(!token) {//checks if we still have the login token, if not we are not logged in
      setIsLoggedIn(false);
      return;
    }

    fetch('http://localhost:3000/auth/status', {//Here we are asking the server if the login token is still good
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {//checking the response from the server
      if(!res.ok) throw new Error("Not logged in.")//if the response is not ok, we know the user is not logged in
      return res.json();
    })
    .then(() => {
      setIsLoggedIn(true);//otherwise, we know the user is logged in
    })
    .catch(() => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    });


  }, []);



  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {!isLoggedIn ? (
        <div className="flex-grow flex items-center justify-center px-6">
          <AuthContainer onLoginClick={() => setIsLoggedIn(true)} />
        </div>
      ) : (
        <>
          <Header setMyListings={setMyListings} onLogout={onLogout} setSearchTerm={setSearchTerm}/>

          <main className="flex-grow px-[50px] py-10">
            <Listings onSelectItem={(item) => setSelectedItem(item)} myListings={myListings} 
            searchTerm={searchTerm}
            />
          </main>

          <Footer />

          <ContactModal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            email={selectedItem?.owner_email}
            title={selectedItem?.title}
          />
        </>
      )}
    </div>
  )
}

export default App