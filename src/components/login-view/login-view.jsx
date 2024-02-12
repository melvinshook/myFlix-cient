import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedin }) => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the web browser default behavior of reloading the entire page
        event.preventDefault()
        const data = {
            userName: userName,
            password: password,
        }

        fetch("https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
        .then((data) => {
            console.log("Login response:", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedin(data.user, data.token);
            } else { 
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
                minlength="6"/>
            </label>
            <label>
                Password:
                <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};