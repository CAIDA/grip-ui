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

import React from 'react';

// Logos
import xsedeLogo from '../images/logos/xsede-black.png';
import sdscLogo from '../images/logos/sdsc.svg';
import ucsdLogo from '../images/logos/ucsd.svg';
import nsfLogo from '../images/logos/nsf.svg';
import isocLogo from '../images/logos/isoc.svg';
import ripeLogo from '../images/logos/ripencc.svg';

class Card extends React.Component {
    orgs = {
        "nsf":{
            "image": <img src={nsfLogo} className="card__logo-icon"/>,
            "link": "https://www.caida.org/funding/hijacks/",
            "desc": "This platform was supported by NSF grant CNS-1423659 " +
                "(Detecting and Characterizing Internet Traffic Interception Based on BGP Hijacking)."
        },
        "ripe":{
            "image": <img src={ripeLogo} className="card__logo-icon"/>,
            "link": "https://www.ripe.net/support/cpf/funding-recipients-2020",
            "desc": "RIPE Community Projects Fund for 2020: BGP Hijacking Observatory",
        },
        "sdsc":{
            "image": <img src={sdscLogo} className="card__logo-icon"/>,
            "link": "https://www.sdsc.edu",
            "desc": "San Diego Super Computer Center",
        },
        "xsede":{
            "image": <img src={xsedeLogo} className="card__logo-icon"/>,
            "link": "https://www.xsede.org",
            "desc": "The Extreme Science and Engineering Discovery Environment (XSEDE) ",
        },
        "isoc":{
            "image": <img src={isocLogo} className="card__logo-icon"/>,
            "link": "https://www.internetsociety.org",
            "desc": "Internet Society",
        },
    }

    render() {
        const org = this.props.org;
        const text = "home." +  org;
        let image = null;
        return (
            <a className="card__link" href={this.orgs[org].link}>
                <div className="card" >
                    <div className="card__logo">
                        { this.orgs[org].image }
                    </div>
                    <div className="card__content">
                        { this.orgs[org].desc }
                    </div>
                </div>
            </a>
        )
    }
}



class Acknowledgement extends React.Component {

    render() {
        return <div id='hijacks' className='container-fluid subpage'>
            <div className="row partners">
                <div className="col-1-of-1">
                    <h2 className="section-header">
                        Acknowledgement
                    </h2>
                </div>
            </div>
            <div className="row partners">
                <div className="col-1-of-3">
                    <Card org="nsf"/>
                </div>
                <div className="col-1-of-3">
                    <Card org="ripe"/>
                </div>
                <div className="col-1-of-3">
                    <Card org="sdsc"/>
                </div>
            </div>
            <div className="row partners">
                <div className="col-1-of-3">
                    <Card org="isoc"/>
                </div>
                <div className="col-1-of-3">
                    <Card org="xsede"/>
                </div>
            </div>
        </div>
    }
}

export default Acknowledgement;
