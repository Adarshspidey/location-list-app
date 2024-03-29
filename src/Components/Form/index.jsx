import React, { useState } from "react";

const Form = ({ setFormData,positions }) => {
  const [data, setData] = useState({ nickName: "", address: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0"); 
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
    const year = currentDate.getFullYear(); 
    const hours = String(currentDate.getHours()).padStart(2, "0"); 
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const time = hours + ":" + minutes; 
    const uniqueId = Date.now().toString();

    const newData = {
      ...data,
      id: uniqueId,
      date: `${day}-${month}-${year}`, 
      time: time,
      positions:positions
    };
    console.log(newData, "form data");
    setFormData(prevFormData => [...prevFormData, newData]);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nick Name"
          name="nickName"
          value={data.nickName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={data.address}
          onChange={handleChange}
        />
        <button type="submit"> Save</button>
      </form>
    </div>
  );
};

export default Form;
