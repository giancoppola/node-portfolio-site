import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { iMeal } from '../../server/meals';

export const Planner = () => {
    type STATUS = 'READY' | 'LOADING' | 'ERROR';
    let [status, setStatus] = useState<STATUS>('LOADING');
    let [meals, setMeals] = useState({ meals: [] });
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
            let btn = document.querySelector('#update-meals')
            btn?.addEventListener('click', (e) => {
                let search: string = (document.querySelector('#meal-name') as HTMLInputElement).value
                setStatus('LOADING')
                fetch(`/api/meals/get/all?name=${search}`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    setMeals(data);
                    setStatus('READY')
                })
            })
        }
        catch(e){
            setStatus('ERROR')
        }
    }, [])
    return (
        <>
            {status == 'ERROR' && <>ERROR</>}
            {status == "LOADING" && <p>LOADING</p>}
            {status == 'READY' &&
                <div>
                    <input type="text" name="meal-name" id="meal-name" />
                    <button id="update-meals">Search Meals</button>
                    {(meals.meals as Array<iMeal>).map((meal) => {
                        return (
                            //@ts-ignore
                            <div key={meal._id}>
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
                    })}
                </div>
            }
        </>
    )
}