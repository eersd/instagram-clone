import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post.js';
import {db,auth} from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
import Avatar from "@material-ui/core/Avatar";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  
  
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts,setPosts] = useState([
    /*
    {
      username: "user1",
      caption: "This is my first post",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    },
    {
      username: "user2",
      caption: "My good boi",
      imageUrl: "data:image/jpeg;base64,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"
    }*/
  ]);
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);


  console.log("beginning");
  console.log(user);
  // useEffect: run code based on specific condition

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user logged in
        setUser(authUser);
        console.log("state changed");
        console.log(user);
        console.log(authUser);
      }else{
        //user logged out
        setUser(null);
      }

    })
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  },[]);

  const signUp = (event) => {
    event.preventDefault();

    console.log("sign up");
    console.log(user);
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email,password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="App">

      
      

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__modalImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
              </center>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
              />
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
              <Button type="Submit" onClick={signUp}>Sign Up</Button>
            
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__modalImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
              </center>
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
              <Button type="Submit" onClick={signIn}>Log In</Button>
            
          </form>
        </div>
      </Modal>
      <header className="App-header">
        {/* Header*/}
        <div className="app__header">
          <center>
          <img 
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          />
          </center>

          
          {user ? (
            <div className="post__avatar">
              <Avatar
                  className="post__avatar"
                  alt='user'
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYPRLSISP2uoEdGxNPVFrz02gI2KWiJ_VwNA&usqp=CAU">
              </Avatar>

              <h3>{user.displayName}</h3>
              
              <Button onClick={() => auth.signOut()} >Logout</Button>
            </div>
          ): (
            <div className="app_loginContainer">
              <Button onClick={() => setOpenSignIn(true)} >Sign In</Button>
              <Button onClick={() => setOpen(true)} >Sign Up</Button>
            </div>
          )}
        </div>

        {user?.displayName ? (
          <ImageUpload username={user.displayName}></ImageUpload>
        ): (
          <div className="app__announcement">
            <center>
              <h3>Login to post and comment</h3>
            </center>
          </div>
        )}
          
        <div className="app__posts">
          <div className="app__postsLeft">
            {
              posts.map(({id, post}) => (
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}></Post>
                ))
            }
          </div>
          <div className="app__postsRight">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          </div>
        </div>

        
      </header>
    </div>
  );
}

export default App;
