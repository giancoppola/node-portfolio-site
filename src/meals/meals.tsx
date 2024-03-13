import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { iMeal } from '../../server/meals';
import { Manage, PostForm } from './_manage';
import { Planner } from './_planner';
import { Search } from './_search';

const Title = () => {
    return (
        <h1 className='page-title'>Meal Planner</h1>
    )
}

const Navigation = (props: any) => {
    const location = useLocation();
    useEffect(() => {
        console.log(location);
        let search: HTMLAnchorElement = document.querySelector('#search')!;
        let planner: HTMLAnchorElement = document.querySelector('#planner')!;
        let manage: HTMLAnchorElement = document.querySelector('#manage')!;
        if (location.pathname.startsWith('/meal-planner/search')){
            search.classList.add('active');
            planner.classList.remove('active');
            manage.classList.remove('active');
        }
        else if (location.pathname.startsWith('/meal-planner/manage')){
            search.classList.remove('active');
            planner.classList.remove('active');
            manage.classList.add('active');
        }
        else if (location.pathname.startsWith('/meal-planner')){
            search.classList.remove('active');
            planner.classList.add('active');
            manage.classList.remove('active');
        }
    }, [location])
    return (
        <section className="navigation" id="navigation">
            <Link className='navigation__btn' id="search" to='meal-planner/search'>
                <img className='navigation__btn--icon' src="../img/icons/material-search.svg" alt="Magnifying glass icon - search" />
                SEARCH
            </Link>
            <Link className='navigation__btn' id="planner" to='/meal-planner'>
                <img className='navigation__btn--icon' src="../img/icons/material-menu.svg" alt="Menu book icon - planner" />
                PLANNER
            </Link>
            <Link className='navigation__btn' id="manage" to='meal-planner/manage/add'>
                <img className='navigation__btn--icon' src="../img/icons/material-settings.svg" alt="Cog icon - settings" />
                MANAGE
            </Link>
        </section>
    )
}

const AppWrapper = (props: any) => {
    return (
        <Router>
            <Title/>
            <Routes>
                <Route path='/meal-planner' element={<Planner/>}/>
                <Route path='/meal-planner/manage' element={<Manage/>}>
                    <Route index element={<PostForm/>}/>
                    <Route path='/meal-planner/manage/add' element={<PostForm/>}/>
                    <Route path='/meal-planner/manage/edit' element={<PostForm/>}/>
                    <Route path='/meal-planner/manage/delete' element={<PostForm/>}/>
                </Route>
                <Route path='/meal-planner/search' element={<Search/>}/>
                <Route path='/meal-planner/*' element={<Planner/>}/>
            </Routes>
            <Navigation/>
        </Router>
    )
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<AppWrapper/>);