import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth"
import { useState } from "react";


export default function Login(){

    const {login , error} = useAuth();
    const navigate = useNavigate()

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async ( e: React.FormEvent) => {
    e.preventDefault();

    try{
        await login(email, password)

        navigate("/dashboard");
    }catch(error){
        console.log("login failed" , error)
    }
   }

    return(

        <div className="flex justify-center min-h-screen items-center">


            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                 <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                 <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

       <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )

}