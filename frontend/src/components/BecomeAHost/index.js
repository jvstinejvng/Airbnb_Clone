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
        <button type="button" onClick={() => { setPage(page - 1); setCheckInput(false) }} className="back-button">Back</button>
        <button type="button" onClick={() => { setPage(page + 1); setCheckInput(true) }} className="next-button" disabled={checkInput}>Next</button>
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
      history.push(`/spots/${spotId}`)
    }
  }

  return (
    <div className="create-page">
    <div className="create-listing-nav-main"><NavigationBar isLoaded={isLoaded} /></div>
    <div className="navigation-border"></div>
    { page === 1 && 
      <div className="create-content">
      <div className="header-div">
        <div className="create-header">It’s easy to get started on Petbnb</div>
      </div>
      <div className="create-content-right">
        <div className="create-new-label">Tell us about your place</div>
          {sessionUser ? <button onClick={() => setPage(2)} className="create-new-button"><i className="fa-solid fa-plus"></i>Get Started &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{`>`}</button> :
          <button className="no-session-button" disabled="true">Log in to Start Hosting</button>}
          <span className="white-space"></span>
      </div>
      </div>
    }
      <form onSubmit={handleSubmit} className={page < 8 ? "block" : "hidden"}>
        { page >= 2 &&
          <section className={page === 2 ? "block" : "hidden"}>
          <div className="create-content">
            <div className="create-header">What type of pet boarding are you providing?</div>
          <div className="create-content-right">
            <div className="right-content-label">
              <label className="create-new-label">What the type of home do you live in?</label>
              <div className="right-content-demo">
                <button type="button" onClick={() => { setType("Large Dog Friendly Home"); setCheckInput(false) }} className="demo-buttons">demo</button>
              </div>
            </div>
              <input
                type="text"
                placeholder="Cat Only Apartment"
                className="create-type-input"
                value={type}
                onChange={updateType}
                required
                maxLength={30}
              />
            <div className="right-content-label">
              <label className="create-new-label-property">Which of these best describes your place?</label>
            </div>
            <div className="create-categories-main">
              {categories.map((spot_category) => {
                return (
                  <div className="create-categories-outer">
                    <input
                      name={category}
                      type="radio"
                      className="create-category-radio"
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
            <div className="right-content-buttons">
              <div className="back-next-buttons">{formButtons}</div>
            </div>
          </div>
          </div>
          </section>
        }
        { page >= 3 &&
          <section className={page === 3 ? "block" : "hidden"}>
          <div className="create-content">
            <div className="create-header">Share some basics about your place</div>
          <div className="create-content-right">
            <div className="create-pets-outer">
              <label className="create-pets-label">How many pets would you like to welcome?</label>
                <div className="create-pets-buttons">
                  <button onClick={() => { if (pets > 1) setPets(pets - 1) }} disabled={pets === 1}>-</button>
                    {pets}
                  <button onClick={() => setPets(pets + 1)} disabled={pets === 25}>+</button>
                </div>
              <label className="create-pets-label">What type of yard do you have?</label>
              <div className="right-content-demo">
                <button type="button" onClick={() => { setYard("Fenced Yard"); setCheckInput(false) }} className="demo-buttons">demo</button>
              </div>
                <input
                  type="text"
                  placeholder="yard"
                  className="multi-input"
                  value={yard}
                  onChange={e => { setYard(e.target.value); }}
                  required
                  maxLength={100}
                />
              <label className="create-pets-label">Do children live at the residency?</label>
              <div className="right-content-demo">
                <button type="button" onClick={() => { setChildren("No Children"); setCheckInput(false) }} className="demo-buttons">demo</button>
              </div>
                <input
                  type="text"
                  placeholder="children"
                  className="multi-input"
                  value={children}
                  onChange={e => { setChildren(e.target.value); }}
                  required
                  maxLength={100}
                />
              <label className="create-pets-label">Do your pets live at the residency </label>
              <div className="right-content-demo">
                <button type="button" onClick={() => { setPersonalPets("2 dogs"); setCheckInput(false) }} className="demo-buttons">demo</button>
              </div>
                <input
                  type="text"
                  placeholder="personal pets"
                  className="multi-input"
                  value={personalpets}
                  onChange={e => { setPersonalPets(e.target.value); }}
                  required
                  maxLength={100}
                />
            </div>
            <div className="create-content-buttons">
            <div className="back-next-buttons">
              <button type="button" onClick={() => { setPage(page - 1); setCheckInput(false) }} className="back-button">Back</button>
              <button type="button" onClick={() => { setPage(page + 1); setCheckInput(true) }} className="next-button">Next</button>
            </div>
            </div>
          </div>
          </div>
          </section>
        }
        { page >= 4 &&
          <section className={page === 5 ? "block" : "hidden"}>
          <div className="create-content">
            <div className="create-header">Where's your place located?</div>
          <div className="create-content-right">
          <div className="right-content-label">
            <label className="create-new-label">Confirm your address</label>
            <div className="right-content-demo">
              <button type="button" onClick={setDemoAddress} className="demo-buttons">demo</button>
            </div>
          </div>
          <div className="right-content-input">  
            <input
              type="text"
              placeholder="address"
              className="multi-input"
              value={address}
              onChange={e => { setAddress(e.target.value); }}
              required
              maxLength={100}
            />
            <input
              type="text"
              placeholder="city"
              className="multi-input"
              value={city}
              onChange={e => { setCity(e.target.value); }}
              required
              maxLength={50}
            />
            <input
              type="text"
              placeholder="state"
              className="multi-input"
              value={state}
              onChange={e => { setState(e.target.value); }}
              required
              maxLength={50}
            />      
            <input
              type="text"
              placeholder="country"
              className="multi-input"
              value={country}
              onChange={e => { setCountry(e.target.value); }}
              required
              maxLength={50}
            />
            <input
              type="number"
              placeholder="latitude (-90 to +90)"
              className="multi-input"
              value={lat}
              onChange={e => { setLat(e.target.value); }}
            />
            <input
              type="number"
              placeholder="longitude (-180 to +180)"
              className="multi-input"
              value={lng}
              onChange={e => { setLng(e.target.value); }}
            />                
                <div className="create-content-buttons">
                  <div className="back-next-buttons">{formButtons}</div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
          </section>
        }
        { page >= 5 &&
          <section className={page === 5 ? "block" : "hidden"}>
          <div className="create-content">
            <div className="create-header">Let's give your place a title</div>
          <div className="create-content-right">
            <div className="right-content-label">
              <label className="create-new-label">Short titles work best. Have fun with it—you can always change it later.</label>
              <div className="right-content-demo">
                <button type="button" onClick={() => { setName("Comfort Stay"); setCheckInput(false) }} className="demo-buttons">demo</button>
              </div>
            </div>
          <div className="right-content-input">
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
            <div className="back-next-buttons">{formButtons}</div>
          </div>
          </div>
          </div>
          </section>
        }
        { page >= 6 &&
          ( <section className={page === 6 ? "block" : "hidden"}>
            <div className="create-content">
              <div className="create-header">Create your description</div>
            <div className="create-content-right">
              <div className="right-content-label">
                <label className="create-new-label">Share what makes your place special.</label>
                <div className="right-content-demo">
                  <button type="button" onClick={() => { setDescription("UDOSCAPE - a unique, heart-throbbing eco-Glamping resort in Texas Hill Country. Site currently has 8 luxuriously furnished pods ranging from Deluxe to Deluxe-plus, all nestled up a hill with amazing hill country views. Amenities include grills, fire-pit, and hammock sites. Each Pod comes with a dedicated hot tub. All Pods are luxuriously furnished with plush beddings, en-suite restspot, kitchenette, dinning area, etc. Get ready to experience camping like never before!"); setCheckInput(false) }} className="demo-buttons">demo</button>
                 </div>
              </div>
            <div className="right-content-input">
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
              <div className="back-next-buttons">{formButtons}</div>
            </div>
            </div>
            </div>
          </section>
          )
        }
        { page >= 7 &&
          ( <section className={page === 7 ? "block" : "hidden"}>
            <div className="create-content">
              <div className="create-header">Now, set your price</div>
            <div className="create-content-right">
              <div className="right-content-label">
                <label className="create-new-label">You can change it anytime.</label>
                <div className="right-content-demo">
                  <button type="button" onClick={() => { setPrice(456); setCheckInput(false) }} className="demo-buttons">demo</button>
                </div>
              </div>
            <div className="right-content-input">
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
                <div className="back-next-buttons">
                  <button type="button" onClick={() => { setPage(6); setCheckInput(false) }} className="back-button">Back</button>
                  <button type="submit" className="next-button" disabled={checkInput}>Next</button>
                </div>
              </div>
            </div>
            </div>
          </section>
          )
        }
      </form >
      <form onSubmit={handleImagesSubmit}>
        { page >= 8 &&
          ( <section className={page === 8 ? "block" : "hidden"}>
            <div className="create-content">
              <div className="create-header">Make your place stand out</div>
            <div className="create-content-right">
              <div className="right-content-label">
                <label className="create-new-label">Add 5 Photos</label>
                <div className="right-content-demo">
                  <button type="button" onClick={setDemoImages} className="demo-buttons">demo</button>
                </div>
              </div>
              <div className="right-content-input">
                <input 
                  type="url"
                  placeholder="imgage url"
                  className="multi-input"
                  value={image1}
                  onChange={e => { setImage1(e.target.value); }}
                  required
                />
                <input
                  type="url"
                  placeholder="imgage url"
                  className="multi-input"
                  value={image2}
                  onChange={e => { setImage2(e.target.value); }}
                  required
                />
                <input
                  type="url"
                  placeholder="imgage url"
                  className="multi-input"
                  value={image3}
                  onChange={e => { setImage3(e.target.value); }}
                  required
                />
                <input
                  type="url"
                  placeholder="image url"
                  className="multi-input"
                  value={image4}
                  onChange={e => { setImage4(e.target.value); }}
                  required
                />
                <input
                  type="url"
                  placeholder="image url required* (.jpeg, .jpg, .png)"
                  className="multi-input"
                  value={image5}
                  onChange={e => { setImage5(e.target.value); setCheckInput(false) }}
                  required
                />
              </div>
              <div className="right-content-button">
                <div className="back-next-buttons">
                  <button type="button" className="back-button not-visible">Back</button>
                  <button type="submit" className="next-button" disabled={checkInput}>Submit</button>
                </div>
              </div>
            </div>
            </div>
          </section>
          )
        }
      </form>
    </div>
  )
}

export default BecomeAHost
