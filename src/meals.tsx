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

const PostForm = () => {
    useEffect(() => {
        let form: HTMLFormElement = document.querySelector<HTMLFormElement>('#post-form')!;
        let formControls: HTMLFormControlsCollection = form.elements;
        let submit: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#post-submit')!;
        console.log(form.elements);
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            let data = formControls as any;
            fetch('/api/meals/post/new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name.value,
                    emoji: data.emoji.value,
                    prepTime: data.prepTime.value,
                    cookTime: data.cookTime.value,
                    feeds: data.feeds.value,
                    veggie: data.veggie.checked,
                    ingredients: data.ingredients.value,
                    recipe: data.recipe.value,
                    link: data.link.value,
                    tags: data.tags.value
                })
            })
        })
    }, [])
    return (
        <form id="post-form">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="post-name"/>
            <label htmlFor="emoji">Emoji</label>
            <input type="text" name="emoji" id="post-emoji"/>
            <label htmlFor="prepTime">Prep Time</label>
            <input type="number" name="prepTime" id="post-prepTime"/>
            <label htmlFor="cookTime">Cook Time</label>
            <input type="number" name="cookTime" id="post-cookTime"/>
            <label htmlFor="feeds">Feeds</label>
            <input type="number" name="feeds" id="post-feeds"/>
            <label htmlFor="veggie">Veggie</label>
            <input type="checkbox" role='switch' name="veggie" id="post-veggie"/>
            <label htmlFor="ingredients">Ingredients</label>
            <input type="text" name="ingredients" id="post-ingredients"/>
            <label htmlFor="recipe">Recipe</label>
            <input type="text" name="recipe" id="post-recipe"/>
            <label htmlFor="link">Link</label>
            <input type="text" name="link" id="post-link"/>
            <label htmlFor="tags">Tags</label>
            <input type="text" name="tags" id="post-tags"/>
            <button id="post-submit">Submit</button>
        </form>
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
            <PostForm/>
            <Navigation/>
        </>
    )
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<AppWrapper/>);