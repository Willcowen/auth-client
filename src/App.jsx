import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
    const initialFormData = { username: '', password: '' }
    const [user, setUser] = useState(initialFormData);
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');;


    const register = async (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            }),
        }

        fetch('http://localhost:4000/register', options)
            .then(res => res.json())
            .then(json => setRegisterResponse('Registered User:' + json.data.username))
            .catch(() => {
                console.log('server error')
            })
    };

    const login = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            }),
        }

        fetch('http://localhost:4000/login', options)
        .then(res => res.json())
        .then(json => {
            setLoginResponse('Logged in', + json.data)
            localStorage.setItem('jwt', json.data)
        })
    };

    const allowAccess = () => {
        const options = { 
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        }
        fetch('http://localhost:4000/extras', options)
        .then(res =>{
            res.json().then(json=>{
              if(res.ok) {
                
                console.log("Todos:", json)
              } else {
                console.log("Invalid response code:", res.status)
                console.log("Invalid response data:", json)
              }
            })
          }).catch(e=> {
            console.log("Unable to contact server:", e)
          })
    }


    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }


    return (
        <div className="App">

            <h1>Register</h1>

            <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {registerResponse && <p>{registerResponse}</p>}

            <h1>Login</h1>

            <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {loginResponse && <p>{loginResponse}</p>}

        </div>
    );
}
