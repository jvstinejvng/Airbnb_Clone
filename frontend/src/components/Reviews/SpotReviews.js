import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allSpotReviews  } from '../../store/reviews';

const AllSpotReviews = () => {

    const dispatch = useDispatch();

    const findReviews = useSelector(state => Object.values(state.reviews));

    const spotReviews = findReviews.filter(review => review.spotId === Number(id));

    useEffect(() => {
        dispatch(allSpotReviews(id))
    }, [dispatch, id]);

    return (
        <>
        {
        spotReviews && (
            <>
            {spotReviews.map(review => (
            <div key={review.id} className='eachReview'>
                    <div className='listSpotReviews'>
                        <i className="fa-solid fa-paw"></i>
                        <p>{review.stars}</p>
                    </div>
                <div className='review-content'>{review.review}</div>
            </div>
            ))}
            </>
        )}
        </>
    );
}

export default AllSpotReviews;
