import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";

const EditSpotPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  let { spotId } = useParams();
  spotId = Number(spotId);

  const spot = useSelector((state) => state.spots);
  const [name, setName] = useState('');
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [previewImage, setPreviewImage] = useState('');
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [price, setPrice] = useState(spot?.price);
  const [description, setDescription] = useState(spot.description);
  
  const [errors, setErrors] = useState([]);
  const [validateSpot, setvalidateSpot] = useState(false);

  const updateName = (e) => setName(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateImage = (e) => setPreviewImage(e.target.value)
  const updateLat = (e) => setLat(e.target.value)
  const updateLng = (e) => setLng(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)

  if (validateSpot) {
    return <Redirect to={`/spots/${spotId}`} />;
  }

  const spotSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
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
        return dispatch(spotActions.updateSpot(data))
        .then(() => {
          setvalidateSpot(true);
        })
        .then(() => {
          history.push(`/spots/${spot.id}`)
        })
      
    }
    
  return (
    <form className='editSpot' onSubmit={spotSubmit}>
      <ul>
        {errors.map((error, spotId) => (
          <li key={spotId}>{error}</li>
        ))}
      </ul>
      <label>
        Name
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
          required
        />
      </label>
      <label>
        Address
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={updateAddress}
        />
      </label>
      <label>
        City
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={updateCity}
        />
      </label>
      <label>
        State
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={updateState}
        />
      </label>
      <label>
        Country
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={updateCountry}
        />
      </label>
      <label >
        Image
        <input
          type="text"
          placeholder="img-url"
          value={previewImage}
          onChange={updateImage}
        />
      </label>
      <label>
        Latitude
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={updateLat}
        />
      </label>
      <label>
        Longitude
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={updateLng}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={updateDescription}
        />
      </label>
      <label>
        Price 
        <input
          type="text"
          value={price}
          onChange={updatePrice}
        />
      </label>
      <button type="submit">Edit Spot</button>
    </form>
  );
};

export default EditSpotPage