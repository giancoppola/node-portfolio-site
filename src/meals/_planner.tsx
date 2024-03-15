import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { iMeal } from '../../server/meals';

export const AddButton = () => {
    return (
        <button className="planner-section__add" id="add-day"
        onClick={() => console.log('add')}>
            <img src="../img/icons/material-add-dm-primary.svg" alt="Add Icon" />
            Add
        </button>
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