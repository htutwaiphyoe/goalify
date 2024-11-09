import { Formik, Form } from "formik";
import useToastEffect from "@/hooks/useToastEffect";
import Button from "@/components/Form/Button";
import { additionalInformationValidationSchema } from "@/data/schemas";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "@/components/Form/Textarea";
import {
  resetUpdateBookingAdditionalInformation,
  updateBookingAdditionalInformation,
} from "@/redux/actions/bookingActions";
import useRedirect from "@/hooks/useRedirect";

type Props = {
  id: string;
  additionalRequest: string;
  guestInformation: string;
  onSuccess: () => void;
};

function AdditionalInformation({
  id,
  additionalRequest,
  guestInformation,
  onSuccess,
}: Props) {
  const { back } = useRedirect();
  const dispatch = useDispatch<any>();
  const { error, message } = useSelector<
    RootState,
    BookingAdditionalInformationState
  >((state) => state.bookingAdditionalInformation);

  useToastEffect({
    error,
    message,
    reset: resetUpdateBookingAdditionalInformation,
    onSuccess,
  });

  return (
    <Formik
      initialValues={{ additionalRequest, guestInformation }}
      validateOnBlur
      validateOnChange
      enableReinitialize
      validationSchema={additionalInformationValidationSchema}
      onSubmit={async (values) => {
        await dispatch(
          updateBookingAdditionalInformation(
            id,
            values.additionalRequest,
            values.guestInformation
          )
        );
      }}
    >
      {({ values, isValid, isSubmitting, handleChange, handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit} className="grid gap-3">
            <h3 className="font-bold text-xl">Additional Information</h3>
            <Textarea
              name="additionalRequest"
              label="Additional Request (Optional)"
              value={values.additionalRequest}
              rows={4}
              placeholder="Eg. Airport transfer"
              onChange={handleChange}
            />
            <Textarea
              name="guestInformation"
              label="Guest Information (Optional)"
              value={values.guestInformation}
              placeholder="Eg. John Doe, Alex"
              rows={4}
              onChange={handleChange}
            />
            <div className="flex justify-between space-x-3">
              <Button
                type="button"
                size="small"
                label="Back to bookings"
                color="primary"
                variant="text"
                onClick={back}
              />
              <Button
                type="submit"
                size="large"
                label={isSubmitting ? "Loading..." : "Save"}
                color="primary"
                variant="contained"
                disabled={isSubmitting || !isValid}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AdditionalInformation;
