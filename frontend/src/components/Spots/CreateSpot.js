import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from '../../store/spots'
import "./CreateSpot.css";

const CreateSpotPage = () => {

  const dispatch = useDispatch();
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState([]);

  const setSpot = () => {
    setName('')
    setAddress('')
    setCity('')
    setState('')
    setCountry('')
    setPreviewImage('')
    setLat('')
    setLng('')
    setPrice('')
    setDescription('')
    setErrors([])
  }

  const spotSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    const validateSpot = []
    if (description.length < 5) validateSpot.push('Description must be at least 5 characters')
    if (lat < -90 || lat > 90) validateSpot.push('Latitude must be between -90 and 90.')
    if (lng < -180 || lng > 180) validateSpot.push('Longitude must be between -180 and 180.')

    setErrors(validateSpot)

    if (validateSpot.length === 0) {
        const newSpot = {
            userId: sessionUser.id,
            name,
            address,
            city,
            state,
            country,
            previewImage,
            lat,
            lng,
            price,
            description,
        }

        const spotId = await dispatch(spotActions.createSpot(newSpot))
        setSpot()
        history.push(`/spots/${spotId}`)

    }
  }

  const newName = (e) => setName(e.target.value)
  const newAddress = (e) => setAddress(e.target.value)
  const newCity = (e) => setCity(e.target.value)
  const newState = (e) => setState(e.target.value)
  const newCountry = (e) => setCountry(e.target.value)
  const newImage = (e) => setPreviewImage(e.target.value)
  const newLat = (e) => setLat(e.target.value)
  const newLng = (e) => setLng(e.target.value)
  const newDescription = (e) => setDescription(e.target.value)
  const newPrice = (e) => setPrice(e.target.value)

  return (
    <form className='createSpot' onSubmit={spotSubmit}>
      <ul>
        {errors.map((error, id) => (
          <li key={id}>{error}</li>
        ))}
      </ul>
      <label>
        Name
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={newName}
          required
        />
      </label>
      <label>
        Address
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={newAddress}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={newCity}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={newState}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={newCountry}
          required
        />
      </label>
      <label >
        Image
        <input
          type="text"
          placeholder="img-url"
          value={previewImage}
          onChange={newImage}
        />
      </label>
      <label>
        Latitude
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={newLat}
          required
        />
      </label>
      <label>
        Longitude
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={newLng}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={newDescription}
          required
        />
      </label>
      <label>
        Price 
        <input
          type="text"
          value={price}
          onChange={newPrice}
          required
        />
      </label>
      <button type="submit">Create a new Spot</button>
    </form>
  );
};

export default CreateSpotPage