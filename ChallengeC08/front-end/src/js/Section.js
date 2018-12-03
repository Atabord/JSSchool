import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { Route, Switch, Redirect } from 'react-router-dom';
import Books from './Books';
import BookInfo from './bookInfo';
import NotFound from './404';


class Section extends Component {
    constructor() {
        super();
        this.state = {
            contentTitle: 'Home',
            pages: ['/Quito', '/Medellin', '/Cartagena', '/Digital', '/Personal_Loans'],
            notFound: false
        }
        this.createRedirects = this.createRedirects.bind(this);
        this.createRoutes = this.createRoutes.bind(this);
        this.handleNotFount = this.handleNotFount.bind(this);
    };

    handleNotFount(status) {
        this.setState({
            notFound: status
        })
    }

    createRedirects() {
        const { pages } = this.state;
        let routes = [];
        pages.map((page)=> {
            routes.push(<Route path={`/bookshelf${page}`} exact key={`/bookshelf${page}`} render = {
                () => (<Redirect to={`/bookshelf${page}/1`} />)
            }/>)
        });
        return routes;
    };

    createRoutes() {
        const { pages } = this.state;
        let routes = [];
        
        pages.map((page) => {
            let env = page.substring(1);
            env === "Personal_Loans" ? env = process.env.PERSONAL_LOANS :
            env = `${process.env.BOOKSHELF}${env}`;
            routes.push(
                <Route path={`/bookshelf${page}/:page(\\d)`} key={page} render = {
                    ({match}) => {
                        if (this.state.notFound === false) {
                            return(
                                <Books url={`${env}&page=${match.params.page}`} 
                                    search={this.props.search} 
                                    handleLog={this.props.handleLog}                                
                                    path={`/bookshelf${page}`}
                                    notFound={this.handleNotFount}
                                />
                            )
                        } else {
                            return(
                                <Redirect to="/bookshelf/NotFound" />
                            )
                        }
                    }
                }/>
            )
        });
        return routes;
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
            <Switch>
                {this.createRedirects()}
                <Route path='/bookshelf/:page(\d)?' exact render = {
                    ({match}) => {
                        return(
                            <Books url={`${process.env.HOME}?page=${match.params.page}`} 
                                search={this.props.search} 
                                handleLog={this.props.handleLog}
                                path='/bookshelf' 
                                notFound={this.handleNotFount}
                            />
                        )
                    }
                }/>
                {this.createRoutes()}
                <Route path='/bookshelf/book/:id' exact render= {
                    ({match}) => {
                        console.log(`${process.env.HOME}/${match.params.id}`);
                        return(
                            <BookInfo url={`${process.env.HOME}/${match.params.id}`} 
                                search={this.props.search} 
                                handleLog={this.props.handleLog}
                                notFound={this.handleNotFount}
                            />
                        )
                    }
                } />
                <Route component={NotFound}/>
            </Switch>
        </section>
        )
    }
}

export default Section;