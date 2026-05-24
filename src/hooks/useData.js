import { useState, useEffect } from "react";

/**
 * Generic data-fetching hook.
 * Swap the fetcher function for real API calls when your backend is ready.
 *
 * Usage:
 *   const { data, loading, error } = useFetch(fetchServices);
 */
export const useFetch = (fetcher, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? "Something went wrong");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
};

/**
 * Contact form hook — handles state, validation, and submission.
 */
export const useContactForm = (submitFn) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return "A valid email is required.";
    if (!formData.subject.trim()) return "Subject is required.";
    if (!formData.message.trim()) return "Message is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitFn(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setErrorMsg(err.message ?? "Failed to send message. Please try again.");
      setStatus("error");
    }
  };

  const resetStatus = () => setStatus("idle");

  return { formData, handleChange, handleSubmit, status, errorMsg, resetStatus };
};
