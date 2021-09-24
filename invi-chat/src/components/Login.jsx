import React, {useState} from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value);
    }

    const handleFormSubmit = (ev) => {
	    // Call backend
        alert("Form submitted")
    }
    return ( 
        <div className="col">
            <div className="card row position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded">
                <h1 className="fs-1 text-center">Login</h1>
                <form className="col" onSubmit={handleFormSubmit}>
                    <label className="row mb-3">
                        Email:
                        <input className="form-control" type="email" name="Email"onInput={handleEmailChange}/>
                    </label>
                    <label className="row mb-3">
                        Password:
                        <input className="form-control"  type="password" name="Password" />
                    </label>
                    <input className="row mb-3 btn btn-primary" type="submit" value="submit" />
                </form>
            </div>
        </div>
     );
}
 
export default Login;