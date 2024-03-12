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
    let [message, setMessage] = useState('');
    useEffect(() => {
        let form: HTMLFormElement = document.querySelector<HTMLFormElement>('#post-form')!;
        let formControls: HTMLFormControlsCollection = form.elements;
        let submit: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#post-submit')!;
        console.log(form.elements);
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            formValidation(formControls);
        })
    }, [])
    type MESSAGE = 'ERROR' | 'SUCCESS';
    const formMessage = (text: string, type: MESSAGE) => {
        let message: HTMLParagraphElement = document.querySelector('#post-message')!;
        message.classList.remove('success', 'error');
        type === "SUCCESS" ? message.classList.add('success') : message.classList.add('error');
        setMessage(text);
    }
    const formValidation = async (formControls: HTMLFormControlsCollection) => {
        let pass = false;
        let data = formControls as any;
        await fetch(`/api/meals/get/pass?pass=${data.pass.value}`)
        .then(res => res.text())
        .then((data) => { if(data === 'true') {pass = true;} });
        if (pass){
            let valid: boolean = true;
            !data.name.value ? ( formMessage('Meal must have a name!', 'ERROR'), valid = false ) : data;
            !data.emoji.value ? ( formMessage('Meal must have an icon!', 'ERROR'), valid = false ) : data;
            !data.prepTime.value ? ( formMessage('Please add the prep time!', 'ERROR'), valid = false ) : data;
            !data.cookTime.value ? ( formMessage('Please add the cook time!', 'ERROR'), valid = false ) : data;
            !data.feeds.value ? ( formMessage('Please add how many people it feeds!', 'ERROR'), valid = false ) : data;
            !data.ingredients.value ? ( formMessage('Please add the ingredients!', 'ERROR'), valid = false ) : data;
            !data.recipe.value ? ( formMessage('Please add the recipe!', 'ERROR'), valid = false ) : data;
            !data.tags.value ? ( formMessage('Please add at least one tag!', 'ERROR'), valid = false ) : data;
            if (valid) {
                try {
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
                    .then(res => res.json())
                    .then((data: any) => {
                        if (data.error){
                            formMessage(data.error, 'ERROR')
                        }
                        else {
                            formMessage('Meal added successfully!', 'SUCCESS');
                        }
                    });
                }
                catch(e){
                    formMessage((e as Error).message, 'ERROR');
                }
            }
        }
        else {
            formMessage('Wrong password!', 'ERROR');
        }
    }
    return (
        <form id="post-form">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="post-name" required/>
            <label htmlFor="emoji">Emoji</label>
            <input type="text" name="emoji" id="post-emoji" required/>
            <label htmlFor="prepTime">Prep Time</label>
            <input type="number" name="prepTime" id="post-prepTime" required/>
            <label htmlFor="cookTime">Cook Time</label>
            <input type="number" name="cookTime" id="post-cookTime" required/>
            <label htmlFor="feeds">Feeds</label>
            <input type="number" name="feeds" id="post-feeds" required/>
            <label htmlFor="veggie">Veggie</label>
            <input type="checkbox" role='switch' name="veggie" id="post-veggie"/>
            <label htmlFor="ingredients">Ingredients</label>
            <input type="text" name="ingredients" id="post-ingredients" required/>
            <label htmlFor="recipe">Recipe</label>
            <input type="text" name="recipe" id="post-recipe" required/>
            <label htmlFor="link">Link</label>
            <input type="text" name="link" id="post-link"/>
            <label htmlFor="tags">Tags</label>
            <input type="text" name="tags" id="post-tags" required/>
            <label htmlFor="pass">Password</label>
            <input type="password" name="pass" id="post-pass" required/>
            <button id="post-submit">Submit</button>
            <p className='message' id="post-message">{message}</p>
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