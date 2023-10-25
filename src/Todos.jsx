import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
  const ref = useRef(null);
  const [todolist, setTodolist] = useState([]);
  const [newtask, setnewtask] = useState("");

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todolist");
    if (storedTodoList) {
      setTodolist(JSON.parse(storedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }, [todolist]);

  const getvalue = (e) => {
    setnewtask(e.target.value);
    // console.log(e);
  };
  const addtask = (e) => {
    const newarraytask = [...todolist, newtask];
    // ref.current.value = "";
    // setnewtask("");
    if (ref.current.value === "") {
      e.preventDefault();
      // alert("please enter some task")
      toast("Please Enter some task !");
    } else {
      setTodolist(newarraytask);
      ref.current.value = "";
      e.preventDefault();
    }
  };
  const deletetask = (taskname) => {
    // console.log("you clicked");
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task..🙄"
    );
    if (isConfirmed) {
      const newtodolist = todolist.filter((task) => {
        if (task === taskname) {
          return false;
        } else {
          return true;
        }
      });
      setTodolist(newtodolist);
      toast("Delete sucessfully.. !");
    } else {
    }
  };

  const remove = () => {
    setTodolist([]);
  };
  return (
    <>
      <div className="headings">
        <h1>To do list📝</h1>
        <hr />
      </div>
      <br />
      <div className="forinput">
        <form>
          <input
            ref={ref}
            type="text"
            placeholder="✍️ Add something..."
            onChange={getvalue}
          />
          <button type="submit" className="btn" onClick={addtask}>
            Add
          </button>
        </form>
      </div>
      <div className="container">
        {todolist.map((task) => {
          return (
            <>
              <div className="items">
                <h2>{task}</h2>
                <div className="icons">
                  <i
                    className="fa fa-trash"
                    onClick={() => deletetask(task)}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="forbutton">
        {todolist.length > 5 ? (
          <button onClick={remove} className="btn2">
            Remove All
          </button>
        ) : (
          ""
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Zoom}
        theme="dark"
      />
    </>
  );
};

export default Todos;
