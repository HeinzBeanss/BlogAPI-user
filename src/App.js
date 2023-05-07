import './App.css';
import Post from "./Post";

import React, { useEffect, useState } from "react";

const App = () => {

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://davids-blog-api.up.railway.app/api/posts")
    .then(response => response.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [count])

  return (
    <div className="App">
      <h1 className='title'>David's Blog</h1>
      <div className='content'>
        <div className='left-side'>
          <h2 className='welcome'>Welcome to the journals.</h2>
          <p className='welcomepara'>Welcome to my blog, where I document and note everything from the most mundane matters, to the most exciting and vital thoughts that go on inside my head. </p>
          <p>Feel free to share your thoughts and opinions on their respective articles, I look forward to hearing what you have to say! Also, if there are no posts then I have refused to pay for the back-end to be maintained, so the fecth calls aren't working, forgive me for being so cheap!</p>
        </div>
        <div className='post-grid'>
        {data.map(post => 
        <Post key={post._id} post={post} setCount={setCount}/>
      )}
        </div>
      </div>

      <footer>Made by David Bean</footer>
    </div>
  );
}

export default App;
