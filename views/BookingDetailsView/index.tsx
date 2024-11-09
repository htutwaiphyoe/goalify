import Button from "@/components/Form/Button";
import Loader from "@/components/Loader";
import {
  MMKRate,
  bookingStatus,
  paymentStatus,
  roles,
  statusColor,
} from "@/data/constant";
import {
  getBookingDetails,
  resetBookingDetails,
  updateBookingStatus,
  resetUpdateBookingStatus,
} from "@/redux/actions/bookingActions";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyRoom from "../RoomListView/EmptyRoom";
import useToastEffect from "@/hooks/useToastEffect";
import { useRouter } from "next/router";
import Image from "next/image";
import GroupIcon from "@mui/icons-material/Group";
import BedIcon from "@mui/icons-material/Bed";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import AdditionalInformation from "./AdditionalInformation";
import Status from "@/components/Status";
import { useSession } from "next-auth/react";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import MarkAsPaidDialog from "./MarkAsPaidDialog";

function BookingDetailsView() {
  const { data: session } = useSession();
  const [cancelDialog, setCancelDialog] = useState(false);
  const [markAsPaidDialog, setMarkAsPaidDialog] = useState(false);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { error, loading, booking } = useSelector<
    RootState,
    BookingDetailsState
  >((state) => state.bookingDetails);

  const {
    error: updateBookingStatusError,
    loading: updateBookingStatusLoading,
    message: updateBookingStatusMessage,
  } = useSelector<RootState, BookingStatusState>(
    (state) => state.bookingStatus
  );

  useToastEffect({ error, reset: resetBookingDetails });

  useToastEffect({
    error: updateBookingStatusError,
    message: updateBookingStatusMessage,
    reset: resetUpdateBookingStatus,
    onSuccess: () => {
      dispatch(getBookingDetails(router.query.id as string));
      setCancelDialog(false);
      setMarkAsPaidDialog(false);
    },
  });

  useEffect(() => {
    router.query.id && dispatch(getBookingDetails(router.query.id as string));
  }, [dispatch, router.query.id]);

  return (
    <section className="pt-5 sm:pt-14">
      <h1 className="text-4xl font-bold text-center uppercase tracking-wider">
        booking details
      </h1>
      <hr className="w-100 mx-auto mt-7 mb-10" />
      {loading ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : booking ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
          <div className="border p-2 sm:p-5 rounded-xl grid gap-4 shadow-sm">
            {booking.room && (
              <>
                <DeleteDialog
                  label="Cancel Booking"
                  actionLabel="Proceed"
                  description={
                    <>
                      <p className="text-base mb-2">
                        {booking.paymentInfo.status === paymentStatus.paid
                          ? session?.user.role === roles.agency
                            ? "An cancellation email will be sent to admin. Admin will contact agency for  payment process."
                            : "An cancellation email will be sent to admin. Admin will contact you for refund process of your payment. You can check your booking payment status for refund."
                          : "An cancellation email will be sent to admin."}
                      </p>
                      <p className="text-base mb-2">
                        Are you sure you want to cancel this booking?
                      </p>
                    </>
                  }
                  open={cancelDialog}
                  onClose={() => setCancelDialog(false)}
                  loading={updateBookingStatusLoading}
                  onDelete={() =>
                    dispatch(
                      updateBookingStatus(booking._id, bookingStatus.cancelled)
                    )
                  }
                />
                <MarkAsPaidDialog
                  open={markAsPaidDialog}
                  onClose={() => setMarkAsPaidDialog(false)}
                  loading={updateBookingStatusLoading}
                  onSubmit={({ paidWith, account }) => {
                    dispatch(
                      updateBookingStatus(
                        booking._id,
                        paymentStatus.paid,
                        paidWith,
                        account
                      )
                    );
                  }}
                />
                <div>
                  <Image
                    src={booking.room.image.url}
                    alt={booking.room.name}
                    width={300}
                    height={100}
                    className="w-full h-250 rounded-lg object-cover"
                  />
                  <h3 className="font-bold text-2xl mt-4">
                    {booking.room.name} ({booking.room.roomNumber})
                  </h3>
                  <div className="flex flex-col space-y-3 mt-3">
                    <div className="flex items-center space-x-2">
                      <GroupIcon />
                      <p>
                        {booking.room.guestCapacity} Guest
                        {booking.room.guestCapacity > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <NightShelterIcon />
                      <p>{booking.room.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BedIcon />
                      <p>{booking.room.bedType}</p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            )}
            <div className="grid gap-2">
              <h3 className="font-bold text-lg">Booking Information</h3>
              <p className="text-base text-gray-700">
                Booking id: {booking._id}
              </p>
              <p className="text-base text-gray-700 break-all">
                Booked by: {booking.user.email}
              </p>
              <p className="text-base text-gray-700">
                Booking duration: from{" "}
                {moment(booking.startDate).format("DD MMM YYYY")} to{" "}
                {moment(booking.endDate).format("DD MMM YYYY")}
              </p>
              <p>
                Total night: {booking.daysOfStay} night
                {booking.daysOfStay > 1 ? "s" : ""}
              </p>
              <p className="text-base text-gray-700">
                Total amount: ${booking.amountPaid} (
                {(booking.amountPaid * MMKRate).toLocaleString()} MMK)
              </p>
              {booking.promotion && (
                <p className="text-base text-gray-700 break-all">
                  Promotion: {booking.promotion}
                </p>
              )}
              <p className="text-base text-gray-700">
                Booked at:{" "}
                {moment(booking.createdAt).format("DD MMM YYYY, hh:mm A")}
              </p>
              {booking.checkedInAt && (
                <p className="text-base text-gray-700">
                  Checked-in at:{" "}
                  {moment(booking.checkedInAt).format("DD MMM YYYY, hh:mm A")}
                </p>
              )}
              {booking.checkedOutAt && (
                <p className="text-base text-gray-700">
                  Checked-out at:{" "}
                  {moment(booking.checkedOutAt).format("DD MMM YYYY, hh:mm A")}
                </p>
              )}
              {booking.cancelAt && (
                <p className="text-base text-gray-700">
                  Cancelled at:{" "}
                  {moment(booking.cancelAt).format("DD MMM YYYY, hh:mm A")}
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
            {booking.status === bookingStatus.booked &&
              session?.user.role === roles.admin && (
                <Button
                  label={updateBookingStatusLoading ? "Loading..." : "Check in"}
                  variant="contained"
                  color="primary"
                  disabled={updateBookingStatusLoading}
                  onClick={() =>
                    dispatch(
                      updateBookingStatus(booking._id, bookingStatus.checkedIn)
                    )
                  }
                />
              )}
            {booking.status === bookingStatus.booked && (
              <Button
                label={
                  updateBookingStatusLoading ? "Loading..." : "Cancel booking"
                }
                variant="contained"
                color="error"
                disabled={updateBookingStatusLoading}
                onClick={() => setCancelDialog(true)}
              />
            )}
            {booking.status === bookingStatus.checkedIn &&
              session?.user.role === roles.admin && (
                <Button
                  label={
                    updateBookingStatusLoading ? "Loading..." : "Check out"
                  }
                  variant="contained"
                  color="primary"
                  disabled={updateBookingStatusLoading}
                  onClick={() =>
                    dispatch(
                      updateBookingStatus(booking._id, bookingStatus.checkedOut)
                    )
                  }
                />
              )}
            <hr />
            <div className="grid gap-2">
              <h3 className="font-bold text-base">Payment Information</h3>
              <p className="text-base text-gray-700 break-all">
                Payment id: {booking.paymentInfo.id}
              </p>
              <p className="text-base text-gray-700">
                Payment method: {booking.paymentInfo.method}
              </p>
              {booking.paidAt && (
                <p className="text-base text-gray-700">
                  Paid at:{" "}
                  {moment(booking.paidAt).format("DD MMM YYYY, hh:mm A")}
                </p>
              )}
              {booking.refundedAt && (
                <p className="text-base text-gray-700">
                  Refunded at:{" "}
                  {moment(booking.refundedAt).format("DD MMM YYYY, hh:mm A")}
                </p>
              )}
              <p className="text-base capitalize text-gray-700">
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
                <p className="text-base text-gray-700 break-all">
                  Account: {booking.paymentInfo.account}
                </p>
              )}
              {booking.paymentInfo.status === paymentStatus.pending &&
                session?.user.role === roles.admin && (
                  <Button
                    label={
                      updateBookingStatusLoading ? "Loading..." : "Mark as paid"
                    }
                    variant="outlined"
                    color="primary"
                    disabled={updateBookingStatusLoading}
                    onClick={() => setMarkAsPaidDialog(true)}
                  />
                )}
              {booking.paymentInfo.status === paymentStatus.paid &&
                session?.user.role === roles.admin && (
                  <Button
                    label={
                      updateBookingStatusLoading
                        ? "Loading..."
                        : "Mark as refunded"
                    }
                    variant="outlined"
                    color="primary"
                    disabled={updateBookingStatusLoading}
                    onClick={() =>
                      dispatch(
                        updateBookingStatus(booking._id, paymentStatus.refunded)
                      )
                    }
                  />
                )}
            </div>
          </div>
          <div>
            <AdditionalInformation
              id={booking._id}
              additionalRequest={booking.additionalRequest}
              guestInformation={booking.guestInformation}
              onSuccess={() =>
                dispatch(getBookingDetails(router.query.id as string))
              }
            />
          </div>
        </div>
      ) : (
        <EmptyRoom title="No booking available." />
      )}
    </section>
  );
}

export default BookingDetailsView;
