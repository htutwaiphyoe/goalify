import { IconButton } from "@mui/material";
import DatePicker from "react-datepicker";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";

type Props = {
  startDate: null | Date;
  endDate: null | Date;
  onChange: (date: [Date | null, Date | null]) => void;
  className?: string;
};

function DateRangePicker({
  startDate,
  endDate,
  onChange,
  className = "",
}: Props) {
  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      placeholderText="Select date range"
      calendarClassName="calendar"
      className={twMerge(
        "py-[15px] px-4 border border-black-light rounded-md focus:outline-primary",
        className
      )}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      isClearable
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => {
        return (
          <div className="flex justify-center items-center space-x-5">
            <IconButton
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <ChevronLeftIcon className="text-black" />
            </IconButton>
            <p className="font-bold text-base">
              {moment(date).format("MMMM YYYY")}
            </p>
            <IconButton
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <ChevronRightIcon className="text-black" />
            </IconButton>
          </div>
        );
      }}
    />
  );
}

export default DateRangePicker;
