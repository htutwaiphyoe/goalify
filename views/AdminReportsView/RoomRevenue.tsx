type RoomRevenueProps = {
  data: RoomRevenue[];
};

function RoomRevenue({ data }: RoomRevenueProps) {
  return (
    <div className="rounded-xl shadow-sm border p-6 overflow-x-scroll">
      <h3 className="text-xl font-bold mb-2">Room statistics</h3>
      <table className="w-full">
        <thead className="border-b p-2">
          <tr>
            <th className="text-left text-gray-700">
              <p className="pb-3">Room</p>
            </th>
            <th className="text-left text-gray-700 sm:table-cell hidden">
              <p className="pb-3">Reviews</p>
            </th>
            <th className="text-left text-gray-700 sm:table-cell hidden">
              <p className="pb-3">Bookings</p>
            </th>
            <th className="text-left text-gray-700 sm:table-cell hidden">
              <p className="pb-3">Revenue</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((roomRevenue) => (
              <tr key={roomRevenue?._id}>
                <td>
                  <p className="py-2">
                    {roomRevenue?.name}({roomRevenue?.roomNumber})
                  </p>
                  <p className="py-2 block sm:hidden">
                    Reviews: {roomRevenue?.reviews}
                  </p>
                  <p className="py-2 block sm:hidden">
                    Bookings: {roomRevenue?.bookings}
                  </p>
                  <p className="py-2 block sm:hidden">
                    Revenue: ${roomRevenue?.revenue}
                  </p>
                </td>
                <td className="sm:table-cell hidden">
                  <p className="py-2">{roomRevenue?.reviews}</p>
                </td>
                <td className="sm:table-cell hidden">
                  <p className="py-2">{roomRevenue?.bookings}</p>
                </td>
                <td className="sm:table-cell hidden">
                  <p className="py-2">${roomRevenue?.revenue}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {data.length <= 0 && (
        <p className="text-center my-5">No room available</p>
      )}
    </div>
  );
}

export default RoomRevenue;
