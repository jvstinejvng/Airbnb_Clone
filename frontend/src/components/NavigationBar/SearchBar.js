import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import searchIcon from './MagnifyingGlass.svg'

import locationpin from './LocationPin.svg'

import "../CSS/SearchBar.css"

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

    return () => document.removeEventListener("click", closeMenu);
  }, [showDestinations]);


  const tomorrow = new Date()
  const nextDay = new Date()
  tomorrow.setDate(tomorrow.getDate() + 2)
  nextDay.setDate(nextDay.getDate() + 5)

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().slice(0, 10))
  const [checkOut, setCheckOut] = useState(nextDay.toISOString().slice(0, 10))

  const history = useHistory()
  const [result, setDestination] = useState()

  const handleSearch = (e) => {

    if (!result) return

    e.preventDefault()
    history.push(`/search/${result}/${pets}`)
  }

  return (
    <div className='searchBar-outer'>
      <form onSubmit={handleSearch} className="searchBar-form">
        <div className="searchBar-outer" onClick={openMenu}>
          <label className="searchBar-label">Where</label>
          <input
            type='text'
            placeholder='Search results'
            className='searchBar-input'
            value={result}
            onChange={e => setDestination(e.target.value)}
            maxLength="140"
          />
          {showDestinations && (
            <div className="where-dropdown">
              <div className="where-dropdown-header">Popular Searches</div>
              <div className="where-selection" onClick={() => { setDestination("Portland"); history.push(`/search/Portland/${pets}`) }}>
                <img className='dropdown-clock' src={locationpin}></img>
                <div className="where-result-outer">
                  <div className="where-result-header">Portland, Oregon</div>
                  <div className="where-result-date">Any week</div>
                </div>
              </div>
              <div className="where-selection" onClick={() => { setDestination("Miami"); history.push(`/search/Miami/${pets}`) }}>
                <img className='dropdown-clock' src={locationpin}></img>
                <div className="where-result-outer">
                  <div className="where-result-header">Miami, Florida</div>
                  <div className="where-result-date">Any week</div>
                </div>
              </div>
              <div className="where-selection" onClick={() => { setDestination("Chicago"); history.push(`/search/Chicago/${pets}`) }}>
                <img className='dropdown-clock' src={locationpin}></img>
                <div className="where-result-outer">
                  <div className="where-result-header">Chicago, Illinios</div>
                  <div className="where-result-date">Any week</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="searchBar-outer searchBar-hidden">
          <label className="searchBar-label">Check In</label>
          <input
            type='date'
            className='searchBar-input-date'
            min={new Date().toISOString().split('T')[0]}
            value={new Date(checkIn).toISOString().slice(0, 10)}
            onChange={(e) => setCheckIn(new Date(e.target.value).toISOString().slice(0, 10))}
          />
        </div>
        <div className="searchBar-outer searchBar-hidden">
          <label className="searchBar-label">Check Out</label>
          <input
            type='date'
            className='searchBar-input-date'
            min={new Date().toISOString().split('T')[0]}
            value={new Date(checkOut).toISOString().slice(0, 10)}
            onChange={(e) => setCheckOut(new Date(e.target.value).toISOString().slice(0, 10))}
          />
        </div>
        <div className="searchBar-outer searchBar-hidden">
          <label className="searchBar-label">Who</label>
          <div className="searchBar-pets-outer">
            <button type='button' onClick={() => { if (pets > 0) setPets(pets - 1) }} disabled={pets === 0} className='searchBar-pets-minus'>-</button>
            {pets}
            <button type='button' onClick={() => setPets(pets + 1)} disabled={pets === 16} className='searchBar-pets-plus'>+</button>
          </div>
        </div>
        <div>
          <button type='submit' className='searchBar-button'><img src={searchIcon} className='searchBar-glass' alt='search'></img></button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
