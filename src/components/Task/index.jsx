import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Task extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			task: {},
			editTitle: false,
			newTaskName: ""
		}

		this.switchEditMode = this.switchEditMode.bind(this);
		this.handleEditTaskName = this.handleEditTaskName.bind(this);
		this.saveNewTaskName = this.saveNewTaskName.bind(this);
		this.cancelNewTaskName = this.cancelNewTaskName.bind(this);
	}

	componentDidMount() {
		const taskID = Number(this.props.match.params.id);

		fetch('/data/tasks.json')
		.then(res => res.json())
		.then(res => {
			if (!res || res.length === 0 || !Array.isArray(res)) {
				console.log("Bad response from server");
				return new Error("Bad response from server");
			}

			const selectedTask = res.filter(task => task.id === taskID)[0];

			this.setState({ task: selectedTask,
							newTaskName: selectedTask.name })
		})
	}

	switchEditMode(ev) {
		ev.preventDefault();
		this.setState({ editTitle: true });
	}

	handleEditTaskName(ev) {
		ev.preventDefault();
		this.setState({ newTaskName: ev.target.value});
	}

	cancelNewTaskName(ev) {
		ev.preventDefault();
		const { task } = this.state;

		this.setState({ editTitle: false,
		                newTaskName: task.name });

	}
	saveNewTaskName(ev) {
		ev.preventDefault();
		const { newTaskName } = this.state;
		
		//Здесь вставляем PUT-запрос на сервер,
		//получаем ответ, что изменения успешно сохранены,
		//вызывает setState. 
		//Если сервер возващает ошибку - обрабватываем по договоренности.
		//Пример - ниже.
		
		/*
		const taskID = Number(this.props.match.params.id);
		fetch('serverURL',
			 { method: 'PUT',
			   headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			   body: JSON.stringify({id: taskID, name: newTaskName})
			 })
			.then(res => res.json())
			.then(res => {
				
				if (res.message !== "Error") //считаем, что API при ошибке дает такой ответ
					this.setState({ editTitle: false,
		                newTaskName: newTaskName });
		        else .....*/

		this.setState({ editTitle: false,
		                newTaskName: newTaskName });
	}
	
	render() {

		const { task, editTitle, newTaskName } = this.state;

		const taskID = Number(this.props.match.params.id);


		const taskDeatils = 
			(<tr>
				<td onClick={this.switchEditMode}>{newTaskName}</td>
			    <td>{task.description}</td>
			 </tr>);

		const taskEdit = 
			(<tr>
				<td>
					<input type="text"
				           name="newTaskName"
				           placeholder={task.name}
				           onChange={this.handleEditTaskName}
				           value={newTaskName}
				           className="editTitleInput"/>

				    <button onClick={this.saveNewTaskName}
				    		className="save_btn">
				    </button>

				    <button onClick={this.cancelNewTaskName}
				    		className="cancel_btn">
				    </button>

				</td>
			    <td>{task.description}</td>
			 </tr>);

		const status = editTitle ? taskEdit : taskDeatils;
		
		return (
			<div className="taskContainer">

				<div className="navigation">
					<Link to="/">back to Task List</Link>
				</div>

				<table className="taskList">
				   
				   <caption>{`Additional info for Task${taskID}`}</caption>
				   
				   <thead className="taskList_head">
					   <tr>
						    <th>Task title</th>
						    <th>Task description</th>
					   </tr>
				   </thead>
				  
				   <tbody>
				   		{status}
				   </tbody>
				
				</table>

			</div>
			)
	}

}

export default Task;