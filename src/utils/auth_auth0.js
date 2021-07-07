/*
 * This software is Copyright (c) 2015 The Regents of the University of
 * California. All Rights Reserved. Permission to copy, modify, and distribute this
 * software and its documentation for academic research and education purposes,
 * without fee, and without a written agreement is hereby granted, provided that
 * the above copyright notice, this paragraph and the following three paragraphs
 * appear in all copies. Permission to make use of this software for other than
 * academic research and education purposes may be obtained by contacting:
 *
 * Office of Innovation and Commercialization
 * 9500 Gilman Drive, Mail Code 0910
 * University of California
 * La Jolla, CA 92093-0910
 * (858) 534-5815
 * invent@ucsd.edu
 *
 * This software program and documentation are copyrighted by The Regents of the
 * University of California. The software program and documentation are supplied
 * "as is", without any accompanying services from The Regents. The Regents does
 * not warrant that the operation of the program will be uninterrupted or
 * error-free. The end-user understands that the program was developed for research
 * purposes and is advised not to rely exclusively on the program for any reason.
 *
 * IN NO EVENT SHALL THE UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY FOR
 * DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST
 * PROFITS, ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
 * THE UNIVERSITY OF CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE. THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE PROVIDED HEREUNDER IS ON AN "AS
 * IS" BASIS, AND THE UNIVERSITY OF CALIFORNIA HAS NO OBLIGATIONS TO PROVIDE
 * MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 */

// Firebase App (the core Firebase SDK) is always required and must be listed first
import React, {createContext, useContext, useEffect, useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

function SensitiveScreen(){
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://api.grip.caida.org`,
                    scope: "write:events",
                });
                let res = await fetch(
                    "http://localhost:8001/sensitive",
                    {
                        mode: 'cors',
                        headers: {
                            "Content-Type": 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                            "Access-Control-Request-Method": "GET",
                            "Access-Control-Request-Headers": "X-Custom-Header"
                        },
                    }
                );
                let data = await res.json();
                console.log(data);
                setUserMetadata(data);
            } catch (e) {
                console.log(e.message);
            }
        };

        if(!userMetadata){
            getUserMetadata();
        }
    }, []);

    if(isAuthenticated){
        if(userMetadata){
            return <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        } else {
            return <div>waiting for api call returns</div>
        }
    } else {
        return <div>
            NO access
            <LoginButton/>
        </div>
    }
}

function SignInScreen() {
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            <LoginButton/>
            <LogoutButton/>
            {}
        </div>
    );
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </button>
    );
};

function UserProfile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "mingwei.us.auth0.com";
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://api.grip.caida.org`,
                    scope: "write:events",
                });
                setUserMetadata(accessToken);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, []);

    if(isAuthenticated){
        return (
            <div>
                <LogoutButton/>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <h3>User Metadata</h3>
                {userMetadata ? (
                    <pre>{JSON.stringify(jwt_decode(userMetadata), null, 2)}</pre>
                ) : (
                    "No user metadata defined"
                )}
            </div>
        );
    } else {
        return <LoginButton/>
    }
}

export {SignInScreen, UserProfile, SensitiveScreen}