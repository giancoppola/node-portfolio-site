import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import { iMeal } from '../server/meals';

const Title = () => {
    return (
        <h1 className='page-title'>Meal Planner</h1>
    )
}

const Navigation = (props: any) => {
    return (
        <section className="navigation" id="navigation">
            <button className="navigation__btn" id="search">
                <img className='navigation__btn--icon' src="../img/icons/material-search.svg" alt="Magnifying glass icon - search" />
                SEARCH
            </button>
            <button className="navigation__btn" id="planner">
                <img className='navigation__btn--icon' src="../img/icons/material-menu.svg" alt="Menu book icon - planner" />
                PLANNER
            </button>
            <button className="navigation__btn active" id="manage">
                <img className='navigation__btn--icon' src="../img/icons/material-settings.svg" alt="Cog icon - settings" />
                MANAGE
            </button>
        </section>
    )
}

const AppWrapper = (props: any) => {
    let [meals, setMeals] = useState({ meals: [] });
    useEffect(() => {
        fetch('/api/meals/get/all')
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setMeals(data);
        })
        let btn = document.querySelector('#update-meals')
        btn?.addEventListener('click', (e) => {
            let search: string = (document.querySelector('#meal-name') as HTMLInputElement).value
            fetch(`/api/meals/get/all?name=${search}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setMeals(data);
            })
        })
    }, [])
    return (
        <>
            <Title/>
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
            <Navigation/>
        </>
    )
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<AppWrapper/>);