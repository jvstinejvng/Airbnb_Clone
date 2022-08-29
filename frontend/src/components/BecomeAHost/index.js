import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "../CSS/BecomeAHost.css";


const SpotForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }

  const validations = () => {
    const errors = [];
    if (!address) errors.push("Please enter an address");
    if (!city) errors.push("Please enter a city");
    if (!state) errors.push("Please enter a state");
    if (!country) errors.push("Please enter a country");
    if (!previewImage) errors.push("Please include a preview image");
    if (name.length < 2)
      errors.push("Please enter a name with a length greater than 2");
    if (!description) errors.push("Please include a description");
    if (!previewImage) errors.push("Please include a preview image!");
    if (name.length > 50)
      errors.push("Please include a name with a length that is less than 50");
    if (previewImage.length > 255) (errors.push("Please include a different image URL that is less than 255 characters"))
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      address: address,
      city: city,
      state: state,
      country: country,
      previewImage: previewImage,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    };

    const validationErrors = validations();
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return;
    }

    return dispatch(spotActions.createSpot(data))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };


  return (
    <>
    { sessionUser && (
      <div className='HostContainer'>
    <form className='HostForm' onSubmit={handleSubmit}>
      <div className="HostFormTitle">
          You’ll be a Host soon! <br/>
          Just add the last few details to your listing.
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
  
      <label className="HostInputField">
        Name
        <input 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label >
      <label className="HostInputField">
        Address
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        City
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        State
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        Country
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        Latitude
        <input
          type="decimal"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        Longitude
        <input
          type="decimal"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        Description
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        Price
        <input
          type="number"
          min={1}
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        </label>
      <label className="HostInputField">
        Image
        <input
          type="text"
          placeholder="img-url"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required
        />
      </label>
      <button className="HostButton" type="submit">Create Listing</button>
    </form>
    </div>
    )}
  </>
  );
};

export default SpotForm;