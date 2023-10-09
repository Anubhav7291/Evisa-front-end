import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import Payment from './Payment';

const stripePromise = loadStripe('pk_test_51Nk4rQSAsYGUvUsl3oYA3KXdWJDNB7QMRaxJzWP0d3gWGDKJOiGVCLxR5tBwXkjl2gzBpYuHrBdLvbsJtUftICJM00Z6JTFiti')
function StripeContainer(props) {
    return (
        <Elements stripe={stripePromise}>
            <Payment/>
        </Elements>
    );
}

export default StripeContainer;