import React from "react";
import './styles/Home.css';
import { IoPlayOutline } from 'react-icons/io5';
import { IoBookOutline, IoVolumeHigh, IoStarOutline, IoPersonOutline, IoHeartOutline} from "react-icons/io5";


export default function Home () { 
    const features = [
        {   id:1, icon_bgc: "rgba(0, 0, 255, 0.38)",
            title: "Smart Text-to-Speech",  icon: <IoVolumeHigh size = {30} color = "blue" className="home_icon" />,
            description: "Words highlight as they're spoken, helping children follow along and improve comprehension"
        },
        {   id:2, icon_bgc: "rgb(0, 128, 0, 0.38)",
            title: "Dyslexia-Friendly", icon: <IoBookOutline size = {30} color = "green" className="home_icon" />, 
            description: "Customizable fonts, colors, and spacing designed specifically for children with dyslexia"
        }, 
        {   id:3, icon_bgc: "rgb(128, 0, 128, 0.38)",
            title: "Fun Rewards", icon: <IoStarOutline size = {30} color = "purple" className="home_icon" />,
            description: "Earn badges and track progress to keep children motivated and engaged in their reading journey"
        }, 
        {   id:4, icon_bgc: "rgb(255, 165, 0, 0.38)",
            title: "Parent Dashboard",  icon: <IoPersonOutline size = {30} color = "orange" className="home_icon" />, 
            description: "Track your child's progress and see which words they're working on improving"
        }
    ]
    return ( 
        <>
        <section id ="firstSection">
            <div id = "home_info">
                <p className= "title">Making Reading <span style ={{color: "#155DFC"}}>Fun & Easy</span> for Every Child</p>
                <p id = "one-liner">ReadEase helps children with dyslexia and reading difficulties learn at their own pace 
                with interactive text-to-speech, word highlighting, and personalized learning features </p>

                <div id="buttons">
                    <button className="blueButton">
                        <IoPlayOutline size = {30} color = "white" id="logo" />
                        <p> Get started</p>
                    </button>
                    <button className="whiteButton" style = {{width: "140px", padding: "0px"}}>
                        <p> Learn More</p>
                    </button>
                </div>
            </div>
            <div id ="home_profile"><img src="/home_pt.jpg" alt="Girl holding a book in her hand" /></div>
        </section>

        <section id="secondSection"> 
            <div> <p className="title" style = {{textAlign: "center"}}>Why Choose ReadEase? </p></div>
            <div id="features"> 
                {features.map((feature) => ( 
                    <div key= {feature.id} className="feature_box">
                        <div className="home_icon_div" style = {{backgroundColor: feature.icon_bgc}}>{feature.icon}</div>
                        <p> {feature.title}</p>
                        <div style={{color:"#4A5565"}}>{feature.description}</div>
                    </div>
                ))
                }
            </div>
            
        </section>

        <section id="lastSection"> 
            <div id="lastSectionDiv"> 
                <IoHeartOutline size = {50} color = "red" className="home_icon" id= "heart"/>
                <p className="title" style = {{textAlign: "center"}}>
                    Ready to Help Your Child Love Reading? 
                </p>
                <div id="start_info">Join other families who are using ReadEase to make reading a joyful experience for their children.</div> 
                    <button className="blueButton" id="start">
                    <p> Start Reading Now</p>
                </button>
            </div>

        </section>
 
        </>
    );
}