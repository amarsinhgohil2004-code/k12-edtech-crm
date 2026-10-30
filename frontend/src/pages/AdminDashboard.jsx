import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  GraduationCap,
  Users,
  School,
  LogOut,
  Search,
  Filter,
  Clock3,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import InquiryAnalytics from "../components/dashboard/InquiryAnalytics";
import { useAuth } from "../context/AuthContext";
import {
  getAllInquiries,
  updateInquiryStatus,
} from "../services/inquiryService";
import InquiryTable from "../components/dashboard/InquiryTable";

const AdminDashboard = () => {
  const { admin, token, logout } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    user_type: "",
    search: "",
  });

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);

        const response = await getAllInquiries(filters, token);

        setInquiries(response.data || []);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load inquiries.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [token, filters]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status, token);

      setInquiries((previous) =>
        previous.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status } : inquiry,
        ),
      );

      setSuccess("Inquiry status updated successfully.");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const stats = [
    {
      title: "Total Inquiries",
      value: inquiries.length,
      icon: Inbox,
      color: "text-[#70D6C7]",
      bg: "bg-[#70D6C7]/10",
      border: "border-[#70D6C7]/20",
    },
    {
      title: "Pending",
      value: inquiries.filter((item) => item.status === "Pending").length,
      icon: Clock3,
      color: "text-[#F5B95F]",
      bg: "bg-[#F5B95F]/10",
      border: "border-[#F5B95F]/20",
    },
    {
      title: "Contacted",
      value: inquiries.filter((item) => item.status === "Contacted").length,
      icon: PhoneCall,
      color: "text-[#78B8F5]",
      bg: "bg-[#78B8F5]/10",
      border: "border-[#78B8F5]/20",
    },
    {
      title: "Resolved",
      value: inquiries.filter((item) => item.status === "Resolved").length,
      icon: CheckCircle2,
      color: "text-[#75D6A1]",
      bg: "bg-[#75D6A1]/10",
      border: "border-[#75D6A1]/20",
    },
  ];

  const pendingCount = inquiries.filter(
    (item) => item.status === "Pending",
  ).length;

  const contactedCount = inquiries.filter(
    (item) => item.status === "Contacted",
  ).length;

  const resolvedCount = inquiries.filter(
    (item) => item.status === "Resolved",
  ).length;

  const total = inquiries.length || 1;

  const statusOverview = [
    {
      label: "Pending",
      count: pendingCount,
      color: "bg-[#F5B95F]",
      width: `${(pendingCount / total) * 100}%`,
    },
    {
      label: "Contacted",
      count: contactedCount,
      color: "bg-[#78B8F5]",
      width: `${(contactedCount / total) * 100}%`,
    },
    {
      label: "Resolved",
      count: resolvedCount,
      color: "bg-[#75D6A1]",
      width: `${(resolvedCount / total) * 100}%`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B171B] text-[#E7F0EF]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[#294448] bg-[#10272D] lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-[#294448] px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087F78]">
            <GraduationCap size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              K12 <span className="text-[#70D6C7]">Hunar</span>
            </h1>
            <p className="text-[9px] tracking-[2px] text-[#91AAA7]">
              ADMINISTRATION
            </p>
          </div>
        </div>

        <div className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-[10px] font-bold tracking-[2px] text-[#718D8A]">
            WORKSPACE
          </p>

          <nav className="space-y-2">
            <a
              href="#dashboard"
              className="flex items-center gap-3 rounded-xl border border-[#287B70]/30 bg-[#087F78]/15 px-4 py-3 text-sm font-semibold text-[#70D6C7]"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="#inquiries"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#A5BCB9] transition hover:bg-[#1B393D] hover:text-white"
            >
              <Inbox size={19} />
              All Inquiries
            </a>
          </nav>

          <p className="mb-4 mt-10 px-3 text-[10px] font-bold tracking-[2px] text-[#718D8A]">
            USER GROUPS
          </p>

          <div className="space-y-4 px-4 text-sm text-[#A5BCB9]">
            <div className="flex items-center gap-3">
              <Users size={17} />
              Parents
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap size={17} />
              Students
            </div>
            <div className="flex items-center gap-3">
              <School size={17} />
              Schools
            </div>
          </div>
        </div>

        <div className="border-t border-[#294448] p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#19363A] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#087F78] text-sm font-bold text-white">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {admin?.name || "Admin"}
              </p>
              <p className="text-xs text-[#8CA5A2]">Administrator</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#D99A9A] transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main id="dashboard" className="min-h-screen lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-[#294448] bg-[#102328]/95 backdrop-blur-xl">
          <div className="flex min-h-20 items-center justify-between gap-4 px-5 py-4 md:px-8">
            <div>
              <p className="text-xs text-[#829D99]">K12 Hunar / Workspace</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Dashboard Overview
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">
                  {admin?.name || "Admin"}
                </p>
                <p className="text-xs text-[#829D99]">Administrator</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#39766C] bg-[#17413D] font-semibold text-[#70D6C7]">
                {admin?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <button
                onClick={logout}
                title="Sign out"
                className="rounded-xl border border-[#3B575A] p-2.5 text-[#A5BCB9] transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 lg:hidden"
              >
                <LogOut size={19} />
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-8 p-5 md:p-8">
          {/* Welcome Section */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-[#70D6C7]">
                MANAGEMENT CENTER
              </p>

              <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
                Welcome back, {admin?.name || "Admin"}
              </h1>

              <p className="mt-2 text-sm text-[#91AAA7]">
                Monitor and manage all incoming inquiries from one place.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#91AAA7]">
              <ShieldCheck size={16} className="text-[#70D6C7]" />
              Secure admin workspace
            </div>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`rounded-2xl border ${stat.border} bg-[#142A2F] p-5 transition hover:-translate-y-1 hover:bg-[#193338]`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                    >
                      <Icon size={22} className={stat.color} />
                    </div>

                    <ArrowUpRight size={18} className="text-[#65817D]" />
                  </div>

                  <p className="mt-5 text-sm text-[#9AB1AE]">{stat.title}</p>

                  <h3
                    className={`mt-1 text-3xl font-semibold tracking-tight ${stat.color}`}
                  >
                    {stat.value}
                  </h3>
                </div>
              );
            })}
          </section>

          {/* Status Overview */}
          {/* Inquiry Analytics */}
          <InquiryAnalytics inquiries={inquiries} />

          {/* Inquiry Management */}
          <section
            id="inquiries"
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#294448] bg-[#142A2F]"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-[#294448] p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold">Inquiry Management</h3>
                <p className="mt-1 text-xs text-[#8FA9A6]">
                  Review, search and manage incoming inquiries
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[#3B575A] bg-[#102328] px-3 py-2 text-xs text-[#A8BFBB]">
                <Inbox size={16} className="text-[#70D6C7]" />
                {inquiries.length} Records
              </div>
            </div>

            {/* Filters */}
            <div className="grid gap-4 border-b border-[#294448] p-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-[#A8BFBB]">
                  Search inquiries
                </label>

                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#789B96]"
                  />

                  <input
                    type="text"
                    name="search"
                    placeholder="Search name or phone..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="w-full rounded-xl border border-[#3B575A] bg-[#102328] py-3 pl-10 pr-4 text-sm text-[#E7F0EF] outline-none placeholder:text-[#78908E] focus:border-[#55C7AE]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-[#A8BFBB]">
                  Category
                </label>

                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#789B96]"
                  />

                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full appearance-none rounded-xl border border-[#3B575A] bg-[#102328] py-3 pl-10 pr-4 text-sm text-[#D9E6E4] outline-none focus:border-[#55C7AE]"
                  >
                    <option value="">All Categories</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Concert">Concert</option>
                    <option value="Admission">Admission</option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-[#A8BFBB]">
                  User Type
                </label>

                <div className="relative">
                  <Users
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#789B96]"
                  />

                  <select
                    name="user_type"
                    value={filters.user_type}
                    onChange={handleFilterChange}
                    className="w-full appearance-none rounded-xl border border-[#3B575A] bg-[#102328] py-3 pl-10 pr-4 text-sm text-[#D9E6E4] outline-none focus:border-[#55C7AE]"
                  >
                    <option value="">All User Types</option>
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                    <option value="School">School</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Feedback */}
            {success && (
              <div className="mx-6 mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <CheckCircle2 size={17} />
                {success}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-[#91AAA7]">
                <RefreshCw size={25} className="animate-spin text-[#70D6C7]" />
                <p className="text-sm">Loading inquiries...</p>
              </div>
            ) : error ? (
              <div className="py-16 text-center">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            ) : (
              <div className="p-6">
                <InquiryTable
                  inquiries={inquiries}
                  onStatusChange={handleStatusChange}
                />
              </div>
            )}
          </section>

          <footer className="pb-4 text-center text-xs text-[#66817D]">
            K12 Hunar Admin Portal · Secure Management Workspace
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
