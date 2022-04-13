import React from 'react'
import FilterListToggle from '../../common/FilterListToggle'
import { categoryList } from '../../../constants'
import './styles.css';
import CheckboxProton from '../../common/CheckboxProton';
import SliderProton from '../../common/SliderProton';



const FilterPanel = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectRating,
  cusines,
  changeChecked,
  changedPrice,
  selectedPrice, }) => {
  return (
    <div>
      {/* Category */}
      <div className='input-group'>
        <p className='label'>Category</p>
        <FilterListToggle options={categoryList} value={selectedCategory} selectedToggle={selectCategory} />
      </div>
      {/* Cusines */}
      <div className='input-group'>
        <p className='label'>
          sections
        </p>
        {cusines.map((cuisine) => (
          <CheckboxProton
            key={cuisine.id}
            changeChecked={changeChecked}
            cuisine={cuisine}
          />
        ))}
      </div>

      {/* Price Range */}
      <div className='input-group'>
        <p className='label-range'>Price Range</p>
        <SliderProton value={selectedPrice}
          changedPrice={changedPrice}/>
          </div>
    </div>
  )
}

export default FilterPanel