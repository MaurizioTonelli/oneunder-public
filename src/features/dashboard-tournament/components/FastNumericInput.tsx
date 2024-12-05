import React, { useRef, useState } from "react";

function FastNumericInput({ value = "", setValue, holeNo }) {
  const [lastValue, setLastValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // Allow only up to two numeric digits
    if (/^\d{0,2}$/.test(newValue)) {
      setValue(holeNo, newValue);
    }
  };

  const handleFocus = () => {
    setLastValue(value);
    setValue(holeNo, "");
  };

  const handleBlur = () => {
    if (value === "") {
      setValue(holeNo, lastValue);
    } else {
      setLastValue(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent default behavior for Enter and Space
      const form = inputRef.current?.form;
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const index = elements.indexOf(inputRef.current!);
        const nextElement = elements[index + 1] || elements[0];
        nextElement.focus(); // Move focus to the next input element
      }
    }
  };
  return (
    <input
      className="w-10 p-2 border-red border-2"
      ref={inputRef}
      type="number"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
}

export default FastNumericInput;
