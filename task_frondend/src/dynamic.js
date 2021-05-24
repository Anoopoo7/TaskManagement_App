import React,{useState,useEffect} from 'react'
import "./hello.css"
import axios from 'axios';

export default function Dynamic() {
    // text area controls
    const [flag, setflag] = useState(true);
    // input text
    const [input, setInput] = useState(null);
    // datas from backed is here
    const [todoItems, setTodoItems] = useState(null);

    useEffect(() => {
        // fetching data from backend....
        if (todoItems === null) {
          console.log("loaded");
          fetch("http://localhost:8000/list")
            .then((response) => response.json())
            .then((data) => {
              setTodoItems(data);
            });
        }
      });
    function change(){
        return setflag(!flag);
      }


    function formSubmit(){
      if (input === null || input ===""){
        return alert("please enter task")
      }
        setflag(!flag)
        var payload = {
            "task":input,
            "done":false
        }
        var url = "http://localhost:8000/create/''";
        axios.post(url,payload)
        .then(response =>{
        setTodoItems(response.data)
         }).catch(err =>{
        console.log(err);
      })

    }

    function textChange(e){
        setInput(e.target.value);
    }

    function taskCompleted(key){
        var url = "http://localhost:8000/upd/"+key;
        axios.post(url)
        .then(response =>{
        setTodoItems(response.data)
         }).catch(err =>{
        console.log(err);
      })
    }

    function deleteItem(key){
        var url = "http://localhost:8000/delete/"+key;
        axios.post(url)
        .then(response =>{
        setTodoItems(response.data)
         }).catch(err =>{
        console.log(err);
      })
    }
    
    
      return (
        <div>
            {/* text area display starts */}
            {
        flag?<button className="Add_task">
        <div onClick={change} className="inner_button_box">
        <strong className="plus">+<h4> Add a task</h4> </strong>
        <h4>:</h4>
        </div>
        </button>
      :
        <div className="Add_task">
        <div>
          <form onSubmit={formSubmit}>
            <input className="input_txt" onChange={textChange} type="text" placeholder="Enter Task" /><br />
            <button className="input_btnt" type="submit">Add to List</button>
          </form>
        </div>
        </div>
      }
      <hr />
      <br/>
            {/* text area display ends */}
            {/* dynamic data starts */}
            <div>
                <ul type="none">
                    {
                        todoItems?todoItems.map(function(data){
                            return<>
                            <li key={data.id}>
                                <input type="checkbox" onChange={()=>{taskCompleted(data.id)}} checked={data.done} />
                                {
                                  data.done? <span style={{textDecoration:"line-through"}} >{data.task}</span>
                                  :<span >{data.task}</span>
                                }
                                <button onClick={()=>{deleteItem(data.id)}}>Delete</button>
                            </li><hr />
                            </>
                        }):
                        "loading..."
                    }
                </ul>
            </div>
            {/* text dynamic data ends */}
        </div>
    )
}
