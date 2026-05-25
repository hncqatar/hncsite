import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const initial = {
  name: "",
  mobile: "",
  email: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send message");
      }

      setStatus("Message sent successfully.");
      setForm(initial);
    } catch (error) {
      console.error(error);
      setStatus("Message sending failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container-hnc grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="glass-card rounded-[2rem] p-8">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-brand-red">
            Contact
          </p>

          <h2 className="text-4xl font-black">
            Get in touch with HOTNCOOL
          </h2>

          <p className="mt-4 text-white/60">
            For enquiries, feedback, branch support and partnership requests.
          </p>

          <div className="mt-8 space-y-5">
            <p className="flex gap-3 text-white/70">
              <MapPin className="text-brand-red" />
              Furousiya Street, Al Rayyan, Doha, Qatar
            </p>

            <p className="flex gap-3 text-white/70">
              <Phone className="text-brand-red" />
              +974 44502029 / +974 30838006
            </p>

            <p className="flex gap-3 text-white/70">
              <Mail className="text-brand-red" />
              info@hnccafe.com
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="glass-card rounded-[2rem] p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={update}
              required
              placeholder="Your Name"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-brand-red"
            />

            <input
              name="mobile"
              value={form.mobile}
              onChange={update}
              required
              placeholder="Mobile Number"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-brand-red"
            />
          </div>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            required
            placeholder="Email Address"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-brand-red"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={update}
            required
            rows="6"
            placeholder="Message / Feedback"
            className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-brand-red"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-hnc mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send size={16} />
          </button>

          {status && (
            <p className="mt-4 text-center text-sm font-bold text-brand-gold">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}