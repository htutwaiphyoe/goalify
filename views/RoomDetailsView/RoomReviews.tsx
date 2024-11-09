import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { Rating } from "@mui/material";
import Button from "@/components/Form/Button";
import Dialog from "@/components/Dialog";
import Textarea from "@/components/Form/Textarea";
import { updateReviewValidationSchema } from "@/data/schemas";
import {
  checkReviewAvailability,
  resetReviewAvailability,
  resetUpdateReview,
  updateReview,
} from "@/redux/actions/reviewActions";
import { useRouter } from "next/router";
import useToastEffect from "@/hooks/useToastEffect";
import { getRoomDetails } from "@/redux/actions/roomActions";
import Image from "next/image";
import { useSession } from "next-auth/react";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function RoomReviews({ reviews }: { reviews: Review[] }) {
  const dispatch = useDispatch<any>();
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { error, message } = useSelector<RootState, UpdateReviewState>(
    (state) => state.updateReview
  );
  const { error: reviewAvailability, isReviewAvailable } = useSelector<
    RootState,
    ReviewAvailabilityState
  >((state) => state.reviewAvailability);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  useToastEffect({
    error,
    message,
    reset: resetUpdateReview,
    onSuccess: () => {
      onClose();
      dispatch(getRoomDetails(router.query.id as string));
    },
  });

  useToastEffect({
    error: reviewAvailability,
    reset: resetReviewAvailability,
  });

  useEffect(() => {
    if (router.query.id && session)
      dispatch(checkReviewAvailability(router.query.id as string));
  }, [router.query.id, dispatch, session]);

  return (
    <div>
      {isReviewAvailable && (
        <>
          <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Formik
              initialValues={{ rating: 0, comment: "" }}
              validateOnBlur
              validateOnChange
              enableReinitialize
              validationSchema={updateReviewValidationSchema}
              onSubmit={async (values) => {
                await dispatch(
                  updateReview({ roomId: router.query.id as string, ...values })
                );
              }}
            >
              {({
                dirty,
                values,
                isValid,
                isSubmitting,
                handleChange,
                setFieldValue,
                handleSubmit,
              }) => {
                return (
                  <Form onSubmit={handleSubmit} className="grid gap-5">
                    <h1 className="text-3xl font-bold">Give a rating</h1>
                    <Rating
                      name="rating"
                      size="large"
                      value={values.rating}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setFieldValue("rating", newValue);
                      }}
                    />
                    <Textarea
                      name="comment"
                      value={values.comment}
                      onChange={handleChange}
                      rows={5}
                      label="Comment*"
                      placeholder="Good"
                    />
                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        size="large"
                        label="Cancel"
                        variant="outlined"
                        color="primary"
                        onClick={onClose}
                      />
                      <Button
                        type="submit"
                        size="large"
                        label={isSubmitting ? "Loading..." : "Submit"}
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting || !dirty || !isValid}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Dialog>
          <Button
            label="Submit a review"
            variant="contained"
            color="primary"
            size="large"
            onClick={onOpen}
            className="!mb-4"
          />
        </>
      )}
      <h2 className="font-bold text-xl mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-t py-4 xl:max-w-700"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={review.avatar.url}
                  alt={review.name}
                  width={30}
                  height={30}
                  className="rounded-full object-cover"
                />
                <p className="text-lg">{review.name}</p>
              </div>
              <div className="mb-3 flex items-center space-x-2 ">
                <Rating
                  value={review.rating}
                  size="small"
                  readOnly
                  precision={0.5}
                />
                <p className="text-lg font-bold">({review.rating})</p>
              </div>
              <div className="mb-3 flex items-center space-x-2">
                <AccessTimeIcon className="text-lg" />
                <p className="text-sm">
                  {moment(review.updatedAt).format("DD MMM YYYY, hh:mm A")}
                </p>
              </div>
              <p className="text-base text-gray-700 italic break-all">
                {`"${review.comment}"`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-5 bg-primary-lighter rounded-lg text-center font-bold">
          No reviews yet.
        </p>
      )}
    </div>
  );
}
