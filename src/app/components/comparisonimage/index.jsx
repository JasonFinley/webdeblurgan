"use client"

import "./comparison.css"
import { useEffect } from "react";
import { CgShapeHalfCircle } from "react-icons/cg";
import CropImage from "../cropimage";

const SliderIcon = () =>{
    return (
        <div className="relative">
            <div className="flex items-center justify-between w-24 text-3xl text-white">
                <div>
                    <CgShapeHalfCircle/>
                </div>
                <div className="rounded-full bg-white p-1">
                    <div className="w-6 h-6 bg-stone-500 rounded-full"/>
                </div>
                <div className="rotate-180">
                    <CgShapeHalfCircle/>
                </div>
            </div>
        </div>
    )
}

const ComparisonImage = ({ imageA, imageB, isHorizontal }) => {

    useEffect( () => {

        const slider = document.querySelector(".image-slider");

        slider.addEventListener( "input", (e) => {
            const value = e.target.value + "%";

            const sliderLine = document.querySelector(".image-slider-line");
            const sliderIcon = document.querySelector(".image-slider-icon");
            const beforeImage = document.querySelector(".before-image");

            if( beforeImage ) beforeImage.style.width = value;
            if( sliderLine ) sliderLine.style.left = value;
            if( sliderIcon ) sliderIcon.style.left = value;
        });

        //return () => { slider.removeEventListener("input") }

    }, [isHorizontal] );

    if( isHorizontal == false)
        return (
            <div className="image-comparison image-comparison-vertical">
                
                <div className="images-container image-comparison-vertical">
                    <CropImage ratio={3/4} url={imageA} imgProps={{ className: "before-image" }} />
                    <CropImage ratio={3/4} url={imageB} imgProps={{ className: "after-image" }} />
                    {/* <img className="before-image" src={imageA} alt="image comparison" /> */}
                    {/* <img className="after-image" src={imageB} alt="image comparison"/> */}
                </div>
                
                <div className="images-container image-comparison-vertical flex justify-center">
                    <div className="image-slider-line"/>
                    <div className="image-slider-icon">
                        <SliderIcon/>
                    </div>

                    <input type="range" className="image-slider" min={0} max={100}/>
                </div>
            
            </div>
        )

    return (
        <div className="image-comparison image-comparison-horizontal">
            <div className="images-container image-comparison-horizontal">
                <CropImage ratio={4/3} url={imageA} imgProps={{ className: "before-image" }} />
                <CropImage ratio={4/3} url={imageB} imgProps={{ className: "after-image" }} />
                {/* <img className="before-image" src={imageA} alt="image comparison" /> */}
                {/* <img className="after-image" src={imageB} alt="image comparison"/> */}
            </div>

            <div className="image-slider-line"/>
            <div className="image-slider-icon">
                <SliderIcon/>
            </div>

            <input type="range" className="image-slider" min={0} max={100}/>
            
        </div>
    )
}

export default ComparisonImage;