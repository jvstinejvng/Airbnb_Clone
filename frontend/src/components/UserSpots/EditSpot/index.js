import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { spotEdit, findSpotById } from "../../../store/spots";
import "../../CSS/EditSpot.css"

const EditSpot = ({ listingId, returnToListing }) => {

  const dispatch = useDispatch()
  const spot = useSelector((state) => state.spots[listingId])

  const [ownerId, setOwnerId] = useState(spot.ownerId)
  const [spotId, setSpotId] = useState(listingId)
  const [pets, setPets] = useState(spot.pets)
  const [type, setType] = useState(spot.type)
  const [yard, setYard] = useState(spot.yard)
  const [children, setChildren] = useState(spot.children)
  const [personalpets, setPersonalPets] = useState(spot.personalpets)
  const [category, setCategory] = useState(spot.category)
  const [address, setAddress] = useState(spot.address)
  const [city, setCity] = useState(spot.city)
  const [state, setState] = useState(spot.state)
  const [country, setCountry] = useState(spot.country)
  const [lat, setLat] = useState(spot.lat)
  const [lng, setLng] = useState(spot.lng)
  const [name, setName] = useState(spot.name)
  const [description, setDescription] = useState(spot.description)
  const [price, setPrice] = useState(spot.price)
  

  const [errors, setErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(false)

  const categories = ['Dog Home', 'Cat Home', 'Dog and Cat Home', 'Exotic Pet Home', 'Rabbit/Bunny Home', 'Bird Home', 'Multiple Pet Home', 'Reptile Home', 'Hamster/Guinea Pig Home', 'Farm Home']

  useEffect(() => {
    const errors = [];
    if (type.trim().length < 2) errors.push("Type of stay between 3 and 30 characters required")
    if (name.trim().length < 10) errors.push("Title must be between 10 and 50 characters")
    if (address.trim().length < 6) errors.push("Valid address required")
    if (city.trim().length < 4) errors.push("Please enter a state")
    if (state.trim().length < 4) errors.push("Valid state required")
    if (country.trim().length < 4) errors.push("Valid country required")
    if (lat === "" || lat > 90 || lat < -90) errors.push("Latitude must be between - 90 to 90")
    if (lng === "" || lng > 180 || lng < -180) errors.push("Longitude must be between - 180 to 180")
    if (description.trim().length < 10) errors.push("Description required between 10 and 1000 characters")
    if (price > 1000000 || price < 1) errors.push("Price must be between $1 and $1,000,000")

    if (errors.length > 0) {
      setErrors(errors)
      setDisableButton(true)
    } else {
      setErrors([])
      setDisableButton(false)
    }

  }, [type, name, address, city, state, country, lat, lng, description, price])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const spotData = {
      spotId,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      type,
      category,
      pets,
      yard, 
      children, 
      personalpets
    }

    const response = await dispatch(spotEdit(spotData))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors)
          if (data) {
            const errors = Object.values(data.errors)
            setErrors(errors)
          }
      })

    if (response) {
      dispatch(findSpotById(listingId))
      return returnToListing()
    }
  }

  return (
    <div className="edit-spot-page">
        <button onClick={returnToListing} className="return-to-listing-button">
          <i class="fa-solid fa-arrow-left"></i>
          Return to listing
        </button>
      <form onSubmit={handleSubmit} className="edit-spot-form">
        <div className="edit-spot-header">Edit Listing</div>
          <label className="edit-spot-label">Edit the type of pet home you have:</label>
            <input
              type="text"
              className="edit-spot-input"
              value={type}
              onChange={e => setType(e.target.value)}
              required
              maxLength={30}
            />
          <label className="edit-spot-label">Update many pets would you like to welcome:</label>
            <div className="edit-pets-buttons">
               <button type='button' onClick={() => { if (pets > 1) setPets(pets - 1) }} disabled={pets === 1}>-</button>
              {pets}
              <button type='button' onClick={() => setPets(pets + 1)} disabled={pets === 16}>+</button>
            </div>
          <label className="edit-spot-label"> Edit the type of yard you have:</label>
            <input
              type="text"
              className="edit-spot-input "
              value={yard}
              onChange={e => setYard(e.target.value)}
              maxLength={100}
              required
            />
            <label className="edit-spot-label">Update the number of children that live at the residency:</label>
              <input
                type="text"
                className="edit-spot-input"
                value={children}
                onChange={e => setChildren(e.target.value)}
                maxLength={100}
                required
              />
            <label className="edit-spot-label">Update the number of permanent pets live at the residency:</label>
              <input
                type="text"
                className="edit-spot-input"
                value={personalpets}
                onChange={e => setPersonalPets(e.target.value)}
                maxLength={100}
                required
              />
          <label className="edit-spot-label">Update to which best describes your place:</label>
            <div className="edit-spot-categories-container">
              {categories.map((spot_category) => {
                return (
                  <div className="edit-spot-category-radio-button">
                    <input
                      name={category}
                      type="radio"
                      className="edit-spot-radio"
                      id={spot_category}
                      checked={category === spot_category}
                      value={category}
                      onChange={() => setCategory(spot_category)}
                      required
                    />
                    <label for={spot_category}>{spot_category}</label>
                  </div>
                )
              })}
            </div>
          <label className="edit-spot-label">Edit your title</label>
            <input
              type="text"
              className="edit-spot-input"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={50}
              required
            />
          <label className="edit-spot-label">Update your location</label>
            <input
              type="text"
              className="edit-spot-input address-input"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              maxLength={100}
            />
            <input
              type="text"
              className="edit-spot-input"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
              maxLength={50}
            />
            <input
              type="text"
              className="edit-spot-input"
              value={state}
              onChange={e => setState(e.target.value)}
              required
              maxLength={50}
            />
            <input
              type="text"
              className="edit-spot-input"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
              maxLength={50}
            />
          <label className="edit-spot-label">Update Latitude:</label>
            <input
              type="number"
              className="edit-spot-input"
              value={lat}
              onChange={e => setLat(e.target.value)}
            />
          <label className="edit-spot-label">Update longitude</label>
            <input
              type="number"
              className="edit-spot-input"
              value={lng}
              onChange={e => setLng(e.target.value)}
            />
          <label className="edit-spot-label">Update your description</label>
            <textarea
              value={description}
              className="edit-spot-textarea"
              onChange={e => setDescription(e.target.value)}
              required
              maxLength={1000}
            ></textarea>
          <label className="edit-spot-label">Price per Night</label>
            <input
              type="number"
              value={price}
              className="edit-spot-input"
              onChange={e => setPrice(e.target.value)}
              required
              min={1}
              max={100000}
            />
          {errors.length > 0 && (
          <ul>
            {errors.map((error, i) => <li key={i} className='update-error'>{error}</li>)}
          </ul>)}
        <button type="submit" disabled={disableButton} className="update-listing-button">Confirm</button>
      </form>
    </div >
  )
}

export default EditSpot
