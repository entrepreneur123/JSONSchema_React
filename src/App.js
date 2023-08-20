import React, { useState } from "react";

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    gender: {
      type: "string",
      enum: ["male", "female"],
    },
  },
  required: ["name", "gender"],
};

const App = () => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    for (const fieldName in schema.properties) {
      const fieldSchema = schema.properties[fieldName];
      if (fieldSchema.required && !formData[fieldName]) {
        errors[fieldName] = "This field is required";
      }
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Form data:", formData);
    }
  };
  return (
    <div>
      <h1>Generated Form Example</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(schema.properties).map((fieldName) => {
          const fieldSchema = schema.properties[fieldName];
          return (
            <div key={fieldName}>
              <label>
                {fieldName}:
                {fieldSchema.enum ? (
                  <select
                    name={fieldName}
                    value={formData[fieldName] || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    {fieldSchema.enum.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={fieldName}
                    value={formData[fieldName] || ""}
                    onChange={handleInputChange}
                  />
                )}
              </label>
              {formErrors[fieldName] && (
                <div style={{ color: "red" }}>{formErrors[fieldName]}</div>
              )}
            </div>
          );
        })}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
