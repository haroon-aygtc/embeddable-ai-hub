
import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Palette, Check } from "lucide-react";

interface ColorPickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ id, label, value, onChange }: ColorPickerProps) => {
  const [tempColor, setTempColor] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  
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
    // Add a brief delay before closing the popover for better UX
    setTimeout(() => setIsOpen(false), 200);
  };

  // Try to use the EyeDropper API if available in the browser
  const handleEyeDropper = useCallback(async () => {
    try {
      // @ts-ignore - EyeDropper is not yet in all TypeScript definitions
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setTempColor(result.sRGBHex);
      onChange(result.sRGBHex);
    } catch (e) {
      console.log('EyeDropper not supported or user canceled');
    }
  }, [onChange]);

  // Check if the EyeDropper API is available
  const isEyeDropperSupported = typeof window !== 'undefined' && 'EyeDropper' in window;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex space-x-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              className="h-9 w-9 rounded-md border flex-shrink-0 cursor-pointer overflow-hidden relative transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{ 
                backgroundColor: value,
                boxShadow: `0 2px 8px ${value}40`
              }}
              aria-label="Pick a color"
            >
              <div className="absolute inset-0 grid place-items-center opacity-0 hover:opacity-100 bg-black/20">
                <Palette className="h-4 w-4 text-white" />
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3 animate-in zoom-in-50 duration-200">
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
                  {isEyeDropperSupported && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleEyeDropper}
                      className="aspect-square" 
                      title="Pick color from screen"
                    >
                      <Palette className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <Label>Preset Colors</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full relative flex items-center justify-center border transition-all duration-200 hover:scale-110 hover:shadow-md"
                      style={{ 
                        backgroundColor: color,
                        boxShadow: color.toLowerCase() === value.toLowerCase() ? `0 2px 8px ${color}80` : 'none' 
                      }}
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
