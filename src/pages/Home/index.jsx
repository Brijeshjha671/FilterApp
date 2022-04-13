import React, { useEffect, useState } from 'react'
import FilterPanel from '../../components/Home/Filterpanel'
import List from '../../components/Home/List'
import SearchBar from '../../components/Home/Searchbar'
import { dataList } from '../../constants';
import './style.css';


const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
    const[list,setList] = useState(dataList)


    const [cusines, setCusines] = useState([{
        id: 1,
        checked: false,
        label: 'Laptop',
    },
    {
        id: 2,
        checked: false,
        label: 'Mobile',
    },
    {
        id: 3,
        checked: false,
        label: 'Laptop',
    },]

    );

    const handleSelectCategory = (event, value) =>
        !value ? null : setSelectedCategory(value);

    const handleSelectRating = (event, value) => {
        !value ? null : setSelectedRating(value);
    }

    const handleChangeChecked = id => {
        debugger
        const cuisinesStateList = cusines;
        const changeCheckedCuisines = cuisinesStateList.map(
            (item) => item.id === id ? { ...item, checked: !item.checked } : item
        );

        setCusines(changeCheckedCuisines);
    }

    const handleChangePrice = (event, value) => setSelectedPrice(value);

    const applyFilters = () => {
        debugger
       let  updatedList = dataList;

        //Rating Filter
        if(selectedRating){
            updatedList = updatedList.filter(
                (item) => parseInt(item.rating) === parseInt(selectedRating)
            );
        }

        //Category Filter
        if (selectedCategory) {
            updatedList = updatedList.filter(
              (item) => item.category === selectedCategory
            );
          }

          //cusine filter
          const cuisineChecked = cusines
          .filter((item) => item.checked)
          .map((item)=>item.label.toLocaleLowerCase());

          if(cuisineChecked.length){
              updatedList = updatedList.filter((item)=>
              cuisineChecked.includes(item.cuisine)
              )
          }

          //Price Filter
          const minPrice = selectedPrice[0];
          const maxPrice = selectedPrice[1];

          updatedList = updatedList.filter(
              (item) => item.price >= minPrice && item.price <= maxPrice
          );



        setList(updatedList);
    }

    useEffect(() => {
        debugger
        applyFilters();
    },[selectedRating,selectedCategory,cusines,selectedPrice])


    return (
        <div className='home'>
            {/* Search Bar */}
            <SearchBar />
            <div className='home_panelList-wrap'>
                <div className='home_panel-wrap'>
                    {/* Side PAnels */}
                    <FilterPanel
                        selectCategory={handleSelectCategory}
                        selectedCategory={selectedCategory}
                        selectRating={handleSelectRating}
                        selectedRating={selectedRating}
                        cusines={cusines}
                        changeChecked={handleChangeChecked}
                        selectedPrice={selectedPrice}
                        changedPrice={handleChangePrice} />
                </div>
                <div className='home_list-wrap'>
                    {/* List & Empty View */}
                    <List list={list}/>
                </div>
            </div>
        </div>
    )
}

export default Home