import React from 'react'
import ReactDOM from 'react-dom'

class ToDo extends React.Component{

    // Data
    fetchApi(){
        fetch('https://api.myjson.com/bins/9l2ez')
            .then(response => {return response.json()})
            .then(response => {this.setState({myjson: response.todos})})
    }

    // Filters
    showAll(){this.setState({ status: ''})}
    showChecked(){this.setState({ status: true})}
    showUnChecked(){this.setState({ status: false})}

    // Mounting part 1
    constructor(){super()
        this.state = {myjson: [], status: ''}
    }

    // Mounting part 2
    componentWillMount(){this.fetchApi()}

    // Mounting part 3
    render() {
        let showResults = this.state.myjson
        if (this.state.status !== '') {showResults = this.state.myjson.filter((task) => task.complete === this.state.status )}
        return (
            <div>
                <div className='buttons-centered'>
                    <button onClick={() => this.showAll()}>Show all</button>
                    <button onClick={() => this.showChecked()}>Show checked</button>
                    <button onClick={() => this.showUnChecked()}>Show unchecked</button>
                </div>
                <Tasks tasks={showResults} />
            </div>
        )
    }
}

class Tasks extends React.Component{

    // Checking
    orCheckedUnchecked(i){
        this.props.tasks[i].complete = !this.props.tasks[i].complete
        this.setState({tasks: this.props.tasks})
    }

    // Mounting
    render(){
        const list = this.props.tasks.map((task, i) => (<li onClick={() => this.orCheckedUnchecked(i)} className={(task.complete ? 'checked' : '')} key={i}>{task.label}</li>))
        return (<ul>{list}</ul>)
    }

}

ReactDOM.render(<ToDo />, document.getElementById('to-do'))
