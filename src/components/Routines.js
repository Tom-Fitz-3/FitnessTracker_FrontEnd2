import React, { useState, useEffect } from 'react';
import api from '../api';
import "../style/components.css"

const Routines = () => {

    const [routineList, setRoutineList] = useState([]);

    useEffect(async function () {
        try {
            const data = await api.makeRequest('/routines', 'GET');
            setRoutineList(data);
        }
        catch (error) {
            throw error;
        }
    }, []);
    const routineElems = routineList.map((routine, i) => 
        <div className="routines" id={"ROUT"+i}>
            <p>Routine Number: {routine.id}</p>
            <p>Routine Name: {routine.name}</p>
            <p>Creator Name: {routine.creatorName}</p>
            <p>Routine Description: {routine.goal}</p>
            {
            routine.activities.map(activity =>
                <div className="routineActivities">
                    <p>Activity Name: {activity.name}</p>
                    <p>Activity Description: {activity.description}</p>
                    <p>Duration: {activity.duration} and/or Count: {activity.count}</p>
                </div>
                )
            }
        </div>
    )

    return (
        <div className="routineContainer">
            {routineElems}
        </div>
    )
}

export default Routines;