import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addSpot, findSpotById } from "../../store/spots";
import { addNewImages } from "../../store/images";
import NavigationBar from "../NavigationBar";
import "../CSS/BecomeAHost.css"

const BecomeAHost = ( { isLoaded } ) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const [userId, setUserId] = useState(sessionUser?.id)
  const [spotId, setSpotId] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [yard, setYard] = useState("")
  const [children, setChildren] = useState("")
  const [personalpets, setPersonalPets] = useState("")
  const [category, setCategory] = useState("Dog Home")
  const [pets, setPets] = useState(1)
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [image4, setImage4] = useState("")
  const [image5, setImage5] = useState("")

  const [page, setPage] = useState(1)
  const [checkInput, setCheckInput] = useState(true)
  const [validationErrors, setValidationErrors] = useState([])
  const [errors, setErrors] = useState([])

  const categories = ['Dog Home', 'Cat Home', 'Dog and Cat Home', 'Exotic Pet Home', 'Rabbit/Bunny Home', 'Bird Home', 'Multiple Pet Home', 'Reptile Home', 'Hamster/Guinea Pig Home', 'Farm Home']

  const toggleNext = (e) => {
    if (e.trim().length > 2) setCheckInput(false)
    else setCheckInput(true)
  }

  const updateName = (e) => {
    setName(e.target.value)
    toggleNext(e.target.value)
  }

  const updateType = (e) => {
    setType(e.target.value)
    toggleNext(e.target.value)
  }

  useEffect(() => {

    const errors = []

    if (page === 4) {

      let latNum = parseInt(lat, 10)
      let lngNum = parseInt(lng, 10)

      if (address.trim().length < 6) errors.push("Please enter a valid address")
      if (city.trim().length < 4) errors.push("Please enter a valid city")
      if (state.trim().length < 4) errors.push("Please enter a valid state")
      if (country.trim().length < 4) errors.push("Please enter a valid country")

      if (lat === "" || (!isNaN(latNum) && (lat > 90 || lat < -90))) {
        errors.push("Please enter a valid latitude value")
        setCheckInput(true)
      }
      if (lng === "" || !isNaN(lngNum) && (lng > 180 || lng < -180)) {
        errors.push("Please enter a valid longitude value")
        setCheckInput(true)
      }

      if (errors.length > 0) {
        setCheckInput(true)
        setValidationErrors(errors)
      } else {
        setValidationErrors([])
        setCheckInput(false)
      }
    }

    if (page === 6) {
      if (description.trim().length < 10) {
        setCheckInput(true)
      }
    }

    if (page === 7) {
      if (price < 1 || price > 1000000) {
        setCheckInput(true)
      }
    }

    if (page === 8) {
      if (image1 === "" || image2 === "" || image3 === "" || image4 === "" || image5 === "") {
        setCheckInput(true)
      }
    }

  }, [page, address, city, state, country, lat, lng, description, price, image1, image2, image3, image4, image5])

  const setDemoAddress = () => {
    setAddress("180 Geary St")
    setCity("San Francisco")
    setState("California")
    setCountry("United States")
    setLat(37.78848996193914)
    setLng(-122.406722407398281)
    setCheckInput(false)
  }

  const setDemoImages = () => {
    setImage1("https://www.etsy.com/img/iap/e1daf8/4646149166/iap_640x640.4646149166_jvyiuwlg.jpg")
    setImage2("https://www.patioproductions.com/images/artificial-turf-dog-friendly.jpg")
    setImage3("https://aussieuniversity.com/wp-content/uploads/2020/01/IMG_0638.jpg")
    setImage4("https://www.etsy.com/img/iap/1f58bd/1311185407/iap_640x640.1311185407_4wrv0a7c.jpg")
    setImage5("https://www.etsy.com/img/iap/2a9967/4691228021/iap_640x640.4691228021_b96n0f2t.jpg")
    setCheckInput(false)
  }

  let formButtons;
  if (page > 1) {
    formButtons = (
      <>
        <button 
          type="button" 
          onClick={() => { setPage(page - 1); 
          setCheckInput(false) }}
          className="back-button">
          Back
        </button>
        <button 
          type="button" 
          onClick={() => { setPage(page + 1); 
          setCheckInput(true) }} 
          className="next-button" 
          disabled={checkInput}>
          Next
        </button>
      </>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const spotData = {
      userId,
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

    const spotRes = await dispatch(addSpot(spotData))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors)
          if (data) {
            const errors = Object.values(data.errors)
            setErrors(errors.slice(0, 2))
          }
      })

    if (spotRes) {
      setSpotId(spotRes.id)
      setPage(8)
    }
  }

  const handleImagesSubmit = async (e) => {
    e.preventDefault()

    const imageData = {
      userId,
      spotId: spotId,
      type: "spot"
    }

    const imageData1 = {
      ...imageData,
      url: image1
    }

    const imageData2 = {
      ...imageData,
      url: image2
    }

    const imageData3 = {
      ...imageData,
      url: image3
    }

    const imageData4 = {
      ...imageData,
      url: image4
    }

    const imageData5 = {
      ...imageData,
      url: image5
    }

    const newImage1 = await dispatch(addNewImages(imageData1))
    const newImage2 = await dispatch(addNewImages(imageData2))
    const newImage3 = await dispatch(addNewImages(imageData3))
    const newImage4 = await dispatch(addNewImages(imageData4))
    const newImage5 = await dispatch(addNewImages(imageData5))

    if (newImage1 && newImage2 && newImage3 && newImage4 && newImage5) {
      dispatch(findSpotById(spotId))
      history.push(`/rooms/${spotId}`)
    }
  }

  return (
    <>
    <div className='host-form-main'>
      <div className='host-form-navbar'>
        <NavigationBar isLoaded={isLoaded} /></div>
      <div className='nav-border'></div>
        { page === 1 && 
          <div className='host-form-container'>
            <div className='host-form-header'>Ready to Petbnb it?</div>
              <div className='host-form-right'>
                <div className='host-form-page-one'>It’s easy to get started on Petbnb</div>
                    {sessionUser ? 
                      <button 
                        onClick={() => setPage(2)} 
                        className='host-form-get-started-button'>
                        <i className="fa-solid fa-plus"></i>
                        Get Started 
                      </button> 
                      :
                      <button 
                        className='host-form-not-user' 
                        disabled="true">
                        Log in to Start Hosting
                      </button>
                    }
              </div>
          </div>
        }
      <form onSubmit={handleSubmit} className={page < 8 ? "block" : "hidden"}>
        { page >= 2 &&
          <section className={page === 2 ? "block" : "hidden"}>
            <div className='host-form-container'>
              <div className='host-form-header'>Tell us about your place</div>
                <div className='host-form-right'>
                        <label className='host-form-page-two'>What the type of home do you live in?</label>
                          <button 
                            type="button" 
                            onClick={() => { setType("Large Dog Friendly Home"); 
                            setCheckInput(false) }}
                            className='demo-buttons'> 
                            demo
                          </button>
                  <input
                    type="text"
                    placeholder="Cat Only Apartment"
                    className="host-form-type-input-text"
                    value={type}
                    onChange={updateType}
                    required
                    maxLength={30}
                  />
                  <label className="host-form-property-type-container">Which of these best describes your place?</label>
                    <div className="host-form-categories-container">
                      {categories.map((spot_category) => {
                        return (
                          <div className="host-form-categories-input-radio">
                            <input
                              name={category}
                              type="radio"
                              className="host-form-radio-button"
                              checked={category === spot_category}
                              value={category}
                              onChange={() => { setCategory(spot_category) }}
                              required
                            />
                          <label className="create-category-label">{spot_category}</label>
                          </div>
                      )
                      })}
                    </div>
                <div className="next-back-form-buttons">{formButtons}</div>
                </div>
            </div>
          </section>
        }
        { page >= 3 &&
          <section className={page === 3 ? "block" : "hidden"}>
            <div className='host-form-container'>
              <div className="host-form-header">Share some basics about your place</div>
              <div className="host-form-right">
                <label className="host-form-right-question-text">How many pets would you like to welcome?</label>
                  <div className="host-form-buttons-container">
                    <button 
                      onClick={() => { 
                      if (pets > 1) 
                      setPets(pets - 1) }} 
                      disabled={pets === 1}>
                      -
                    </button>
                    {pets}
                    <button 
                      onClick={() => 
                      setPets(pets + 1)} 
                      disabled={pets === 25}>
                      +
                    </button>
                  </div>
                <label className="host-form-right-question-text">What type of yard do you have?</label>
                  <div className="host-form-demo-button-container">
                    <button type="button" 
                      onClick={() => { 
                      setYard("Fenced Yard"); 
                      setCheckInput(false) }} 
                      className='demo-buttons'>
                      demo
                    </button>
                  </div>
                    <input
                      type="text"
                      placeholder="yard"
                      className="host-form-input-text"
                      value={yard}
                      onChange={e => { setYard(e.target.value); }}
                      required
                      maxLength={100}
                    />
                <label className="host-form-right-question-text">Do children live at the residency?</label>
                  <div className="host-form-demo-button-container">
                    <button
                      type="button" 
                      onClick={() => { 
                      setChildren("No Children"); 
                      setCheckInput(false) }} 
                      className='demo-buttons'>
                      demo
                    </button>
                  </div>
                    <input
                      type="text"
                      placeholder="children"
                      className="host-form-input-text"
                      value={children}
                      onChange={e => { setChildren(e.target.value); }}
                      required
                      maxLength={100}
                    />
                <label className="host-form-right-question-text">Do your pets live at the residency </label>
                  <div className="host-form-demo-button-container">
                    <button 
                      type="button" 
                      onClick={() => { 
                      setPersonalPets("2 dogs"); 
                      setCheckInput(false) }} 
                      className='demo-buttons'>
                      demo
                    </button>
                  </div>
                    <input
                      type="text"
                      placeholder="personal pets"
                      className="host-form-input-text"
                      value={personalpets}
                      onChange={e => { setPersonalPets(e.target.value); }}
                      required
                      maxLength={100}
                    />
              <div className="next-back-form-buttons">
                <button 
                  type="button" 
                  onClick={() => { 
                  setPage(page - 1); 
                  setCheckInput(false) }} 
                  className="back-button">
                  Back
                </button>
                <button 
                  type="button" 
                  onClick={() => { 
                  setPage(page + 1); 
                  setCheckInput(true) }} 
                  className="next-button">
                  Next
                </button>
            </div>
              </div>
            </div>
          </section>
        }
        { page >= 4 &&
          <section className={page === 4 ? "block" : "hidden"}>
            <div className="host-form-container">
              <div className="host-form-header">Where's your place located?</div>
                <div className="host-form-right">
                <label className="host-form-right-question-text">Confirm your address</label>
                  <div className="host-form-demo-button-container">
                      <button 
                        type="button" 
                        onClick={setDemoAddress} 
                        className='demo-buttons'>
                        demo
                      </button>
                  </div>
              <div className="host-form-right-input-container">  
                <input
                  type="text"
                  placeholder="address"
                  className="host-form-input-text"
                  value={address}
                  onChange={e => { setAddress(e.target.value); }}
                  required
                  maxLength={100}
                />
                <input
                  type="text"
                  placeholder="city"
                  className="host-form-input-text"
                  value={city}
                  onChange={e => { setCity(e.target.value); }}
                  required
                  maxLength={50}
                />
                <input
                  type="text"
                  placeholder="state"
                  className="host-form-input-text"
                  value={state}
                  onChange={e => { setState(e.target.value); }}
                  required
                  maxLength={50}
                />      
                <input
                  type="text"
                  placeholder="country"
                  className="host-form-input-text"
                  value={country}
                  onChange={e => { setCountry(e.target.value); }}
                  required
                  maxLength={50}
                />
                <input
                  type="number"
                  placeholder="latitude (-90 to +90)"
                  className="host-form-input-text"
                  value={lat}
                  onChange={e => { setLat(e.target.value); }}
                />
                <input
                  type="number"
                  placeholder="longitude (-180 to +180)"
                  className="host-form-input-text"
                  value={lng}
                  onChange={e => { setLng(e.target.value); }}
                />                  
                <div className="next-back-form-buttons">{formButtons}</div>
                <div>
                </div>
              </div>
                </div>
            </div>
          </section>
        }
        { page >= 5 &&
          <section className={page === 5 ? "block" : "hidden"}>
            <div className="host-form-container">
              <div className="host-form-header">Let's give your place a title</div>
                <div className="host-form-right">
                  <label className="host-form-right-question-text">Short titles work best. Have fun with it—you can always change it later.</label>
                    <div className="host-form-demo-button-container">
                      <button 
                        type="button" 
                        onClick={() => { 
                        setName("Comfort Stay"); 
                        setCheckInput(false) }} 
                        className='demo-buttons'>
                        demo
                      </button>
              </div>
          <div className="host-form-right-input-container">
            <input
              type="text"
              placeholder="Pet Care"
              className="create-input"
              value={name}
              onChange={updateName}
              required
              maxLength={50}
            />
          </div>
          <div className="right-content-buttons">
            <div className="next-back-form-buttons">{formButtons}</div>
          </div>
                </div>
            </div>
          </section>
        }
        { page >= 6 &&
          <section className={page === 6 ? "block" : "hidden"}>
            <div className="host-form-container">
              <div className="host-form-header">Create your description</div>
                <div className="host-form-right">
                  <label className="host-form-right-question-text">Share what makes your place special.</label>
                    <div className="host-form-demo-button-container">
                      <button 
                        type="button" 
                        onClick={() => { 
                        setDescription("Dog family home"); 
                        setCheckInput(false) }} 
                        className='demo-buttons'>
                        demo
                      </button>
                    </div>
            <div className="host-form-right-input-container">
              <textarea
                type="text"
                placeholder="Tell us about your pet-care experience"
                className="create-input-textarea"
                value={description}
                onChange={e => { setDescription(e.target.value); setCheckInput(false) }}
                maxLength={1000}
              >
              </textarea>
            </div>
            <div className="right-content-button">
              <div className="next-back-form-buttons">{formButtons}</div>
            </div>
                </div>
            </div>
          </section>
        }
        { page >= 7 &&
          <section className={page === 7 ? "block" : "hidden"}>
            <div className="host-form-container">
              <div className="host-form-header">Now, set your price</div>
                  <div className="host-form-right">
                    <label className="host-form-right-question-text">You can change it anytime.</label>
                      <div className="host-form-demo-button-container">
                        <button 
                          type="button" 
                          onClick={() => { 
                          setPrice(100); 
                          setCheckInput(false) }} 
                          className='demo-buttons'>
                          demo
                        </button>
                      </div>
                  <div className="host-form-right-input-container">
                    <input
                      type="number"
                      placeholder="$"
                      className="create-input"
                      value={price}
                      min={1}
                      max={100000}
                      onChange={e => { setPrice(e.target.value); setCheckInput(false) }}
                      required
                    />
                    {errors.length > 0 && (
                    <>
                    <div className="error-message">Please return to the previous pages to correct the following errors: </div> 
                      <ul className="error-message-ul">
                        {errors.map((error, i) => <li className="error-message-li" key={i}>{error}</li>)}
                      </ul>
                    </>
                    )}
                  </div>
              <div className="right-content-button">
                <div className="next-back-form-buttons">
                  <button 
                    type="button" 
                    onClick={() => { 
                    setPage(6); 
                    setCheckInput(false) }} 
                    className="back-button">
                    Back
                    </button>
                    <button 
                      type="submit" 
                      className="next-button" 
                      disabled={checkInput}>
                      Next
                    </button>
                </div>
              </div>
            </div>
            </div>
          </section>
        }
      </form >
      <form onSubmit={handleImagesSubmit}>
        { page >= 8 &&
          <section className={page === 8 ? "block" : "hidden"}>
            <div className="host-form-container">
              <div className="host-form-header">Make your place stand out</div>
                <div className="host-form-right">
                  <label className="host-form-right-question-text">Add 5 Photos</label>
                    <div className="host-form-demo-button-container">
                      <button 
                        type="button" 
                        onClick={setDemoImages} 
                        className='demo-buttons'>
                        demo
                      </button>
                    </div>
                  <div className="host-form-right-input-container">
                    <input 
                      type="url"
                      placeholder="imgage url"
                      className="host-form-input-text"
                      value={image1}
                      onChange={e => { setImage1(e.target.value); }}
                      required
                    />
                    <input
                      type="url"
                      placeholder="imgage url"
                      className="host-form-input-text"
                      value={image2}
                      onChange={e => { setImage2(e.target.value); }}
                      required
                    />
                    <input
                      type="url"
                      placeholder="imgage url"
                      className="host-form-input-text"
                      value={image3}
                      onChange={e => { setImage3(e.target.value); }}
                      required
                    />
                    <input
                      type="url"
                      placeholder="image url"
                      className="host-form-input-text"
                      value={image4}
                      onChange={e => { setImage4(e.target.value); }}
                      required
                    />
                    <input
                      type="url"
                      placeholder="image url required* (.jpeg, .jpg, .png)"
                      className="host-form-input-text"
                      value={image5}
                      onChange={e => { setImage5(e.target.value); setCheckInput(false) }}
                      required
                    />
                  </div>
                  <div className="right-content-button">
                    <div className="next-back-form-buttons">
                      <button 
                        type="button" 
                        className="back-button not-visible">
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="next-button" 
                        disabled={checkInput}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </section>
        }
      </form>
    </div>
    </>
  )
}

export default BecomeAHost
