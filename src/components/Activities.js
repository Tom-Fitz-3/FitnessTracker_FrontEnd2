import React, { useState, useEffect } from 'react';
import api from '../api';
import "../style/components.css"

const Activities = ({isLoggedIn}) => {
    const [activityList, setActivityList] = useState([]);

    if (isLoggedIn) {
        useEffect(async function () {
            try {
                const data = await api.makeRequest('/activities', 'GET');
                setActivityList(data);
            }
            catch (error) {
                throw error;
            }
        }, []);
    }
    const activityElems = activityList.map((activity, i) => 
        <div className="activities" id={"ACT"+i}>
            <p>Activity Number: {activity.id}</p>
            <p>Activity Name: {activity.name}</p>
            <p>Activity Description: {activity.description}</p>
        </div>
    )

    return (
        <div className="activityContainer">
            {activityElems}
        </div>
    )

}

export default Activities;