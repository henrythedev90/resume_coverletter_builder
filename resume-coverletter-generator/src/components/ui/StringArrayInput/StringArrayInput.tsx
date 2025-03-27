import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StringArrayInputProps {
  label: string;
  items: string[];
  setItems: (items: string[]) => void;
}

function StringArrayInput({ label, items, setItems }: StringArrayInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "" && !items.includes(inputValue.trim())) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (itemToRemove: string) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      <div className="flex mt-2">
        <Input
          type="text"
          placeholder={`Enter ${label}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button type="button" onClick={handleAddItem}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap mt-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant="outline"
            className="mr-2 mb-2 cursor-pointer"
            onClick={() => removeItem(item)}
          >
            {item} <span className="ml-1">X</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default StringArrayInput;
