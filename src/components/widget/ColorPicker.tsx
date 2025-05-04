
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { EyeDropper, Check } from "lucide-react";

interface ColorPickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ id, label, value, onChange }: ColorPickerProps) => {
  const [tempColor, setTempColor] = useState(value);
  
  // Define a list of preset colors
  const presetColors = [
    "#4a4dd4", "#209fb5", "#1e293b", "#ec4899", "#18181b",
    "#22c55e", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4",
    "#facc15", "#3b82f6", "#14b8a6", "#fb7185", "#6366f1"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTempColor(newColor);
    onChange(newColor);
  };

  const handleColorSelect = (color: string) => {
    setTempColor(color);
    onChange(color);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="h-9 w-9 rounded-md border flex-shrink-0 cursor-pointer overflow-hidden relative"
              style={{ backgroundColor: value }}
              aria-label="Pick a color"
            >
              <div className="absolute inset-0 grid place-items-center opacity-0 hover:opacity-100 bg-black/20">
                <EyeDropper className="h-4 w-4 text-white" />
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="space-y-3">
              <div>
                <Label>Custom Color</Label>
                <div className="flex mt-1 gap-2">
                  <Input 
                    type="color" 
                    value={tempColor} 
                    onChange={handleInputChange}
                    className="w-10 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={tempColor}
                    onChange={handleInputChange}
                    className="flex-1"
                    placeholder="#RRGGBB"
                  />
                </div>
              </div>
              <div>
                <Label>Preset Colors</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full relative flex items-center justify-center border"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      aria-label={`Select color ${color}`}
                    >
                      {color.toLowerCase() === value.toLowerCase() && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
