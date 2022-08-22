import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadReviews } from "../../store/reviews";


function StarReviews({ spot }) {
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(null)


  useEffect(() => {
    async function fetchData() {
      if (!spot?.id) return
      const response = await dispatch(loadReviews(spot?.id));
    
      if (!response?.length) {
        return setAvgRating('New')
      }
      const sum = response.reduce((acc, review) => (review?.stars ?? 0) + acc, 0)
      const avg = (sum/response.length).toFixed(2)
      setAvgRating(avg)
    }
    fetchData();
  }, [dispatch, spot?.id]);

  return (
    <>
      <>
        <i className="fa-solid fa-paw"></i>
        <span className="avg-rating">
          {avgRating}
        </span>
      </>
    </>
  );
}

export default StarReviews;
