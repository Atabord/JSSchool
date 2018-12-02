import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { Route, Switch, Redirect } from 'react-router-dom';
import Books from './Books';
import NotFound from './404';


class Section extends Component {
    constructor() {
        super();
        this.state = {
            contentTitle: 'Home',
            pages: ['', '/Quito', '/Medellin', '/Cartagena', '/Digital', '/Personal-Loans']
        }
        this.createRedirects = this.createRedirects.bind(this);
    };

    createRedirects() {
        const { pages } = this.state;
        let routes = [];
        pages.map((page)=> {
            routes.push(<Route path={`/bookshelf${page}`} exact key={`/bookshelf${page}`} render = {
                () => (<Redirect to={`/bookshelf${page}/1`} />)
            }/>)
        })
        return routes;
    };

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
            <Switch>
                {this.createRedirects()}
                <Route path='/bookshelf/:page' exact render = {
                    ({match}) => {
                        return(
                            <Books url={`${process.env.HOME}?page=${match.params.page}`} 
                                filterBy={this.props.filter} 
                                logged={this.props.logged} 
                                handleLog={this.props.handleLog}
                                path='/bookshelf' 
                                routePerPage={this.routePerPage}
                            />
                        )
                    }
                }/>
                <Route path='/bookshelf/Quito/:page' render = {
                    () => {
                        return(
                            <Books url={`${process.env.QUITO}&page=1`} 
                                filterBy={this.props.filter} 
                                logged={this.props.logged} 
                                handleLog={this.props.handleLog}
                                path='/bookshelf/Quito' 
                                routePerPage={this.routePerPage}
                            />
                        )
                    }
                }/>
                <Route path='/bookshelf/Cartagena/:page' render = {
                    () => {
                        return(
                            <Books url={`${process.env.CARTAGENA}&page=1`} 
                                filterBy={this.props.filter} 
                                logged={this.props.logged} 
                                handleLog={this.props.handleLog}
                                path='/bookshelf/Cartagena' 
                                routePerPage={this.routePerPage}
                            />
                        )
                    }
                }/>
                <Route path='/bookshelf/Medellin/:page' render = {
                    () => {
                        return(
                            <Books url={`${process.env.MEDELLIN}&page=1`} 
                                filterBy={this.props.filter} 
                                logged={this.props.logged} 
                                handleLog={this.props.handleLog}
                                path='/bookshelf/Medellin' 
                                routePerPage={this.routePerPage}
                            />
                        )
                    }
                }/>
                <Route path='/bookshelf/Digital/:page' render = {
                    () => {
                        return(
                            <Books url={`${process.env.DIGITAL}&page=1`} 
                                filterBy={this.props.filter} 
                                logged={this.props.logged} 
                                handleLog={this.props.handleLog}
                                path='/bookshelf/Digital' 
                                routePerPage={this.routePerPage}
                                />
                        )
                    }
                }/>
                <Route path='/bookshelf/Personal-Loans/:page' render = {
                    () => {
                        return(
                            <Books url={`${process.env.PERSONAL_LOANS}&page=1`} 
                                filterBy={this.props.filter} 
                                logged={this.props.logged} 
                                handleLog={this.props.handleLog}
                                path='/bookshelf/Personal-Loans' 
                                routePerPage={this.routePerPage}
                            />
                        )
                    }
                }/>
                <Route component={NotFound}/>
            </Switch>
        </section>
        )
    }
}

export default Section;