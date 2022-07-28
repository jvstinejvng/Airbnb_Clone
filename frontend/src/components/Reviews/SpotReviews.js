import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { allSpotReviews  } from '../../store/reviews';

const AllSpotReviews = () => {

    const dispatch = useDispatch();

    let { spotId } = useParams();
    spotId = Number(spotId);

    const findReviews = useSelector(state => Object.values(state.reviews));

    const spotReviews = findReviews.filter(review => review.spotId);

    useEffect(() => {
        dispatch(allSpotReviews(spotId))
    }, [dispatch, ]);

    return (
        console.log("hello")

        // <>
        // {
        // spotReviews && (
        //     <>
        //     {spotReviews.map(review => (
        //     <div key={review.id} className='eachReview'>
        //             <div className='listSpotReviews'>
        //                 <i className="fa-solid fa-paw"></i>
        //                 <p>{review.stars}</p>
        //             </div>
        //         <div className='review-content'>{review.review}</div>
        //     </div>
        //     ))}
        //     </>
        // )}
        // </>
    );
}

export default AllSpotReviews;
