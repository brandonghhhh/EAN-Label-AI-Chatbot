import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { label: "Name", type: "text", name: "name" },
  { label: "Email", type: "email", name: "email" },
  {
    label: "Product Type",
    type: "select",
    name: "productType",
    options: [
      "Zip lock pouch",
      "Roll form sachet",
      "3 side seal",
      "spout pouch",
      "cup seal",
      "vacuum bag",
    ],
  },
  {
    label: "Material",
    type: "select",
    name: "material",
    options: [
      "Metallised pet film",
      "Aluminium film",
      "Transparent Pet Film",
      "Nylon(for vacuum)",
    ],
  },
  {
    label: "Coating",
    type: "select",
    name: "coating",
    options: ["Gloss laminate", "Matte Laminate"],
  },
  {
    label: "Other Finishing",
    type: "select",
    name: "otherFinishing",
    options: ["N/A", "Spot UV"],
  },
  { label: "Company Name", type: "text", name: "company" },
  { label: "Phone Number", type: "tel", name: "phone" },
  { label: "Remark", type: "textarea", name: "remark" },
];

export default function EANFormLanding() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const current = steps[step];

  const handleChange = (e) => {
    setFormData({ ...formData, [current.name]: e.target.value });
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Replace with actual API call
    // alert("Form submitted: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <img
            src="https://eanlabel.com.my/eanflexi/wp-content/themes/ean/images/logo.png"
            alt="EAN Label Logo"
            className="mx-auto mb-4 w-24 h-24 object-contain"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e2a39] mb-2">Tell Us Your Ideas, We Can Print!</h1>
          <p className="text-[#1e2a39] text-lg font-medium">Get a fast, free quote for flexible packaging</p>
        </motion.div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <svg className="w-16 h-16 text-[#d4af37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <h2 className="text-2xl font-bold text-[#1e2a39] mb-2">Thank you!</h2>
                <p className="text-[#1e2a39] text-lg mb-4 text-center">Your inquiry has been submitted. We'll get in touch soon.</p>
              </motion.div>
            ) : step < steps.length ? (
              <motion.form
                key={current.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onSubmit={(e) => { e.preventDefault(); next(); }}
                className="flex flex-col gap-4"
              >
                <label className="block text-[#1e2a39] text-lg font-semibold mb-1">
                  {current.label}
                </label>
                {current.type === "select" ? (
                  <select
                    value={formData[current.name] || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                    required
                  >
                    <option value="">Select...</option>
                    {current.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : current.type === "textarea" ? (
                  <textarea
                    rows={4}
                    value={formData[current.name] || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                    placeholder={`Enter your ${current.label.toLowerCase()}...`}
                    required
                  />
                ) : (
                  <input
                    type={current.type}
                    value={formData[current.name] || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                    placeholder={`Enter your ${current.label.toLowerCase()}`}
                    required
                  />
                )}
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={step === 0}
                    className={`px-6 py-2 rounded-lg font-medium transition ${step === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#1e2a39] text-white hover:bg-[#2f3a4d]'}`}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!formData[current.name]}
                    className={`px-6 py-2 rounded-lg font-medium transition bg-[#d4af37] text-white hover:bg-yellow-500 ${!formData[current.name] ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    Next
                  </button>
                </div>
                <div className="text-sm text-gray-400 text-right mt-2">{step + 1} / {steps.length}</div>
              </motion.form>
            ) : (
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-[#1e2a39] mb-4 text-center">Review Your Information</h2>
                <div className="bg-[#f4f4f4] rounded-xl p-4 mb-4">
                  <ul className="space-y-2 text-[#1e2a39]">
                    {steps.map((s) => (
                      <li key={s.name} className="flex justify-between">
                        <span className="font-semibold">{s.label}:</span>
                        <span className="ml-2 text-right break-words max-w-[60%]">{formData[s.name]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full mt-4 px-6 py-3 rounded-lg text-white font-medium bg-[#1e2a39] hover:bg-[#2f3a4d] transition text-lg"
                >
                  Submit Inquiry
                </button>
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-full mt-2 px-6 py-2 rounded-lg text-[#1e2a39] font-medium bg-gray-100 hover:bg-gray-200 transition"
                >
                  Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} EAN Label Industry Sdn. Bhd. All rights reserved.
        </div>
      </div>
    </div>
  );
} 