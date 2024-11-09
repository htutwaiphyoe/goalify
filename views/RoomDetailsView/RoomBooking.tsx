import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { MMKRate, roles } from "@/data/constant";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@/components/Form/Button";
import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import {
  checkRoomAvailability,
  createBooking,
  getRoomBookedDates,
  getStripeCheckoutSession,
  resetCreateBookingState,
  resetRoomAvailabilityState,
  resetRoomBookedDatesState,
} from "@/redux/actions/bookingActions";
import { useRouter } from "next/router";
import { getObjectId } from "@/libs/mongo";
import { useSession } from "next-auth/react";
import useRedirect from "@/hooks/useRedirect";
import Textarea from "@/components/Form/Textarea";
import Loader from "@/components/Loader";
import { getPromotionValue } from "@/utils/helpers";

type RoomBookingProps = {
  pricePerNight: number;
  promotion: Promotion | null;
};

function RoomBooking({ pricePerNight, promotion }: RoomBookingProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [daysOfStay, setDaysOfStay] = useState(0);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { data: session } = useSession();
  const { pushToSignIn, pushToMyBookings } = useRedirect();

  const { error, message, loading } = useSelector<RootState, APIState>(
    (state) => state.newBookings
  );

  const {
    error: roomAvailabilityError,
    loading: roomAvailabilityLoading,
    isAvailable,
  } = useSelector<RootState, RoomAvailabilityState>(
    (state) => state.roomAvailability
  );

  const { error: roomBookedDatesError, bookedDates } = useSelector<
    RootState,
    RoomBookedDatesState
  >((state) => state.roomBookedDates);

  const { loading: stripeCheckOutLoading } = useSelector<
    RootState,
    StripeCheckoutState
  >((state) => state.stripeCheckout);

  useToastEffect({
    error,
    message,
    reset: resetCreateBookingState,
    onSuccess: pushToMyBookings,
  });

  useToastEffect({
    error: roomAvailabilityError,
    reset: resetRoomAvailabilityState,
  });

  useToastEffect({
    error: roomBookedDatesError,
    reset: resetRoomBookedDatesState,
  });

  useEffect(() => {
    router.query.id && dispatch(getRoomBookedDates(router.query.id as string));
  }, [dispatch, router.query.id]);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      setDaysOfStay(moment(end).diff(start, "days") + 1);
      dispatch(
        checkRoomAvailability({
          room: router.query.id as string,
          startDate: start?.toISOString(),
          endDate: end?.toISOString(),
        })
      );
    }
  };

  return (
    <div className="p-3 sm:p-8 border rounded-2xl max-w-350 overflow-scroll">
      <p className="text-base font-bold text-gray-800 mb-2">
        {promotion && (
          <span>
            $
            {getPromotionValue({
              value: pricePerNight,
              percent: promotion.percentRate,
            })}{" "}
            (
            {(
              getPromotionValue({
                value: pricePerNight,
                percent: promotion.percentRate,
              }) * MMKRate
            ).toLocaleString()}{" "}
            MMK)
          </span>
        )}
        <span className={promotion ? "line-through ml-2" : ""}>
          ${pricePerNight} ({(pricePerNight * MMKRate).toLocaleString()} MMK)
        </span>
        <span> / per night</span>
      </p>
      {promotion && (
        <p className="text-base text-gray-500 mb-2 font-bold italic">
          {promotion.name} - {promotion.percentRate}% off
        </p>
      )}
      <p className="mb-4 text-gray-700 text-base">
        Pick start and end date of your stay
      </p>
      <DatePicker
        calendarClassName="calendar"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        minDate={moment().toDate()}
        maxDate={moment().add(6, "months").toDate()}
        excludeDates={bookedDates.map((bookedDate) => new Date(bookedDate))}
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
      <div className="mt-3">
        <Textarea
          name="additionalRequest"
          label="Additional Request (Optional)"
          value={additionalRequest}
          rows={3}
          onChange={(e) => setAdditionalRequest(e.target.value)}
        />
      </div>
      {startDate && endDate && router.query.id && (
        <>
          <p className="my-3 font-bold text-base">
            Total - $
            {(
              daysOfStay *
              (promotion
                ? getPromotionValue({
                    value: pricePerNight,
                    percent: promotion.percentRate,
                  })
                : pricePerNight)
            ).toFixed(2)}{" "}
            (
            {(
              +(
                daysOfStay *
                (promotion
                  ? getPromotionValue({
                      value: pricePerNight,
                      percent: promotion.percentRate,
                    })
                  : pricePerNight)
              ).toFixed(2) * MMKRate
            ).toLocaleString()}{" "}
            MMK)
          </p>
          {roomAvailabilityLoading && <Loader />}
          {!isAvailable && !roomAvailabilityLoading && (
            <p className="my-3 font-bold text-base text-danger">
              Rooms are not available.
            </p>
          )}
          {isAvailable && !roomAvailabilityLoading && (
            <p className="my-3 font-bold text-base text-primary">
              Rooms are available.
            </p>
          )}
          {!session && !roomAvailabilityLoading && (
            <Button
              label="Go to Sign in"
              onClick={pushToSignIn}
              variant="contained"
              color="primary"
              size="large"
              className="w-full mb-3"
            />
          )}
          {isAvailable && !roomAvailabilityLoading && session && (
            <>
              {session.user.role === roles.user && (
                <div className="mb-3">
                  <Button
                    label={
                      loading || stripeCheckOutLoading
                        ? "Loading..."
                        : "Book and Pay now"
                    }
                    variant="contained"
                    disabled={loading || stripeCheckOutLoading}
                    color="primary"
                    size="large"
                    className="w-full"
                    onClick={() => {
                      dispatch(
                        getStripeCheckoutSession({
                          id: router.query.id as string,
                          startDate,
                          endDate,
                          daysOfStay,
                          amountPaid: +(
                            daysOfStay *
                            (promotion
                              ? getPromotionValue({
                                  value: pricePerNight,
                                  percent: promotion.percentRate,
                                })
                              : pricePerNight)
                          ).toFixed(2),
                          additionalRequest,
                          promotion: promotion
                            ? `${promotion.name} - ${promotion.percentRate}% off`
                            : "",
                        })
                      );
                    }}
                  />
                </div>
              )}
              {session.user.role === roles.user && (
                <div>
                  <Button
                    label={
                      loading || stripeCheckOutLoading
                        ? "Loading..."
                        : "Book and Pay on arrival"
                    }
                    variant="outlined"
                    disabled={loading || stripeCheckOutLoading}
                    size="large"
                    color="primary"
                    className="w-full"
                    onClick={() =>
                      dispatch(
                        createBooking({
                          room: router.query.id as string,
                          startDate,
                          endDate,
                          daysOfStay,
                          additionalRequest,
                          amountPaid: +(
                            daysOfStay *
                            (promotion
                              ? getPromotionValue({
                                  value: pricePerNight,
                                  percent: promotion.percentRate,
                                })
                              : pricePerNight)
                          ).toFixed(2),
                          promotion: promotion
                            ? `${promotion.name} - ${promotion.percentRate}% off`
                            : "",
                          paymentInfo: {
                            id: `${getObjectId()}`,
                            method: "Pay on arrival",
                            status: "pending",
                            paidWith: "",
                            account: "",
                          },
                        })
                      )
                    }
                  />
                </div>
              )}
              {session.user.role === roles.agency && (
                <div>
                  <Button
                    label={loading ? "Loading..." : "Book as agency"}
                    variant="contained"
                    disabled={loading}
                    size="large"
                    color="primary"
                    className="w-full"
                    onClick={() =>
                      dispatch(
                        createBooking({
                          room: router.query.id as string,
                          startDate,
                          endDate,
                          daysOfStay,
                          additionalRequest,
                          amountPaid: +(
                            daysOfStay *
                            (promotion
                              ? getPromotionValue({
                                  value: pricePerNight,
                                  percent: promotion.percentRate,
                                })
                              : pricePerNight)
                          ).toFixed(2),
                          promotion: promotion
                            ? `${promotion.name} - ${promotion.percentRate}% off`
                            : "",
                          paymentInfo: {
                            id: `${getObjectId()}`,
                            method: "Pay as agency",
                            status: "paid",
                            paidWith: "Cash",
                            account: "",
                          },
                        })
                      )
                    }
                  />
                  <p className="text-sm mt-2 text-yellow-600">
                    Payments will be handled by agency.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RoomBooking;
