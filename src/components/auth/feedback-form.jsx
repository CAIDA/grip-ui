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

import React, {useEffect, useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {FEEDBACK_URL} from "../../utils/endpoints";
import Modal from 'react-modal';

const FeedbackForm = (props) => {
    let event_id = props.event_id;
    const { isAuthenticated, user, getAccessTokenSilently} = useAuth0();
    const [accessToken, setAccessToken] = useState(null);

    let closeModalCall = props.closeModal;

    async function handleSubmit (event)  {
        const formData = new FormData(event.target);
        event.preventDefault();
        let feedback = {
            "type": formData.get("type"),
            "details": formData.get("details"),
            "event_id": event_id,
            "from": {
                "name": user.name,
                "email": user.email,
            }
        }

        let _res = await fetch(FEEDBACK_URL, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer '+ accessToken,
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({
                'from_name': feedback.from.name,
                'from_email': feedback.from.email,
                'feedback_type': feedback.type,
                'feedback_details': feedback.details,
                'event_id': feedback.event_id,
            })
        });

        if(closeModalCall!==null){
            closeModalCall();
        }
    }

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "mingwei.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                setAccessToken(accessToken);
            } catch (e) {
                console.log(e.message);
            }
        };

        if(isAuthenticated){
            getUserMetadata();
        }
    }, []);


    if(!isAuthenticated || !accessToken) {
        return null;
    }

    let feedback_types = [
        {
            "id":"benign",
            "name":"Confirm Benign Event",
        },
        {
            "id":"hijacks",
            "name":"Confirm Hijack Event",
        },
        {
            "id":"other",
            "name":"Other",
        }
    ];

    return <div className="event-feedback-form">
        <form onSubmit={handleSubmit}>
            <h3>Event Feedback</h3>
            <div>
                <label>Type</label>
                <br/>
                <select id="type" name="type" required defaultValue={""}>
                    <option value="" disabled>None</option>
                    {
                        feedback_types.map((v)=>{
                            return <option value={v.id} key={v.id}>{v.name}</option>;
                        })
                    }
                </select>
            </div>
            <div>
                <label>Details</label>
                <br/>
                <textarea cols="80" id="details" name="details" key="details" placeholder="Please provide details" required={true}/>
            </div>
            <button type="submit"> Submit </button>
            {closeModalCall!==null &&
                <button onClick={closeModalCall}> Cancel </button>
            }
        </form>
    </div>;
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const FeedbackWithButton = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return <React.Fragment>
        <a type="button" onClick={openModal} className="btn btn-sm btn-primary grip-btn"> Feedback </a>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <FeedbackForm event_id={props.event_id} closeModal={closeModal}/>
        </Modal>
    </React.Fragment>
}

export {FeedbackForm, FeedbackWithButton};