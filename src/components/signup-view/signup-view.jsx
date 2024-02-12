import { useState } from "react";


export const SignupView = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            userName: userName,
            password: password,
            email: email,
            birthday: birthday
        };
        
        fetch("https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else { 
                alert("Signup failed");
            }
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="6"
                    />
            </label>
            <label>
                Password:
                <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <label>
                Email:
                <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <label>
                Birthday:
                <input type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};