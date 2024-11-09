import Button from "@/components/Form/Button";
import Loader from "@/components/Loader";
import {
  getMyBookings,
  resetMyBookingsState,
} from "@/redux/actions/bookingActions";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyRoom from "../RoomListView/EmptyRoom";
import useToastEffect from "@/hooks/useToastEffect";
import useRedirect from "@/hooks/useRedirect";
import Status from "@/components/Status";
import { formatPrice } from "@/utils/helpers";
import { statusColor } from "@/data/constant";

function MyBookingsView() {
  const { pushToBookingDetails } = useRedirect();
  const dispatch = useDispatch<any>();
  const { error, loading, bookings } = useSelector<RootState, MyBookingsState>(
    (state) => state.myBookings
  );

  useToastEffect({ error, reset: resetMyBookingsState });

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  return (
    <section className="pt-5 sm:pt-14">
      <h1 className="text-4xl font-bold text-center  uppercase tracking-wider">
        My bookings
      </h1>
      <hr className="w-100 mx-auto my-7" />
      {loading ? (
        <div className="flex justify-center items-center h-300 ">
          <Loader />
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border p-5 rounded-xl grid gap-4 shadow-sm self-start"
            >
              {booking.room && (
                <div className="flex justify-between space-x-2 items-start">
                  <h3 className="font-bold text-xl">
                    {booking.room.name} ({booking.room.roomNumber})
                  </h3>
                </div>
              )}
              <div className="grid gap-2">
                <h3 className="font-bold text-base">Booking Information</h3>
                <p className="text-base text-gray-700">
                  Booking date:{" "}
                  {moment(booking.startDate).format("DD MMM YYYY")}
                </p>
                <p>Total days: {booking.daysOfStay}</p>
                <p className="text-base text-gray-700">
                  Total amount: {formatPrice(booking.amountPaid)}
                </p>
                {booking.promotion && (
                  <p className="text-base text-gray-700">
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
                  onClick={() => pushToBookingDetails(booking._id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyRoom title="No bookings available." />
      )}
    </section>
  );
}

export default MyBookingsView;
