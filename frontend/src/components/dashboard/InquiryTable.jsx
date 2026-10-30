import {
  UserRound,
  GraduationCap,
  School,
  CalendarDays,
  Inbox,
} from "lucide-react";

const statusStyles = {
  Pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Contacted: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  Resolved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
};

const userTypeIcons = {
  Parent: UserRound,
  Student: GraduationCap,
  School: School,
};

const categoryStyles = {
  Scholarship: "bg-purple-400/10 text-purple-300",
  Concert: "bg-pink-400/10 text-pink-300",
  Admission: "bg-cyan-400/10 text-cyan-300",
  "General Query": "bg-slate-400/10 text-slate-300",
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const InquiryTable = ({ inquiries, onStatusChange }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-[#294448] bg-[#102328]">
      {/* Table Header */}
      <div className="flex flex-col justify-between gap-2 border-b border-[#294448] px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-semibold text-[#E7F0EF]">
            Inquiry Records
          </h3>
          <p className="mt-1 text-xs text-[#829D99]">
            Manage and track your incoming inquiries
          </p>
        </div>

        <span className="w-fit rounded-lg border border-[#36736B]/30 bg-[#087F78]/10 px-3 py-1.5 text-xs font-medium text-[#70D6C7]">
          {inquiries.length} Records
        </span>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#294448] bg-[#172D32] text-[11px] uppercase tracking-wider text-[#829D99]">
              <th className="px-5 py-4 font-semibold">Contact</th>
              <th className="px-5 py-4 font-semibold">Phone</th>
              <th className="px-5 py-4 font-semibold">Email Address</th>
              <th className="px-5 py-4 font-semibold">User Type</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Submitted</th>
              <th className="px-5 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#294448]">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B393D] text-[#70D6C7]">
                    <Inbox size={27} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-[#D9E6E4]">
                    No inquiries found
                  </h3>

                  <p className="mt-1 text-xs text-[#829D99]">
                    New inquiries will appear here when submitted.
                  </p>
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => {
                const UserIcon = userTypeIcons[inquiry.user_type] || UserRound;

                return (
                  <tr
                    key={inquiry.id}
                    className="transition-colors hover:bg-[#183236]/70"
                  >
                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#36736B]/30 bg-[#17413D] text-sm font-semibold text-[#70D6C7]">
                          {inquiry.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[150px] truncate text-sm font-medium text-[#E1ECEA]">
                            {inquiry.name}
                          </p>
                          <p className="text-[11px] text-[#829D99]">
                            ID #{inquiry.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[#B5C8C5]">
                      {inquiry.phone}
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <span className="block max-w-[190px] truncate text-sm text-[#A8BFBB]">
                        {inquiry.email}
                      </span>
                    </td>

                    {/* User Type */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#C1D1CE]">
                        <UserIcon size={16} className="text-[#70D6C7]" />
                        {inquiry.user_type}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                          categoryStyles[inquiry.category] ||
                          "bg-slate-400/10 text-slate-300"
                        }`}
                      >
                        {inquiry.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-[#A8BFBB]">
                        <CalendarDays size={15} className="text-[#829D99]" />
                        {formatDate(inquiry.created_at)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="relative w-fit">
                        <select
                          aria-label={`Change status for ${inquiry.name}`}
                          value={inquiry.status}
                          onChange={(e) =>
                            onStatusChange(inquiry.id, e.target.value)
                          }
                          className={`cursor-pointer appearance-none rounded-lg border py-2 pl-3 pr-8 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-[#70D6C7]/20 ${
                            statusStyles[inquiry.status] ||
                            "border-[#3B575A] bg-[#1A3337] text-[#C1D1CE]"
                          }`}
                        >
                          <option
                            value="Pending"
                            className="bg-[#142A2F] text-amber-300"
                          >
                            Pending
                          </option>
                          <option
                            value="Contacted"
                            className="bg-[#142A2F] text-blue-300"
                          >
                            Contacted
                          </option>
                          <option
                            value="Resolved"
                            className="bg-[#142A2F] text-emerald-300"
                          >
                            Resolved
                          </option>
                        </select>

                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-current">
                          ▾
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {inquiries.length > 0 && (
        <div className="flex flex-col justify-between gap-2 border-t border-[#294448] bg-[#142A2F] px-5 py-4 text-xs text-[#829D99] sm:flex-row sm:items-center">
          <p>
            Showing{" "}
            <span className="font-semibold text-[#D9E6E4]">
              {inquiries.length}
            </span>{" "}
            inquiries
          </p>
          <p>Manage inquiry status using the status selector.</p>
        </div>
      )}
    </div>
  );
};

export default InquiryTable;
