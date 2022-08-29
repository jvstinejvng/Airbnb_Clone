import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "../CSS/BecomeAHost.css";


const SpotForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();


  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user)

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  } 

  useEffect(()=>{
    const errs= []
    if (!name) errs.push("Please enter a valid name")
    if (name.length > 50) errs.push("Name must be less than 50 characters")
    if (name.length < 2) errs.push("Name must be more than 2 characters")
    if (!address) errs.push("Please enter a valid address")
    if (!city) errs.push("Please enter a valid city")
    if (!state) errs.push("Please enter a valid state")
    if (!country) errs.push("Please enter a valid country")
    if (!lat || typeof Number(lat)!== 'number' || Number(lat)>90 || Number(lat)< -90) errs.push("Please enter a valid latitude value")
    if (!lng || typeof Number(lat)!== 'number' || Number(lng)>180 || Number(lng)<-180) errs.push("Please enter a valid longitude value")
    if (!description) errs.push("Please enter a valid description")
    if (!price) errs.push("Please enter a valid price")
    if (!isImage(previewImage)) errs.push("Please enter a valid image url")
    setErrors(errs)
  }, [address, city, state, name, country,lat, lng, description, price, previewImage])


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data =   {
      address,
      city,
      state,
      country,
      previewImage,
      lat,
      lng,
      name,
      description,
      price,
    };

    
     const newSpot = dispatch(spotActions.createSpot(data));


      if (newSpot) {
        history.push("/");
      }

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

      <div className="Errors">
            {errors.map((error) => (
              <p key={error.id}>{error}</p>
            ))}
          </div>
  
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
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label className="HostInputField">
        Longitude
        <input
          type="number"
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
      <button className="HostButton" type="submit"  disabled={errors.length ? true : false}>Create Listing</button>
    </form>
    </div>
    )}
  </>
  );
};

export default SpotForm;
