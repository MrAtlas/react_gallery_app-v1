import React from 'react'

const NotFound = () => {
    return (
        <>
            <div className="photo-container">
                <ul>
                    <li className="not-found">
                        <h3>No Results Found</h3>
                        <p>You search did not return any results. Please try again.</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NotFound;