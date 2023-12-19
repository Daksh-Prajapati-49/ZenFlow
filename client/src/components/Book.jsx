import React from 'react'
import axios from 'axios';

const Book = ({ item, data, setData, idx }) => {
    const handleClick = async () => {
        await setData({ ...data, batchId: item._id, month: item.month, year: item.year });
        const result = window.confirm("Do you want to confirm booking?");

        if (result) {
            // User clicked "OK" (Book)
            // console.log(process.env.REACT_APP_SERVER_URL);
            axios.post('https://zenflowv5.onrender.com/api/users', data)
                .then((res) => {
                    console.log(res);
                    alert("Booking confirmed!");
                })
                .catch((err) => {
                    console.log(err);
                    alert(`Booking failed! ${err.response.data.message}`)
                });

            // alert("Booking confirmed!");
        } else {
            // User clicked "Cancel"
            alert("Booking canceled.");
        }
    }

    return (
        <div key={item._id}>
            <button className="shadow p-3 mb-5 bg-body-tertiary rounded btn" type="button" key={item._id} onClick={handleClick}>
                {/* <p>{item._id}</p> */}
                <p>Timing : {item.timing}</p>
                <p>Month : {item.month}</p>
                <p>Year : {item.year}</p>
                <p>Available: {30-item.count}</p>
            </button>

        </div>
    )
}

export default Book