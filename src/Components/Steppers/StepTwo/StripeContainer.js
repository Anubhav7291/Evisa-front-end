import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import Payment from './Payment';

const stripePromise = loadStripe('pk_live_51Nk4rQSAsYGUvUsl70SfduCYChEZsETiJvGXT0qvIQWsN0uxLObV2qv4CogfG8esnSzJJSBz9qXqe4jegGhXMreV00rnnTDcm4')
function StripeContainer(props) {
    return (
        <Elements stripe={stripePromise}>
            <Payment/>
        </Elements>
    );
}

export default StripeContainer;