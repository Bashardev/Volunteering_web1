import { useEffect, useState } from "react";

export default function Dashboard() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch("https://localhost:7149/Posts/dashboard", {
                    method: "POST", // Corrected to POST
                    credentials: "include", // Includes cookies and session data
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setActivities(data);
                } else {
                    console.error("Failed to fetch activities");
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <h4>Your Activities</h4>
            {activities.length > 0 ? (
                <ul className="list-group">
                    {activities.map((activity) => (
                        <li key={activity.id} className="list-group-item">
                            <strong>{activity.title}</strong> <br />
                            Category: {activity.category} <br />
                            Location: {activity.location} <br />
                            Dates: {activity.startDate} to {activity.endDate}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No activities found.</p>
            )}
        </div>
    );
}
