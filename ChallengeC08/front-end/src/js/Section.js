import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, NavLink, Redirect, Prompt } from 'react-router-dom';
import Books from './Books';


class Section extends Component {
    constructor() {
        super();
        this.state = {
            contentTitle: 'Home'
        }
    }
    
    render() {
        return(
            <section>
            <div className="section-header">
                <h2>{ this.state.contentTitle }</h2>
                <div className="list-icons">
                    <a href="#">
                        <FontAwesomeIcon icon={faThLarge} />
                    </a>
                    <a href="#">
                        <FontAwesomeIcon icon={faThList} />
                    </a>
                </div>
            </div>

            <Route path='/bookshelf' exact render = {
                () => {
                    return(
                        <Books url={process.env.HOME} filterBy={this.props.filter} logged={this.props.logged} handleLog={this.props.handleLog}/>
                    )
                }
            }/>
            <Route path='/bookshelf/Quito' exact render = {
                () => {
                    return(
                        <Books url={process.env.QUITO} filterBy={this.props.filter} logged={this.props.logged} handleLog={this.props.handleLog}/>
                    )
                }
            }/>
            <Route path='/bookshelf/Cartagena' exact render = {
                () => {
                    return(
                        <Books url={process.env.CARTAGENA} filterBy={this.props.filter} logged={this.props.logged} handleLog={this.props.handleLog}/>
                    )
                }
            }/>
            <Route path='/bookshelf/Medellin' exact render = {
                () => {
                    return(
                        <Books url={process.env.MEDELLIN} filterBy={this.props.filter} logged={this.props.logged} handleLog={this.props.handleLog}/>
                    )
                }
            }/>
            <Route path='/bookshelf/Digital' exact render = {
                () => {
                    return(
                        <Books url={process.env.DIGITAL} filterBy={this.props.filter} logged={this.props.logged} handleLog={this.props.handleLog}/>
                    )
                }
            }/>
            <Route path='/bookshelf/Personal-Loans' exact render = {
                () => {
                    return(
                        <Books url={process.env.PERSONAL_LOANS} filterBy={this.props.filter} logged={this.props.logged} handleLog={this.props.handleLog}/>
                    )
                }
            }/>
        </section>
        )
    }
}

export default Section;