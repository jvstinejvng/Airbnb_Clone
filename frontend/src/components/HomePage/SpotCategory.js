import React from "react";

import '../CSS/SpotCategory.css'

const SpotCategory = ({ handleFilter, category }) => {

  return (
    <div className="categories-nav-outer">
      <div className="category-scroll">
        <div className={category === 'Dog Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Dog Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/dog--v1.png' alt='categories'></img>
          <div className="spot-category-name">Dog</div>
        </div>
        <div className={category === 'Cat Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Cat Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/pet-commands-train.png' alt='categories'></img>
          <div className="spot-category-name">Cat</div>
        </div>
        <div className={category === 'Dog/Cat Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Dog/Cat Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/pets--v1.png' alt='categories'></img>
          <div className="spot-category-name">Dog and Cat Friendly</div>
        </div>
        <div className={category === 'Exotic Pet Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Exotic Pet Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/lizard.png' alt='categories'></img>
          <div className="spot-category-name">Exotic Pet</div>
        </div>
        <div className={category === 'Rabbit/Bunny Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Rabbit/Bunny Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/rabbit--v1.png' alt='categories'></img>
          <div className="spot-category-name">Rabbit/Bunny</div>
        </div>
        <div className={category === 'Bird Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Bird Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/parrot.png' alt='categories'></img>
          <div className="spot-category-name">Bird</div>
        </div>
        <div className={category === 'Multiple Pet Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Multiple Pet Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/group-of-animals.png' alt='categories'></img>
          <div className="spot-category-name">Multiple Pets</div>
        </div>
        <div className={category === 'Reptile Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Reptile Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/snake.png' alt='categories'></img>
          <div className="spot-category-name">Reptile</div>
        </div>
        <div className={category === 'Hamster/Guinea Pig Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Hamster/Guinea Pig Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/hamster-wheel.png' alt='categories'></img>
          <div className="spot-category-name">Hamster/Guinea Pig</div>
        </div>
        <div className={category === 'Farm Home' ? "spot-category-selected" : "spot-category-outer"} onClick={() => handleFilter('Farm Home')}>
          <img className='spot-category-icon' src='https://img.icons8.com/ios/256/livestock.png' alt='categories'></img>
          <div className="spot-category-name">Farm</div>
        </div>
      </div>
    </div>

  )
}

export default SpotCategory
