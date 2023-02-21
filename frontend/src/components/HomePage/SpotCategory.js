import React from "react";

import '../CSS/SpotCategory.css'

const SpotCategory = ({ handleFilter, category }) => {

  return (
    <div className="categories-nav-outer">
      <div className="category-scroll">
        <div className={category === 'Dog Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Dog Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/dog--v1.png' alt='categories'></img>
          <div className="spot-category-name">Dog Home</div>
        </div>
        <div className={category === 'Cat Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Cat Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/pet-commands-train.png' alt='categories'></img>
          <div className="spot-category-name">Cat Home</div>
        </div>
        <div className={category === 'Dog and Cat Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Dog and Cat home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/pets--v1.png' alt='categories'></img>
          <div className="spot-category-name">Dog and Cat Home</div>
        </div>
        <div className={category === 'Exotic Pet Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Exotic Pet Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/lizard.png' alt='categories'></img>
          <div className="spot-category-name">Exotic Pet Home</div>
        </div>
        <div className={category === 'Rabbit/Bunny Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Rabbit/Bunny Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/rabbit--v1.png' alt='categories'></img>
          <div className="spot-category-name">Rabbit/Bunny Home</div>
        </div>
        <div className={category === 'Bird Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Bird Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/parrot.png' alt='categories'></img>
          <div className="spot-category-name">Bird Home</div>
        </div>
        <div className={category === 'Multiple Pet Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Multiple Pet Home')}>
          <img className='spot-category-icon' src='https://icons8.com/icon/ByOdUFbnaHsc/group-of-animals' alt='categories'></img>
          <div className="spot-category-name">Multiple Pet Home</div>
        </div>
        <div className={category === 'Reptile Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Reptile Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/snake.png' alt='categories'></img>
          <div className="spot-category-name">Reptile Home</div>
        </div>
        <div className={category === 'Hamster/Guinea Pig Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Hamster/Guinea Pig Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/hamster-wheel.png' alt='categories'></img>
          <div className="spot-category-name">Hamster/Guinea Pig Home</div>
        </div>
        <div className={category === 'Farm Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Farm Home')}>
          <img className='spot-category-icon' src='https://icons8.com/icon/4Rn1SpjpHhYO/livestock' alt='categories'></img>
          <div className="spot-category-name">Farm Home</div>
        </div>
      </div>
    </div>

  )
}

export default SpotCategory
