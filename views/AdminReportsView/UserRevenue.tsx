import { Avatar } from "@mui/material";

type UserRevenueProps = {
  data: UserRevenue[];
};

function UserRevenue({ data }: UserRevenueProps) {
  return (
    <div className="rounded-xl shadow-sm border p-6">
      <h3 className="text-xl font-bold mb-2">User statistics</h3>
      <table className="w-full">
        <thead className="border-b p-2">
          <tr>
            <th className="text-left text-gray-700">
              <p className="pb-3">User</p>
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
            data.map((userRevenue: UserRevenue) => (
              <tr key={userRevenue?._id}>
                <td>
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar
                      src={userRevenue?.avatar?.url}
                      alt={userRevenue?.name}
                      className="w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold mb-[2px] capitalize">
                        {userRevenue?.name} ({userRevenue?.role})
                      </p>
                      <p className="text-xs text-gray-700">
                        {userRevenue?.email}
                      </p>
                    </div>
                  </div>
                  <p className="py-2 block sm:hidden">
                    Reviews: {userRevenue?.reviews}
                  </p>
                  <p className="py-2 block sm:hidden">
                    Bookings: {userRevenue?.bookings}
                  </p>
                  <p className="py-2 block sm:hidden">
                    Revenue: ${userRevenue?.revenue}
                  </p>
                </td>
                <td className="sm:table-cell hidden">
                  <p className="py-2">{userRevenue?.reviews}</p>
                </td>
                <td className="sm:table-cell hidden">
                  <p className="py-2">{userRevenue?.bookings}</p>
                </td>
                <td className="sm:table-cell hidden">
                  <p className="py-2">${userRevenue?.revenue}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {data.length <= 0 && (
        <p className="text-center my-5">No user available</p>
      )}
    </div>
  );
}

export default UserRevenue;
