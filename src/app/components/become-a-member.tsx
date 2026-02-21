import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface BecomeMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MEMBER_TYPES = [
  { id: "promoter", label: "Promoter Member", amount: "12,00,000" },
  { id: "co-promoter", label: "Co Promoter Member", amount: "6,00,000" },
  { id: "chief-patron", label: "Chief Patron Member", amount: "2,51,000" },
  { id: "patron", label: "Patron Member", amount: "1,51,000" },
  { id: "general", label: "General Member", amount: "5,000" },
];

const CHAPTER_STATES = [
  "Maharashtra", "Gujarat", "Rajasthan", "Delhi", "Uttar Pradesh",
  "Madhya Pradesh", "Karnataka", "Tamil Nadu", "Telangana", "West Bengal",
];

const QUALIFICATIONS = [
  "Below 10th", "10th Pass", "12th Pass", "Graduate", "Post Graduate",
  "Doctorate", "Professional Degree", "Other",
];

const WORK_CATEGORIES = [
  "Business", "Service", "Professional", "Agriculture", "Industry",
  "Trade", "Self Employed", "Other",
];

const VAISH_GHATAK = [
  "Agarwal", "Gupta", "Bansal", "Garg", "Goyal", "Jindal",
  "Khandelwal", "Maheshwari", "Mittal", "Singhal", "Other",
];

export function BecomeMemberModal({ isOpen, onClose }: BecomeMemberModalProps) {
  const [memberType, setMemberType] = useState("promoter");
  const [gender, setGender] = useState("male");
  const [maritalStatus, setMaritalStatus] = useState("married");
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    chapterState: "",
    chapter: "",
    name: "",
    fathersName: "",
    qualification: "",
    workCategory: "",
    designation: "",
    firmName: "",
    spouseName: "",
    vaishGhatak: "",
    gotra: "",
    dob: "",
    dateOfMarriage: "",
    spouseDob: "",
    panCard: "",
    pinCode: "",
    place: "",
    district: "",
    state: "",
    houseNumber: "",
    buildingArea: "",
    mobileNo: "",
    phoneStd: "",
    email: "",
    referenceName: "CHARU GUPTA",
    referencePhone: "9829910090",
    photo: null as File | null,
    aadhar: null as File | null,
  });

  const contribution = MEMBER_TYPES.find((m) => m.id === memberType)?.amount || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "aadhar") => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, [field]: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to the terms.");
    console.log("Member registration submitted", { ...form, memberType, gender, maritalStatus });
    onClose();
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm transition-all bg-white";
  const labelCls = "block text-[#0F2C59] text-sm mb-1.5 font-semibold";
  const sectionHeadingCls = "text-[#0F2C59] text-base font-bold mb-4 mt-6 pb-1 border-b border-[#D4AF37]/40";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0F2C59] text-white px-6 py-4 rounded-t-2xl flex items-start justify-between z-10">
              <div>
                <h2 className="text-xl font-bold">JOIN US — Online Membership</h2>
                <p className="text-white/70 text-sm mt-0.5">Membership Benefits &nbsp;|&nbsp; IVF Membership / Donation</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors mt-0.5 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <p className="text-sm text-gray-500 mt-4 mb-4">All the <span className="text-red-500 font-semibold">*</span> marked fields are mandatory.</p>

              {/* Chapter Selection */}
              {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Chapter State <span className="text-red-500">*</span></label>
                  <select name="chapterState" value={form.chapterState} onChange={handleChange} className={inputCls} required>
                    <option value="">Select Chapter State *</option>
                    {CHAPTER_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Home Chapter <span className="text-red-500">*</span></label>
                  <select name="chapter" value={form.chapter} onChange={handleChange} className={inputCls} required>
                    <option value="">Select Chapter *</option>
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Nagpur</option>
                    <option>Nashik</option>
                  </select>
                </div>
              </div>*/}

              {/* Member Type */}
              <div className={sectionHeadingCls}>I wish to enroll myself as *</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                {MEMBER_TYPES.map((m) => (
                  <label key={m.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <input
                      type="radio"
                      name="memberType"
                      value={m.id}
                      checked={memberType === m.id}
                      onChange={() => setMemberType(m.id)}
                      className="accent-[#0F2C59]"
                    />
                    <span className="uppercase font-semibold text-xs">{m.label}</span>
                  </label>
                ))}
              </div>

              {/* Contribution */}
              <div className={sectionHeadingCls}>Contribution Details</div>
              <div>
                <label className={labelCls}>Contribution Amount (₹)</label>
                <input type="text" value={contribution} readOnly className={`${inputCls} bg-gray-50 cursor-not-allowed font-semibold`} />
              </div>

              {/* Personal Details */}
              <div className={sectionHeadingCls}>Personal Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Father's Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fathersName" value={form.fathersName} onChange={handleChange} placeholder="Father's Name *" className={inputCls} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Gender <span className="text-red-500">*</span></label>
                  <div className="flex gap-6 mt-1">
                    {["male", "female"].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input type="radio" name="gender" value={g} checked={gender === g} onChange={() => setGender(g)} className="accent-[#0F2C59]" />
                        <span className="capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Marital Status <span className="text-red-500">*</span></label>
                  <div className="flex gap-4 mt-1 flex-wrap">
                    {["married", "unmarried", "prefer not to say"].map((s) => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input type="radio" name="maritalStatus" value={s} checked={maritalStatus === s} onChange={() => setMaritalStatus(s)} className="accent-[#0F2C59]" />
                        <span className="capitalize">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Qualification / Education</label>
                  <select name="qualification" value={form.qualification} onChange={handleChange} className={inputCls}>
                    <option value="">Select Qualification / Education</option>
                    {QUALIFICATIONS.map((q) => <option key={q}>{q}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Work Category</label>
                  <select name="workCategory" value={form.workCategory} onChange={handleChange} className={inputCls}>
                    <option value="">Select Work Category</option>
                    {WORK_CATEGORIES.map((w) => <option key={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Designation</label>
                  <input type="text" name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Firm / Company Name</label>
                  <input type="text" name="firmName" value={form.firmName} onChange={handleChange} placeholder="Firm/Company Name" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Name of Husband/Wife (Spouse) <span className="text-red-500">*</span></label>
                  <input type="text" name="spouseName" value={form.spouseName} onChange={handleChange} placeholder="Name of Husband/Wife (Spouse)*" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Vaish Ghatak</label>
                  <select name="vaishGhatak" value={form.vaishGhatak} onChange={handleChange} className={inputCls}>
                    <option value="">Select Vaish Ghatak</option>
                    {VAISH_GHATAK.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Gotra</label>
                  <input type="text" name="gotra" value={form.gotra} onChange={handleChange} placeholder="Gotra" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Date Of Birth <span className="text-red-500">*</span></label>
                  <input type="text" name="dob" value={form.dob} onChange={handleChange} placeholder="DD/MM/YYYY *" className={inputCls} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Date Of Marriage</label>
                  <input type="text" name="dateOfMarriage" value={form.dateOfMarriage} onChange={handleChange} placeholder="DD/MM/YYYY *" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Spouse Date of Birth</label>
                  <input type="text" name="spouseDob" value={form.spouseDob} onChange={handleChange} placeholder="DD/MM/YYYY *" className={inputCls} />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelCls}>PAN Card</label>
                <input type="text" name="panCard" value={form.panCard} onChange={handleChange} placeholder="Enter PAN Card to get 80G certificate *" className={inputCls} />
              </div>

              {/* Address */}
              <div className={sectionHeadingCls}>Address</div>
              <div className="mb-4">
                <input type="text" value="INDIA" readOnly className={`${inputCls} bg-gray-50 cursor-not-allowed font-semibold`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Pin Code <span className="text-red-500">*</span></label>
                  <input type="text" name="pinCode" value={form.pinCode} onChange={handleChange} placeholder="Pin Code *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Place <span className="text-red-500">*</span></label>
                  <input type="text" name="place" value={form.place} onChange={handleChange} placeholder="Place *" className={inputCls} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>District <span className="text-red-500">*</span></label>
                  <input type="text" name="district" value={form.district} onChange={handleChange} placeholder="District *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>State <span className="text-red-500">*</span></label>
                  <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State *" className={inputCls} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>House Number <span className="text-red-500">*</span></label>
                  <input type="text" name="houseNumber" value={form.houseNumber} onChange={handleChange} placeholder="House Number *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Building Name / Lane / Road / Area <span className="text-red-500">*</span></label>
                  <input type="text" name="buildingArea" value={form.buildingArea} onChange={handleChange} placeholder="Building Name / Lane / Road / Area*" className={inputCls} required />
                </div>
              </div>

              {/* Contact Details */}
              <div className={sectionHeadingCls}>Contact Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Mobile No <span className="text-red-500">*</span></label>
                  <input type="tel" name="mobileNo" value={form.mobileNo} onChange={handleChange} placeholder="Mobile No *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Phone No with STD Code</label>
                  <input type="tel" name="phoneStd" value={form.phoneStd} onChange={handleChange} placeholder="Phone No with STD Code" className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelCls}>E-mail ID</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="E-mail ID" className={inputCls} />
              </div>

             

              {/* Attachments */}
              <div className={sectionHeadingCls}>Attachment</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Upload Your Photo <span className="text-red-500">*</span></label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "photo")} className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0F2C59] file:text-white hover:file:bg-[#082040] cursor-pointer" />
                </div>
                <div>
                  <label className={labelCls}>Upload Your Aadhar Card <span className="text-red-500">*</span></label>
                  <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, "aadhar")} className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0F2C59] file:text-white hover:file:bg-[#082040] cursor-pointer" />
                </div>
              </div>

              {/* Agreement */}
              <div className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-[#0F2C59] w-4 h-4 flex-shrink-0"
                />
                <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer">
                  I agree to be abide with the rules and objects of the mahasammelan and assure you my full and sincere co-operation in achieving the goal set out by the Federation
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-6 w-full py-3 bg-[#D4AF37] text-[#0F2C59] rounded-xl font-bold text-sm hover:bg-[#E5C158] transition-colors shadow-lg hover:shadow-xl tracking-wide uppercase"
              >
                Register Yourself
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}