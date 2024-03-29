import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { iMeal } from '../../server/meals';

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export const AddButton = (props: any) => {
    return (
        <button className="planner-section__add" id="add-day"
        onClick={() => props.add()}>
            <img src="../img/icons/material-add-dm-primary.svg" alt="Add Icon" />
            Add
        </button>
    )
}

export const Day = (props: any) => {
    return (
        <li className="day" id={props.id} key={props.id}>
            <div className="day__shown">
                <span className="day__icon">{props.meal.icon}</span>
                <div className="day__info">
                    <h4 className="day__meal-name">{props.meal.name}</h4>
                    <div className="day__data">
                        <p className="day__prep">{props.meal.prepTime}</p>
                        <p className="day__cook">{props.meal.cookTime}</p>
                        <p className="day__feeds">{props.meal.feeds}</p>
                    </div>
                </div>
                <div className="day__modify">
                    <button className="btn" id={props.id + 'random'}
                    onClick={() => console.log('random')}>Random</button>
                    <button className="btn" id={props.id + 'info'}
                    onClick={() => console.log('info')}>More Info</button>
                    <button className="btn" id={props.id + 'delete'}
                    onClick={() => console.log('delete')}>Delete</button>
                </div>
            </div>
            <div className="day__extra">

            </div>
        </li>
    )
}

export const Days = () => {
    type STATUS = 'READY' | 'LOADING' | 'ERROR';
    let [status, setStatus] = useState<STATUS>('LOADING');
    let [meals, setMeals] = useState<Array<iMeal>>([]);
    let [days, setDays] = useState<number>(0);
    const addMeal = () => {
        if (days < 7){
            setStatus('LOADING');
            try{
                fetch(`/api/meals/get/all`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    setMeals([...meals, data.meals[getRandomInt(0, data.meals.length-1)]]);
                    setStatus('READY')
                })
            }
            catch(e){
                setStatus('ERROR');
            }
        }
    }
    useEffect(() => {
        try{
            setStatus('LOADING');
            fetch('/api/meals/get/all')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setMeals([...meals, data.meals[getRandomInt(0, data.meals.length - 1)]]);
                setStatus('READY')
            })
        }
        catch(e){
            setStatus('ERROR')
        }
    }, [])
    return (
        <>
            <div className="days" id="days">
                <ul className="days__list" id="days-list">
                    {meals.length == 0 && <>LOADING</>}
                    {meals.length > 0 && meals.map((meal, index) => {
                        return (
                            <Day meal={meal} id={`meal-${index}`} />
                        )
                    })}
                </ul>
            </div>
            <AddButton add={addMeal} days={days}/>
        </>
    )
}

export const Planner = () => {
    return (
        <section className="narrow-container planner-section" id="planner-section">
            <Days/>
        </section>
    )
}