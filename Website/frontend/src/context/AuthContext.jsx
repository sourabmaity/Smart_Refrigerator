import { createContext,useState,useEffect} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
    const navigate = useNavigate ();
    const [loading,setLoading] = useState(true);
    const [authToken,setAuthToken] = useState(()=>localStorage.getItem("Authtoken")?JSON.parse(localStorage.getItem("Authtoken")):null);
    const [username,setUsername] = useState(()=>localStorage.getItem("Authtoken")?jwt_decode(localStorage.getItem("Authtoken")):null);
    const [customalert,setAlert] = useState('');
    let loginUser = async (e)=>{
        e.preventDefault();
        // console.log("Form submitted");
        let username_url = 'https://smrtfrze.herokuapp.com/api/getusername/'+e.target.email.value;
        let user_name = await fetch(username_url);
        const raw = await user_name.json();
        if(await user_name.status === 400){
            setAlert(
                <div className="alert alert-danger" role="alert">
                    <b>{raw.error}</b>
                    <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }else{
            let response = await fetch('https://smrtfrze.herokuapp.com/api/token/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'username':raw.username,'password':e.target.password.value})
            })
            let data = await response.json();
            if(await response.status===200){
                setAuthToken(data);
                setUsername(jwt_decode(data['access']));
                localStorage.setItem("Authtoken",JSON.stringify(data));
                navigate("/dashboard");
            }else{
                setAlert(
                    <div className="alert alert-danger" role="alert">
                        <b>Wrong Credentials</b>
                        <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            }
        }
    }
    let logoutUser = ()=>{
        setAuthToken(null)
        setUsername(null)
        localStorage.removeItem("Authtoken");
        navigate("/signin")
    }

    let updateToken = async ()=>{
        // console.log("2");
        // console.log(authToken)
        let response = await fetch('https://smrtfrze.herokuapp.com/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authToken.refresh})
        })
        let data = await response.json()
        
        if(response.status===200){
            setAuthToken(data);
            setUsername(jwt_decode(data.access))
            localStorage.setItem("Authtoken",JSON.stringify(data))
        }else{
            logoutUser();
            //console.log(data)
        }
    }
    const contextData = {
        loginUser:loginUser,
        logoutUser:logoutUser,
        customalert:customalert,
        username:username,
        authToken:authToken
    }
    useEffect(()=>{
        let fiveMinutes = 1000*60*5;
        let interval = setInterval(() => {
            if(authToken){
                updateToken();
            }
        },fiveMinutes);
        return ()=>clearInterval(interval)
    },[authToken,loading])
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}