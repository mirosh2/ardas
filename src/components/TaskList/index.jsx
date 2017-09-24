import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class TaskList extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			tasks: []
		}
	}

	componentDidMount() {
		fetch('/data/tasks.json')
		.then(res => res.json())
		.then(res => {
			if (!res || res.length === 0 || !Array.isArray(res)) {
				console.log("Bad response from server");
				return new Error("Bad response from server");
			}

			const activeTaskList = res
				.filter(task => task.obj_status === 'active')
			    .map(activeTask => 
			    	(<tr key={activeTask.id}
			    		 className="taskItem">
			    		<td><Link to={`/task/${activeTask.id}`}>{activeTask.name}</Link></td>
			    		<td>{activeTask.tags ? activeTask.tags.join(",") : null}</td>
			    		<td>{activeTask.actual_effort}</td>
			    		<td>{activeTask.estimated_effort}</td>
			    		<td>{activeTask.due_date ? activeTask.due_date.split("T")[0] : null}</td>
			    	</tr>));

			this.setState({ tasks: activeTaskList })
		})
	}
	
	render() {

		const { tasks } = this.state;

		return (
			<div className="taskContainer">

				<table className="taskList">
				   
				   <caption>Task list by ARDAS</caption>
				   
				   <thead className="taskList_head">
					   <tr>
					    <th>Task title</th>
					    <th>Task tags</th>
					    <th>Actual effort</th>
					    <th>Estimated effort</th>
					    <th>End date</th>
					   </tr>
				   </thead>
				  
				   <tbody>
				   		{tasks}
				   </tbody>
				</table>

			</div>
			)
	}

}

export default TaskList;