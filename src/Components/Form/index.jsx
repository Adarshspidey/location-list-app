import React, { useEffect, useState } from "react";
import './style.css'

const Form = ({ setFormData, formData, positions, mode, mark }) => {
  const [data, setData] = useState({ nickName: "", address: "" });
  const [nickNameError, setNickNameError] = useState("");

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      setData(mark);
      setNickNameError("");
    }
  }, [mark, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setNickNameError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.nickName) {
      setNickNameError("Nickname cannot be empty");
      return; 
    }

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
      date: `${day}-${month}-${year}`,
      time: time,
      positions: positions,
    };

    if (mode === 'edit') {
      const updatedFormData = formData.map(item => {
        if (item.id === mark.id) {
          return {
            ...newData,
            id: mark.id 
          };
        }
        return item;
      });
      setFormData(updatedFormData);
    } else {
      newData.id = uniqueId;
      setFormData(prevFormData => [...prevFormData, newData]);
    }
  };

  return (
    <div >
      <form action="" onSubmit={handleSubmit} className="form-container">
        {mode === "view" ? (
          <div>{data.nickName}</div>
        ) : (
          <div className="error-message-container">
            <input
              type="text"
              placeholder="Nick Name"
              name="nickName"
              value={data.nickName}
              onChange={handleChange}
            />
            {nickNameError && <p className="error-message">{nickNameError}</p>}
          </div>
        )}
        {mode === "view" ? (
          <div>{data.address}</div>
        ) : (
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        )}
        {mode !== "view" && <button type="submit" className="button-save"> Save</button>}
      </form>
    </div>
  );
};

export default Form;
