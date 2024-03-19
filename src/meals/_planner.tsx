import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { iMeal } from '../../server/meals';

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export const AddButton = () => {
    return (
        <button className="planner-section__add" id="add-day"
        onClick={() => console.log('add')}>
            <img src="../img/icons/material-add-dm-primary.svg" alt="Add Icon" />
            Add
        </button>
    )
}

export const Day = (props: any) => {
    return (
        <li className="day" id={props.id} key={props.id}>
            <div className="day__shown">
                <span className="day__icon">{props.icon}</span>
                <div className="day__info">
                    <h4 className="day__meal-name">{props.name}</h4>
                    <div className="day__data">
                        <p className="day__prep">{props.prepTime}</p>
                        <p className="day__cook">{props.cookTime}</p>
                        <p className="day__feeds">{props.feeds}</p>
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
    return (
        <div className="days" id="days">
            <ul className="days__list" id="days-list">

            </ul>
        </div>
    )
}

export const Planner = () => {
    return (
        <section className="narrow-container planner-section" id="planner">
            <h2>planner</h2>
            <Days/>
            <AddButton/>
        </section>
    )
}