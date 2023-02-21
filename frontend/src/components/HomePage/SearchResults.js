import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllRooms, allSpots } from "../../store/spots";
import NavigationBar from "../NavigationBar";
import SearchMap from "./SearchMap";

import "../CSS/SearchResults.css"

function SearchResults({ isLoaded }) {
  let { destination } = useParams()
  let { pets } = useParams()

  const dispatch = useDispatch()
  const spots = useSelector(getAllRooms)

  useEffect(() => {
    dispatch(allSpots())
  }, [])

  const searchRooms = spots.filter(spot => {
    destination = destination.toLowerCase()
    return spot.city.toLowerCase().includes(destination) || spot.state.toLowerCase().includes(destination) || spot.country.toLowerCase().includes(destination) && spot.pets >= pets
  })

  return (
    <>
      <NavigationBar isLoaded={isLoaded} />
      <div className="search-spots-main">
        <div className="search-spots-left">
          {searchRooms.length > 0 ? <>
            {searchRooms?.map((spot, i) => {

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
                    <div className={`search-spot-outer`}>
                      <div className="search-spot-img-outer">
                        <img className="search-spot-img" src={`${spot?.images[0]?.url}`} alt="preview of spot"></img>
                      </div>
                      <div className="search-spot-detail">
                        <div className="search-spot-info">
                          <div className="search-spot-city-state">{`${spot?.city}, ${spot?.state}`}</div>
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
            })} </> : <div className="no-search-results">0 search results matching "{destination}".</div>
          }
        </div>
        <div className="search-spots-right">
          <SearchMap searchRooms={searchRooms} />
        </div>
      </div>
    </>
  )
}

export default SearchResults
