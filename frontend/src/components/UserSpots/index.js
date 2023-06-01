import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots, allSpots } from "../../store/spots";

import NavigationBar from "../NavigationBar";
import greenIcon from './green-listed.svg'
import greenCheck from './green-check.svg'

import "../CSS/UserSpots.css"
const UserSpots = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const allRooms = useSelector(getAllSpots)
  const userRooms = allRooms.filter(spot => spot.ownerId === sessionUser.id).sort((a,b) => b.id - a.id)

  useEffect(() => {
    dispatch(allSpots())
  }, [])

  const formatDate = (date) => {
    let dateParts = date.slice(0, 10).split("-");
    let jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
    return jsDate.toLocaleString('default', { month: 'short' }) + " " + jsDate.getDate() + ", " + jsDate.getFullYear()
  }

  return (
    <div className="manage-listing-outer">
      <div className="manage-nav-main">
        <NavigationBar isLoaded={isLoaded} />
      </div>
      <div className="nav-border"></div>
      {sessionUser ?
        <div className="manage-listing-page">
          <div className="manage-listings-header">{userRooms?.length} listings</div>
          <div className="manage-listings-scroll">
            <table className="manage-table-main">
              <tr>
                <th>LISTING</th>
                <th>STATUS</th>
                <th>PRICE</th>
                <th>INSTANT BOOK</th>
                <th>LOCATION</th>
                <th>LAST MODIFIED</th>
              </tr>
              {userRooms?.map((spot, i) => {
                return (
                  <tr>
                    <td className="listing-column">
                      <Link to={`/spots/${spot?.id}`} className="spot-link" key={spot?.id}>
                        <img className="listing-img" src={`${spot?.images[0]?.url}`} alt="preview of spot"></img>
                      </Link>
                      <Link to={`/spots/${spot?.id}`} className="spot-link" key={spot?.id}>
                        <span className="listing-name">{spot?.name}</span>
                      </Link>
                    </td>
                    <td><img src={greenIcon} alt='listed' className="green-icon"></img>Listed</td>
                    <td className="listing-price">{`$${spot?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/night`}</td>
                    <td><div className="listing-instant-book"><img src={greenCheck} alt='booking' className="green-checked"></img><span>On</span></div></td>
                    <td className="listing-city-state">{`${spot?.city}, ${spot?.state}`}</td>
                    <td>{formatDate(spot?.updatedAt)}</td>
                  </tr>
                )
              })
            }
            </table>
          </div>
        </div> : <>
          <div className="no-session-user">
            Error 401 - Unauthorized
            <div className="no-session-inner">
              Please login to continue
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default UserSpots
