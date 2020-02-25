import React from 'react'
import config from '../config'
import ApiContext from '../ApiContext.js'

class AddList extends React.Component {
    static contextType=ApiContext;

    render() {
        return (
    <form onSubmit={((e)=> {
        e.preventDefault();
        let data = {
            name: e.target.listName.value,

        }
        console.log(data);
        if(data.name === '') {
            alert('please complete the required fields');
            return false;
        }

        fetch(`${config.API_ENDPOINT}/lists`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
            })
            .then(list => {
            this.context.addList(list)
            this.props.history.push('/home');
            })
            .catch(error => {
            console.error({ error })
            }) 
        
    } )}>
        
        <label htmlFor='nameInput'>list name*</label>
        <input id='nameInput' type="text" name="listName" placeholder="New List Name"></input>        
        <button type="submit">Create List</button>
        <button role='link'
          onClick={() => this.props.history.goBack()}
          className='cancel-button'
        >
          Cancel
        </button>

    </form>
    )}
}

export default AddList;




























