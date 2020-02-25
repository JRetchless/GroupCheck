import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'

class AddItem extends React.Component {
    static contextType=ApiContext;

    render() {
        const lists = 
        [
            {
                "id": "aaaaaaaa",
                "name": "test1",
            },
            {
                "id": "bbbbbbb",
                "name": "test2",
            },
            {
                "id": "ccccccc",
                "name": "test3",
            },
        ]
        return (
            <div>
                            <form onSubmit={((e)=> {
                e.preventDefault();
                let data = {
                    id:null,
                    name: e.target.itemName.value,
                    priority: e.target.itemPriority.value,
                    listId: e.target.itemName.value,
                    content: e.target.itemContent.value
                }
                if(data.name === '') {
                    alert('please complete the required fields');
                    return false;
                } else if(data.content === '') {
                    alert('please complete the required fields');
                    return false;
                } else if(data.priority === '') {
                    alert('please complete the required fields');
                    return false;
                }

                fetch(`${config.API_ENDPOINT}/items`, {
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
                    .then(item => {
                    this.context.addItem(item)
                    this.props.history.push('/home');
                    })
                    .catch(error => {
                    console.error({ error })
                    }) 
                
            } )}>
                
                <label htmlFor='nameInput'>item name*</label>
                <input id='nameInput' type="text" name="itemName" placeholder="New Item Name"></input>
                <label htmlFor='contentInput'>item content*</label>
                <textarea id='contentInput' type="text" name="itemContent"></textarea>
                <label htmlFor="itemPriority">Priority*</label>
                <select name="itemPriority" id="priority">
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <select name="List" >
                    {lists.map((list)=> {
                        return (
                            <option key={list.id} value={list.id}>
                                {list.name}
                            </option>
                        )
                    })}
                </select>
                <button>Create Note</button>
            </form>
            <button role='link'
                onClick={() => this.props.history.goBack()}
                className='cancel-button'>
                Cancel
            </button>
            </div>


            

        )
    }
}

export default AddItem;