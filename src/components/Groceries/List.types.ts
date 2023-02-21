import React from 'react';

//Type defination for the products
export interface ProductTypes{
    type: String,
    name: String,
    description: String,
    rating: Number,
    img: String,
    price: String,
    available: Number
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type InputSelectEvent =  React.ChangeEvent<HTMLSelectElement>