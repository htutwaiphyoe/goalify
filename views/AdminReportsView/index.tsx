import Loader from "@/components/Loader";
import useToastEffect from "@/hooks/useToastEffect";
import {
  clearReportsByAdmin,
  getReportByAdmin,
  resetReportsByAdmin,
} from "@/redux/actions/adminActions";
import { appendS, getMMKRate } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportCard from "./ReportCard";
import { BarChart, PieChart } from "@/components/Chart";
import RoomRevenue from "./RoomRevenue";
import UserRevenue from "./UserRevenue";
import DateRangePicker from "@/components/Form/DateRangePicker";
import moment from "moment";

function AdminReportsView() {
  const dispatch = useDispatch<any>();
  const [filters, setFilters] = useState({
    startDate: moment().toDate(),
    endDate: moment().add(1, "week").toDate(),
  });

  const { data, error, loading } = useSelector<RootState, AdminReportsState>(
    (state) => state.adminReports
  );

  useToastEffect({
    error,
    reset: resetReportsByAdmin,
    clear: clearReportsByAdmin,
  });

  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      dispatch(
        getReportByAdmin({
          startDate: moment(filters.startDate).toDate(),
          endDate: moment(filters.endDate).toDate(),
        })
      );
    }
    if (!filters.startDate && !filters.endDate) {
      dispatch(
        getReportByAdmin({
          startDate: filters.startDate,
          endDate: filters.endDate,
        })
      );
    }
  }, [dispatch, filters]);

  const onDateRangePickerChange = (dates: any) => {
    const [startDate, endDate] = dates;
    setFilters((state) => ({ ...state, startDate, endDate }));
  };

  return (
    <section className="pt-3 sm:pt-14">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center space-y-3 sm:space-y-0 sm:space-x-2 mb-7">
        <h1 className="text-3xl font-bold">REPORTS</h1>
        <div>
          <DateRangePicker
            className="w-250"
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={onDateRangePickerChange}
          />
        </div>
      </div>
      {!data || loading ? (
        <div className="flex justify-center items-center h-300">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ReportCard
              title="Occupancy rate"
              value={`${
                data.occupancyRate ? +data.occupancyRate?.toFixed(2) : 0
              }%`}
              description={`${data.noOfOccupancyBookings} booking${appendS(
                data.noOfOccupancyBookings
              )} from ${data.noOfRooms} room${appendS(data.noOfRooms)}`}
            />
            <ReportCard
              title="Total revenue"
              value={`$${
                data.totalRevenue ? +data.totalRevenue?.toFixed(2) : 0
              }`}
              description={`${getMMKRate(data.totalRevenue)}`}
            />
            <ReportCard
              title="Average Daily Rate (ADR)"
              value={`$${
                data.averageDailyRate ? +data.averageDailyRate?.toFixed(2) : 0
              }`}
              description={`$${data.totalRevenue} revenue from ${
                data.totalRoomsSold
              } room${appendS(data.totalRoomsSold)} sold`}
            />
            <ReportCard
              title="Revenue per Available Rooms (RevPAR)"
              value={`$${
                data.revenuePerAvailableRooms
                  ? data.revenuePerAvailableRooms?.toFixed(2)
                  : 0
              }`}
              description={`$${data.totalRevenue} revenue from ${
                data.noOfRooms
              } room${appendS(data.noOfRooms)}`}
            />
            <ReportCard
              title="Average Length of Stays"
              value={`${
                data.averageLengthOfStays
                  ? data.averageLengthOfStays?.toFixed(2)
                  : 0
              }`}
              description={`${data.totalLengthOfStays} day${appendS(
                data.totalLengthOfStays
              )} 
              from ${data.noOfValidBookings} booking${appendS(
                data.noOfValidBookings
              )}`}
            />
            <ReportCard
              title="Cancellation rate"
              value={`${
                data.cancellationRate ? data.cancellationRate?.toFixed(2) : 0
              }`}
              description={`${data.noOfCancelledBookings} booking${appendS(
                data.noOfCancelledBookings
              )} 
              from ${data.noOfBookings} booking${appendS(data.noOfBookings)}`}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
            <div className="rounded-xl shadow-sm border p-6">
              <PieChart
                title="Room Revenue by Room Category"
                label="Revenue"
                labels={Object.keys(data.revenuePerRoomType)}
                data={Object.values(data.revenuePerRoomType)}
              />
            </div>
            <div className="rounded-xl shadow-sm border p-6">
              <BarChart
                title="Bookings and Payment status"
                label="No. of bookings"
                labels={Object.keys(data.bookingAndPaymentStatus)}
                data={Object.values(data.bookingAndPaymentStatus)}
              />
            </div>
            <RoomRevenue data={data.roomRevenue} />
            <UserRevenue data={data.userRevenue} />
          </div>
        </>
      )}
    </section>
  );
}

export default AdminReportsView;
