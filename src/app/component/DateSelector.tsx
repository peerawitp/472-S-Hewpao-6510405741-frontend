"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";

// Define Zod Schema
const formSchema = z.object({
  returnDate: z.date({ required_error: "Return date is required" }),
});

type FormData = z.infer<typeof formSchema>;

interface DateSelectorProps {
  onClose?: () => void;
  onSubmitDates?: (dates: { returnDate: Date }) => void;
  initialReturnDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export default function DateSelector({
  onClose,
  onSubmitDates,
  initialReturnDate = null,
  minDate = new Date(),
  maxDate,
  className = "",
}: DateSelectorProps) {
  const [returnDate, setReturnDate] = useState<Date | null>(initialReturnDate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update local state if props change
  useEffect(() => {
    if (initialReturnDate) setReturnDate(initialReturnDate);
  }, [initialReturnDate]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      returnDate: initialReturnDate || undefined,
    },
    mode: "onChange",
  });

  // Validate dates when they change
  useEffect(() => {
    if (returnDate) setValue("returnDate", returnDate);
    if (returnDate) trigger();
  }, [returnDate, setValue, trigger]);

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    console.log("Submitted Trip Date:", data);
    
    if (onSubmitDates) {
      onSubmitDates({
        returnDate: data.returnDate,
      });
    }
    
    // Close the popup after successful submission
    if (onClose) {
      onClose();
    }
    
    setIsSubmitting(false);
  };

  // Calculate date options for quick selection
  const today = new Date();
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const in2Weeks = new Date(today);
  in2Weeks.setDate(today.getDate() + 14);
  
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const quickSelectOptions = [
    { label: "Next Weekend", date: getNextSunday() },
    { label: "1 Week", date: nextWeek },
    { label: "2 Weeks", date: in2Weeks },
    { label: "1 Month", date: nextMonth },
  ];

  function getNextSunday() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 6 = Saturday
    const daysUntilSunday = day === 0 ? 7 : 7 - day;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday;
  }

  const applyQuickSelect = (date: Date) => {
    setReturnDate(date);
    setValue("returnDate", date);
    trigger();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className={`max-w-lg mx-auto ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Quick select options */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Quick Select:</p>
          <div className="flex flex-wrap gap-2">
            {quickSelectOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => applyQuickSelect(option.date)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Return Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <div className="relative">
            <DatePicker
              selected={returnDate}
              onChange={(date) => {
                setReturnDate(date);
                setValue("returnDate", date as Date);
                trigger("returnDate");
              }}
              minDate={minDate}
              maxDate={maxDate || undefined}
              dateFormat="MMM d, yyyy"
              className="border p-2 pl-9 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholderText="Select return date"
              dayClassName={date => 
                isWeekend(date) ? "bg-blue-50 rounded-full" : undefined
              }
              popperClassName="z-50"
            />
            <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.returnDate && (
            <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>
          )}
        </div>

        {/* Selected date display */}
        {returnDate && (
          <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-center">
            <div className="text-sm">
              <p className="font-medium text-center">{formatDate(returnDate)}</p>
              <p className="text-gray-500 text-xs text-center">Selected Return Date</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`px-4 py-2 rounded flex-1 transition-colors ${
              isValid 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Confirm Date"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 flex-1 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}