import Button from "@/components/Form/Button";
import Loader from "@/components/Loader";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyRoom from "../RoomListView/EmptyRoom";
import useToastEffect from "@/hooks/useToastEffect";
import useRedirect from "@/hooks/useRedirect";
import Status from "@/components/Status";
import { formatPrice } from "@/utils/helpers";
import {
  bookingStatusList,
  paymentStatusList,
  statusColor,
} from "@/data/constant";
import {
  getAllBookingsByAdmin,
  resetAllBookingsByAdmin,
} from "@/redux/actions/adminActions";
import Select from "@/components/Form/Select";
import { SelectChangeEvent } from "@mui/material";
import DateRangePicker from "@/components/Form/DateRangePicker";

function AdminBookingsView() {
  const { pushToAdminBookingDetails } = useRedirect();
  const dispatch = useDispatch<any>();
  const [filters, setFilters] = useState({
    paymentStatus: "",
    bookingStatus: "",
    startDate: null,
    endDate: null,
  });

  const { error, loading, bookings } = useSelector<RootState, MyBookingsState>(
    (state) => state.myBookings
  );

  useToastEffect({ error, reset: resetAllBookingsByAdmin });

  useEffect(() => {
    dispatch(getAllBookingsByAdmin());
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setFilters((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const onDateRangePickerChange = (dates: any) => {
    const [startDate, endDate] = dates;
    setFilters((state) => ({ ...state, startDate, endDate }));
  };

  const filteredBookings = bookings?.filter((booking) => {
    let condition = true;

    if (filters.startDate && filters.endDate) {
      condition =
        condition &&
        moment(filters.startDate).isSameOrBefore(booking.startDate, "day") &&
        moment(filters.endDate).isSameOrAfter(booking.startDate, "day");
    }

    if (filters.bookingStatus) {
      condition = condition && booking.status === filters.bookingStatus;
    }
    if (filters.paymentStatus) {
      condition =
        condition && booking.paymentInfo.status === filters.paymentStatus;
    }

    return condition;
  });

  return (
    <section className="pt-3 sm:pt-14">
      {loading ? (
        <div className="flex justify-center items-center h-300 ">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center lg:space-x-2 lg:space-y-0 space-y-3 mb-7">
            <h1 className="text-3xl font-bold">
              {bookings.length} AVAILABLE BOOKING
              {bookings.length > 1 ? "S" : ""}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">
              <div>
                <DateRangePicker
                  className="w-250"
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                  onChange={onDateRangePickerChange}
                />
              </div>
              <div>
                <Select
                  className="w-200"
                  list={bookingStatusList}
                  value={filters.bookingStatus}
                  name="bookingStatus"
                  displayEmpty
                  onChange={handleChange}
                />
              </div>
              <div>
                <Select
                  className="w-200"
                  list={paymentStatusList}
                  value={filters.paymentStatus}
                  name="paymentStatus"
                  onChange={handleChange}
                  displayEmpty
                />
              </div>
            </div>
          </div>
          {filteredBookings.length === 0 ? (
            <EmptyRoom title="No bookings available." />
          ) : (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-full">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border p-5 rounded-xl grid gap-4 shadow-sm self-start"
                >
                  {booking.room && (
                    <div className="flex justify-between space-x-2 items-start">
                      <h3 className="font-bold text-xl break-all">
                        {booking.room.name} ({booking.room.roomNumber})
                      </h3>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <h3 className="font-bold text-base">Booking Information</h3>
                    <p className="text-base text-gray-700 break-all">
                      Booked by: {booking.user.email}
                    </p>
                    <p className="text-base text-gray-700">
                      Booking date:{" "}
                      {moment(booking.startDate).format("DD MMM YYYY")}
                    </p>
                    <p>
                      Total stay: {booking.daysOfStay} day
                      {booking.daysOfStay > 1 ? "s" : ""}
                    </p>
                    <p className="text-base text-gray-700">
                      Total amount: {formatPrice(booking.amountPaid)}
                    </p>
                    {booking.promotion && (
                      <p className="text-base text-gray-700 break-all">
                        Promotion: {booking.promotion}
                      </p>
                    )}
                    <p className="text-base text-gray-700">
                      Booking status:{" "}
                      <Status
                        status={booking.status}
                        // @ts-ignore
                        color={statusColor[booking.status]}
                      />
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="font-bold text-base">Payment Information</h3>
                    <p className="text-base text-gray-700">
                      Payment method: {booking.paymentInfo.method}
                    </p>
                    <p className="text-base text-gray-700">
                      Payment status:{" "}
                      <Status
                        status={booking.paymentInfo.status}
                        // @ts-ignore
                        color={statusColor[booking.paymentInfo.status]}
                      />
                    </p>
                    {booking.paymentInfo.paidWith && (
                      <p className="text-base text-gray-700">
                        Paid with: {booking.paymentInfo.paidWith}
                      </p>
                    )}
                    {booking.paymentInfo.account && (
                      <p className="text-base text-gray-700">
                        Account: {booking.paymentInfo.account}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="contained"
                      label="Go to details"
                      color="primary"
                      onClick={() => pushToAdminBookingDetails(booking._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default AdminBookingsView;
