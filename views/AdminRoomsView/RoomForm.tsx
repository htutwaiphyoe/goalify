import { Form, Formik } from "formik";
import Button from "@/components/Form/Button";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import { roomValidationSchema } from "@/data/schemas";
import DropZone from "@/components/Form/Dropzone";
import { readUploadFile } from "@/utils/helpers";
import Select from "@/components/Form/Select";
import { bedTypeOptions, roomCategoryOptions } from "@/data/constant";
import CheckBox from "@/components/Form/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import useToastEffect from "@/hooks/useToastEffect";
import { useEffect } from "react";
import {
  getAllFacilitiesByAdmin,
  resetAllFacilitiesByAdmin,
  getAllPromotionsByAdmin,
  resetAllPromotionsByAdmin,
  clearAllPromotionsByAdmin,
  clearAllFacilitiesByAdmin,
} from "@/redux/actions/adminActions";

type Props = {
  edit: boolean;
  onSubmit: (values: any) => Promise<any>;
  onBack: () => void;
  data: {
    roomNumber: string;
    name: string;
    description: string;
    category: string;
    facilities: string[];
    pricePerNight: number;
    promotion: string;
    guestCapacity: number;
    bedType: string;
    image: any;
  };
};

function RoomForm({ data, edit, onSubmit, onBack }: Props) {
  const dispatch = useDispatch<any>();

  const { facilities, error: facilitiesError } = useSelector<
    RootState,
    AdminFacilitiesState
  >((state) => state.adminFacilities);

  useToastEffect({
    error: facilitiesError,
    reset: resetAllFacilitiesByAdmin,
    clear: clearAllFacilitiesByAdmin,
  });

  const { promotions, error: promotionsError } = useSelector<
    RootState,
    AdminPromotionsState
  >((state) => state.adminPromotions);

  useToastEffect({
    error: promotionsError,
    reset: resetAllPromotionsByAdmin,
    clear: clearAllPromotionsByAdmin,
  });

  useEffect(() => {
    dispatch(getAllFacilitiesByAdmin());
    dispatch(getAllPromotionsByAdmin());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{ ...data }}
      enableReinitialize
      validateOnBlur
      validateOnChange
      validationSchema={roomValidationSchema}
      onSubmit={async (values) =>
        await onSubmit({ ...values, promotion: values.promotion || null })
      }
    >
      {({
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className="grid gap-5">
              <h2 className="text-3xl font-bold">
                {edit ? "Update" : "Add new"} room
              </h2>
              <DropZone
                label="Image*"
                variant="hero"
                value={values.image}
                onUpload={(uploadedFile) => {
                  if (!uploadedFile)
                    return setFieldValue("image", uploadedFile);
                  readUploadFile({
                    file: uploadedFile,
                    onLoad: (file) => setFieldValue("image", file),
                  });
                }}
                onRemove={() => setFieldValue("image", null)}
                helperText={touched.image && errors.image}
                error={touched.image && !!errors.image}
              />
              <Input
                label="Room No.*"
                name="roomNumber"
                value={values.roomNumber}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.roomNumber && errors.roomNumber}
                error={touched.roomNumber && !!errors.roomNumber}
                placeholder="Enter room number"
              />
              <Input
                label="Name*"
                name="name"
                value={values.name}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name && errors.name}
                error={touched.name && !!errors.name}
                placeholder="Enter room name"
              />
              <Textarea
                label="Description*"
                placeholder="Enter room description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.description && errors.description}
                error={touched.description && !!errors.description}
                rows={5}
              />
              <Select
                list={roomCategoryOptions}
                label="Room Category"
                value={values.category}
                name="category"
                displayEmpty
                onChange={handleChange}
              />
              <Select
                list={bedTypeOptions}
                label="Bed Type"
                value={values.bedType}
                name="bedType"
                onChange={handleChange}
                displayEmpty
              />
              <Input
                label="Price Per Night*"
                name="pricePerNight"
                value={values.pricePerNight}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.pricePerNight && errors.pricePerNight}
                error={touched.pricePerNight && !!errors.pricePerNight}
                placeholder="Enter price per night"
              />
              <Input
                label="Guest Capacity*"
                name="guestCapacity"
                value={values.guestCapacity}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.guestCapacity && errors.guestCapacity}
                error={touched.guestCapacity && !!errors.guestCapacity}
                placeholder="Enter guest capacity"
              />
              {promotions.length > 0 && (
                <Select
                  displayEmpty
                  onChange={handleChange}
                  name="promotion"
                  label="Promotion (Optional)"
                  value={values.promotion}
                  list={[
                    { value: "", label: "Please select" },
                    ...promotions.map((promotion) => ({
                      value: promotion._id,
                      label: `${promotion.name} - (${promotion.percentRate}% off)`,
                    })),
                  ]}
                />
              )}
              {facilities.length > 0 && (
                <div>
                  <label className="text-sm mb-2">Facilities</label>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                    {facilities.map((facility) => (
                      <CheckBox
                        key={facility._id}
                        label={facility.name}
                        checked={values.facilities.includes(facility._id)}
                        name={facility._id}
                        onChange={(e) =>
                          setFieldValue(
                            "facilities",
                            e.target.checked
                              ? [...values.facilities, facility._id]
                              : values.facilities.filter(
                                  (id) => id !== facility._id
                                )
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <Button
                  label="Back to rooms"
                  variant="text"
                  type="button"
                  color="primary"
                  onClick={onBack}
                />
                <Button
                  type="submit"
                  size="large"
                  label={isSubmitting ? "Loading..." : edit ? "Save" : "Add"}
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting || !dirty || !isValid}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RoomForm;
