import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./SpotsPage.css";

const AllSpots = () => {

  const dispatch = useDispatch();
  const allSpots = useSelector(state => Object.values(state.spots));
  
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!allSpots) return null;

  return (
    <div className='allSpots'>
        { allSpots.map(spot => (
          <Link key={spot.id} to={`/spots/${spot.id}`}>
            <div className='eachSpot'>
                <div className='spotImage'>
                  <img className='spotPreviewImage' src={spot.previewImage} alt='previewImage' />
                </div>
                <div className='spotDetails'>
                  <div className='spotName'>{spot.name}</div>
                  <div>{`${spot.city}, ${spot.state}`}</div>
                  <div className='spotPrice'><span>${spot.price}</span>night</div>
              </div>  
            </div>
          </Link>
        ))
      }   
    </div>
  )
};

export default AllSpots;
  