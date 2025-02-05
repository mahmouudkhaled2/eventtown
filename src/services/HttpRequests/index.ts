import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

// Get New Users
export const getNewUsers = async () => {

    try {
        const response = await axios(`${URL}/analytics/users`);
        return response.data;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }
    
};

// Get Added Events Count
export const getAddedEventsCount = async () => {

    try {
        const response = await axios(`${URL}/analytics/events`);
        return response.data;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }

};

// Get Popular Events
export const getPopularEvents = async () => {

    try {
        const response = await axios(`${URL}/analytics/popular-events`);
        return response.data;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }

};

// Get Retention Rate
export const getRetentionRate = async () => {
    
    try {
        const response = await axios(`${URL}/analytics/retention`);
        // console.log('REEEEEEEE: ', response.data)
        return response.data;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }

};

// Get Ticket Button Interactions
export const getTicketInteractions = async () => {

    try {
        const response = await axios(`${URL}/analytics/ticket-interactions`);
        return response.data;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }

};

// Get Most Used Categories
export const getMostUsedCategories = async () => {

    try {
        const response = await axios(`${URL}/analytics/most-used-categories`);
        return response.data;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }

};  






