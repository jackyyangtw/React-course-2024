"use client";
import classes from "./image-picker.module.css";
import { useRef, useState } from "react";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
    const inputRef = useRef();
    const handleClickInput = () => {
        inputRef.current.click();
    };

    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setImage(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!image && <p>No image picked yet.</p>}
                    {image && <Image src={image} alt="Picked Image" fill />}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={inputRef}
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handleClickInput}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}
