type AdminFacilitiesState = {
  facilities: Facility[];
  error: any;
  loading: boolean;
};

type AdminFacilitiesAction = {
  type:
    | "ADMIN_FACILITIES_REQUEST"
    | "ADMIN_FACILITIES_SUCCESS"
    | "ADMIN_FACILITIES_FAIL"
    | "ADMIN_FACILITIES_RESET"
    | "ADMIN_FACILITIES_CLEAR";
  payload: any;
};

type AdminFacilityState = {
  facility: Facility | null;
  error: any;
  loading: boolean;
};

type AdminFacilityAction = {
  type:
    | "ADMIN_FACILITY_REQUEST"
    | "ADMIN_FACILITY_SUCCESS"
    | "ADMIN_FACILITY_FAIL"
    | "ADMIN_FACILITY_RESET"
    | "ADMIN_FACILITY_CLEAR";
  payload: any;
};

type Facility = {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};
