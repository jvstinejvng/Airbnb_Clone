import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import searchIcon from '../../assets/SearchIcon.svg'
import locationpin from '../../assets/LocationPin.svg'
import '../CSS/SearchBar.css'

function SearchBar() {

  const [pets, setPets] = useState(1)
  const [showDestinations, setShowDestinations] = useState(false)

  const openMenu = () => {
    if (showDestinations) return;
    setShowDestinations(true);
  };

  useEffect(() => {
    if (!showDestinations) return;

    const closeMenu = () => {
      setShowDestinations(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showDestinations]);


  const tomorrow = new Date()
  const reservationDays = new Date()
  tomorrow.setDate(tomorrow.getDate() + 2)
  reservationDays.setDate(reservationDays.getDate() + 5)

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().slice(0, 10))
  const [checkOut, setCheckOut] = useState(reservationDays.toISOString().slice(0, 10))

  const history = useHistory()
  const [result, setDestination] = useState()

  const handleSearch = (e) => {

    if (!result) return

    e.preventDefault()
    history.push(`/search/${result}/${pets}`)
  }

  return (
    <div className='searchbar-container'>
      <form onSubmit={handleSearch} className='searchbar-form'>
        <div className='searchbar-container' onClick={openMenu}>
          <label className='searchbar-inner-text'>Anywhere</label>
          <input
            type='text'
            placeholder='Search destinations'
            className='searchbar-input'
            value={result}
            onChange={e => setDestination(e.target.value)}
            maxLength='140'
          />
          {showDestinations && (
            <div className='searchbar-dropdown'>
              <div className='searchbar-dropdown-header'>Popular searches</div>
              <div className='searchbar-result-container' onClick={() => { setDestination("Portland"); history.push(`/search/Portland/${pets}`) }}>
                <img className='searchbar-droppin-icon' src={locationpin}></img>
                <div className='searchbar-results'>
                  <div className='searchbar-result-header'>Portland, Oregon</div>
                  <div className='searchbar-result-date'>Any week</div>
                </div>
              </div>
              <div className='searchbar-result-container' onClick={() => { setDestination("Miami"); history.push(`/search/Miami/${pets}`) }}>
                <img className='searchbar-droppin-icon' src={locationpin}></img>
                <div className='searchbar-results'>
                  <div className='searchbar-result-header'>Miami, Florida</div>
                  <div className='searchbar-result-date'>Any week</div>
                </div>
              </div>
              <div className='searchbar-result-container' onClick={() => { setDestination("Chicago"); history.push(`/search/Chicago/${pets}`) }}>
                <img className='searchbar-droppin-icon' src={locationpin}></img>
                <div className='searchbar-results'>
                  <div className='searchbar-result-header'>Chicago, Illinios</div>
                  <div className='searchbar-result-date'>Any week</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='searchbar-container'>
          <label className='searchbar-inner-text'>Check in</label>
          <input
            type='date'
            className='searchbar-input-date'
            min={new Date().toISOString().split('T')[0]}
            value={new Date(checkIn).toISOString().slice(0, 10)}
            onChange={(e) => setCheckIn(new Date(e.target.value).toISOString().slice(0, 10))}
          />
        </div>
        <div className='searchbar-container'>
          <label className='searchbar-inner-text'>Check out</label>
          <input
            type='date'
            className='searchbar-input-date'
            min={new Date().toISOString().split('T')[0]}
            value={new Date(checkOut).toISOString().slice(0, 10)}
            onChange={(e) => setCheckOut(new Date(e.target.value).toISOString().slice(0, 10))}
          />
        </div>
        <div className='searchbar-container'>
          <label className='searchbar-inner-text'>Who</label>
          <div className='searchbar-pets-outer'>
            <button type='button' onClick={() => { if (pets > 0) setPets(pets - 1) }} disabled={pets === 0} className='searchbar-pets-minus'>-</button>
            {pets}
            <button type='button' onClick={() => setPets(pets + 1)} disabled={pets === 16} className='searchbar-pets-plus'>+</button>
          </div>
        </div>
        <div>
          <button type='submit' className='searchbar-button'><img src={searchIcon} className='searchbar-magnifying-glass' alt='search'></img></button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
