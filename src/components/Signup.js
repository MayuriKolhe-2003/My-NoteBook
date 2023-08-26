import React,{useState} from 'react'
import { useHistory ,Link} from 'react-router-dom';

const Signup = (props) => {
    let showAlert = props.showAlert;
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let history = useHistory();

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            showAlert("Login Successfully.. ","warning",'Success');
            console.log(localStorage.getItem('token'));
            history.push("/");
        }
        else{
           showAlert("Invalid Credentials","danger","Success")
        }
    }

  return (
    <>
    <section className="">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-10">
					<div className="wrap d-md-flex">
						<div className="img" style={{backgroundImage:`url(https://www.auis.edu/wp-content/uploads/2019/09/rs261_157781379-low.jpg)`}}>
						</div>
						<div className="login-wrap p-4 p-md-5">
							<div className="d-flex">
								<div className="w-100">
									<h3 className="mb-4">Sign-In To My-Note</h3>
								</div>

							</div>
							<form  className="signin-form" onSubmit={handleSubmit}>
								<div className="form-group mb-3">
									<label className="label" for="name">Name</label>
									<input type="text" name="name" className="form-control" placeholder="Username" required value={credentials.name} onChange={onChange} />
								</div>
                                <div className="form-group mb-3">
									<label className="label" for="name">Email</label>
									<input type="email" name="email" className="form-control" placeholder="Username" required value={credentials.email} onChange={onChange} />
								</div>
								<div className="form-group mb-3">
									<label className="label" for="password">Password</label>
									<input type="password" name="password" className="form-control" placeholder="Password" required value={credentials.password} onChange={onChange} />
								</div>
                                <div className="form-group mb-3">
									<label className="label" for="password">Confirm Password</label>
									<input type="password" name="cpassword" className="form-control" placeholder="Password" required value={credentials.cpassword} onChange={onChange} />
								</div>
								<div className="form-group">
									<button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign
										In</button>
								</div>
								<div className="form-group d-md-flex">
									<div className=" text-md-right">
										<a href="#">Forgot Password</a>
									</div>
								</div>
							</form>
							<Link className="text-center" to="/signup">Already a member? <span className='text-warning'> Log In</span></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default Signup
