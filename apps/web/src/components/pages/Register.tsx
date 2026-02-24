import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth"
import { useState } from "react";


export default function Register(){

    const {register, error} = useAuth();
    const navigate = useNavigate()

   const[name, setName] = useState("")
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async ( e: React.FormEvent) => {
    e.preventDefault();

    try{
        await register(name, email, password)

        navigate("/dashboard");
    }catch(error){
        console.log(error)

    }
   }

    return(

        <div className="flex justify-center min-h-screen items-center">


            <form onSubmit={handleSubmit} className="grid grid-col">
                <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
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

       <button type="submit">Register</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )

}