import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitInquiry } from "../../services/inquiryService";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  user_type: "",
  category: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-[#3B575A] bg-[#102328] px-4 py-3.5 text-sm text-[#E7F0EF] placeholder:text-[#78908E] outline-none transition focus:border-[#55C7AE] focus:ring-2 focus:ring-[#55C7AE]/15";

const InquiryForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await submitInquiry(formData);
      setSuccess(
        response.message || "Your inquiry has been submitted successfully!",
      );
      setFormData(initialFormData);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#D9E6E4]"
          >
            Full Name <span className="text-[#70D6C7]">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#D9E6E4]"
          >
            Email Address <span className="text-[#70D6C7]">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-[#D9E6E4]"
          >
            Phone Number <span className="text-[#70D6C7]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="user_type"
            className="mb-2 block text-sm font-medium text-[#D9E6E4]"
          >
            I am a <span className="text-[#70D6C7]">*</span>
          </label>
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select user type</option>
            <option value="Parent">Parent</option>
            <option value="Student">Student</option>
            <option value="School">School</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-[#D9E6E4]"
        >
          Inquiry Category <span className="text-[#70D6C7]">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="">Choose a category</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Concert">Concert</option>
          <option value="Admission">Admission</option>
          <option value="General Query">General Query</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-[#D9E6E4]"
        >
          Your Message <span className="text-[#70D6C7]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          rows={5}
          required
          className={`${inputClass} resize-y`}
        />
      </div>

      {success && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300"
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          {success}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#087F78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#087F78]/20 transition hover:bg-[#09968C] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Inquiry"}
        {!loading && <ArrowRight size={18} />}
      </button>

      <p className="text-center text-xs text-[#829B99]">
        Your information will only be used to respond to your inquiry.
      </p>
    </form>
  );
};

export default InquiryForm;
