import React, {useState, useEffect} from 'react';
import {Outlet, Link} from 'react-router-dom';
import { iMeal } from '../../server/meals';

export const ManageNav = () => {
    return (
        <section className="manage-nav" id="manage-nav">
            <Link className="manage-nav__link" to='/meal-planner/manage/add'>Add</Link>
            <Link className="manage-nav__link" to='/meal-planner/manage/edit'>Edit</Link>
            <Link className="manage-nav__link" to='/meal-planner/manage/delete'>Delete</Link>
        </section>
    )
}

export const PostForm = () => {
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
            ((data.name.value as string).length < 3) ? ( formMessage('Name must be longer than 2 characters!', 'ERROR'), valid = false ) : data;
            !data.emoji.value ? ( formMessage('Meal must have an icon!', 'ERROR'), valid = false ) : data;
            ((data.emoji.value as string).length > 1) ? ( formMessage('Please select only one emoji!', 'ERROR'), valid = false ) : data;
            !data.prepTime.value ? ( formMessage('Please add the prep time!', 'ERROR'), valid = false ) : data;
            !data.cookTime.value ? ( formMessage('Please add the cook time!', 'ERROR'), valid = false ) : data;
            !data.feeds.value ? ( formMessage('Please add how many people it feeds!', 'ERROR'), valid = false ) : data;
            !data.ingredients.value ? ( formMessage('Please add some ingredients!', 'ERROR'), valid = false ) : data;
            !data.recipe.value ? ( formMessage('Please add a recipe!', 'ERROR'), valid = false ) : data;
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
        <>
            <form className='manage-form' id="post-form">
                <div className='manage-form__field'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="post-name" required/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="emoji">Emoji</label>
                    <input type="text" name="emoji" id="post-emoji" required/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="prepTime">Prep Time</label>
                    <input type="number" name="prepTime" id="post-prepTime" required/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="cookTime">Cook Time</label>
                    <input type="number" name="cookTime" id="post-cookTime" required/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="feeds">Feeds</label>
                    <input type="number" name="feeds" id="post-feeds" required/>
                </div>
                <div className="manage-form__field checkbox">
                    <label htmlFor="veggie">Veggie</label>
                    <input type="checkbox" role='switch' name="veggie" id="post-veggie"/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="ingredients">Ingredients</label>
                    <input type="text" name="ingredients" id="post-ingredients" required/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="recipe">Recipe</label>
                    <input type="text" name="recipe" id="post-recipe" required/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="link">Link</label>
                    <input type="text" name="link" id="post-link"/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" id="post-tags" required/>
                </div>
                <div className="manage-form__field">
                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" id="post-pass" required/>
                </div>
                <div className="manage-form__field button">
                    <button className='btn' id="post-submit">Submit</button>
                </div>
            </form>
            <p className='message' id="post-message">{message}</p>
        </>
    )
}

export const Manage = () => {
    return (
        <>
            <ManageNav/>
            <Outlet/>
        </>
    )
}