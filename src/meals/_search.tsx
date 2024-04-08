import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { iMeal } from '../../server/meals';

const SearchForm = (props: any) => {
    let [keyword, setKeyword] = useState<string>('')
    return (
        <div className="search">
            <button className="search__clear" id="clear-search"
            onClick={() => setKeyword('')}>
                <img src="../img/icons/material-x.svg" alt="Clear" />
            </button>
            <input value={keyword} className='search__input' type="text" name="meal-name" id="meal-name"
            onChange={e => setKeyword(e.target.value)}
            onKeyUp={(e) => { e.key == "Enter" ? props.fetchMeals(keyword) : e}}/>
            <button className="search__btn" id="search-meals"
            onClick={() => props.fetchMeals(keyword)}>
                <img src="../img/icons/material-arrow-forward.svg" alt="Search" />
            </button>
        </div>
    )
}

export const Search = () => {
    type STATUS = 'READY' | 'LOADING' | 'ERROR';
    let [status, setStatus] = useState<STATUS>('LOADING');
    let [meals, setMeals] = useState({ meals: [] });
    const fetchMeals = (keyword: string) => {
        console.log(keyword);
        setStatus('LOADING');
        fetch(`/api/meals/get/all?name=${keyword}`)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setMeals(data);
            setStatus('READY')
        })
    }
    useEffect(() => {
        try{
            setStatus('LOADING');
            fetch('/api/meals/get/all') 
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setMeals(data);
                setStatus('READY')
            })
        }
        catch(e){
            setStatus('ERROR')
        }
    }, [])
    return (
        <section className='narrow-container search-section' id='search-section'>
            <SearchForm fetchMeals={fetchMeals}/>
            <div className='results'>
                {status == 'ERROR' && <>ERROR</>}
                {status == "LOADING" && <p>LOADING</p>}
                {status == 'READY' &&
                    (meals.meals as Array<iMeal>).map((meal) => {
                        return (
                            //@ts-ignore
                            <div key={meal._id}>
                                <p>{meal.emoji}</p>
                                <p>{meal.name}</p>
                                <p>{meal.cookTime}</p>
                                <p>{meal.prepTime}</p>
                                <p>{meal.veggie}</p>
                                <ul>
                                {meal.ingredients.map((ing) => {
                                    return (
                                        <li>{ing}</li>
                                    )
                                })}
                                </ul>
                                <a href={meal.link}>{meal.link}</a>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}