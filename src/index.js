import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route,  } from 'react-router-dom';

import TaskList from './components/TaskList';
import Task from './components/Task';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    	
    	<BrowserRouter>
    		<Switch>
	         	
	         	<Route exact path='/' component={TaskList} />
                <Route exact path='/task/:id' component={Task} />
        	 	<Route path='*' component={TaskList}/>
        	
        	</Switch>
    	</BrowserRouter>,


 document.getElementById('root'));


registerServiceWorker();
