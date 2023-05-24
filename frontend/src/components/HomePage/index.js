import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllSpots, allSpots } from "../../store/spots";
import { listAllUsers } from "../../store/users";
import NavigationBar from "../NavigationBar";
import SpotCategory from "./SpotCategory";

import "../CSS/Homepage.css"

const Homepage = ( { isLoaded } ) => {

  const dispatch = useDispatch()
  let listAllSpots = useSelector(getAllSpots)

  const [category, setCategory] = useState(null)
  const [filteredSpots, setFilterSpots] = useState([])

  listAllSpots.sort(() => {
    return 0.5 - Math.random();
  });

  useEffect(() => {
    dispatch(allSpots())
    dispatch(listAllUsers())

    if (category) {
      const filteredSpots = listAllSpots.filter(spot => {
        return spot.category === category
      })
      setFilterSpots(filteredSpots)
    }
  }, [category])


  const handleFilter = (category) => {
    setCategory(category)
  }

  return (
    <div className="outer-spots-div">
      <div className="home-upper-nav">
        <div className="home-nav-main">
          <NavigationBar isLoaded={isLoaded} setFilterSpots={setFilterSpots} setCategory={setCategory} />
        </div>
        <div className="navigation-border"></div>
        <SpotCategory handleFilter={handleFilter} category={category} />
      </div>
      {filteredSpots.length > 0 ? <div className="all-spots-div">
        {filteredSpots?.map((spot, i) => {

          if (spot?.Reviews) {
            let sum = 0;
            const reviews = spot?.Reviews

            for (let review of reviews) sum += review.stars
            let avgStars = sum / Object.values(reviews).length || 0
            avgStars = Math.round(avgStars * 100) / 100

            const wholeNumbers = [0, 1, 2, 3, 4, 5]
            if (wholeNumbers.includes(avgStars)) avgStars = avgStars.toString() + ".0"

            return (
              <Link to={`/spots/${spot?.id}`} className="spot-link" key={spot?.id}>
                <div className={`spot-div spot-div${i}`}>
                  <div className="img-div">
                    <img className="spot-img" src={`${spot?.images[0]?.url}`} alt="preview of spot"></img>
                  </div>
                  <div className="spot-detail">
                    <div className="spot-info">
                      <div className="spot-city-state">{`${spot?.city}, ${spot?.state}`}</div>
                      <div className="random-distance">{`${(Math.floor(Math.random() * (2000 - 200 + 1) + 200)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} miles away`}</div>
                      <div className="spot-price-night">
                        <div className="spot-price">{`$${spot?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                        <span className="spot-night">night</span>
                      </div>
                    </div>
                    <div className="spot-rating">
                      <div className="star-icon">
                        <i className="fa-solid fa-star star-design"></i>
                        <div className="number-rating">
                          {avgStars != 0 ? avgStars : "New"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          }
        })
        }
      </div> :
        <div className="all-spots-div">
          {listAllSpots?.map((spot, i) => {

            if (spot?.Reviews) {
              let sum = 0;
              const reviews = spot?.Reviews

              for (let review of reviews) sum += review.stars
              let avgStars = sum / Object.values(reviews).length || 0
              avgStars = Math.round(avgStars * 100) / 100

              const wholeNumbers = [0, 1, 2, 3, 4, 5]
              if (wholeNumbers.includes(avgStars)) avgStars = avgStars.toString() + ".0"

              return (
                <Link to={`/spots/${spot?.id}`} className="spot-link" key={spot?.id}>
                  <div className={`spot-div spot-div${i}`}>
                    <div className="img-div">
                      <img className="spot-img" src={`${spot?.images[0]?.url}`} alt="preview of spot"></img>
                    </div>
                    <div className="spot-detail">
                      <div className="spot-info">
                        <div className="spot-city-state">{`${spot?.city}, ${spot?.state}`}</div>
                        <div className="random-distance">{`${(Math.floor(Math.random() * (2000 - 200 + 1) + 200)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} miles away`}</div>
                        <div className="spot-price-night">
                          <div className="spot-price">{`$${spot?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                          <span className="spot-night">night</span>
                        </div>
                      </div>
                      <div className="spot-rating">
                        <div className="star-icon">
                          <i className="fa-solid fa-star star-design"></i>
                          <div className="number-rating">
                            {avgStars != 0 ? avgStars : "New"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }
          })
          }
        </div>}
    </div>
  )
}
export default Homepage
