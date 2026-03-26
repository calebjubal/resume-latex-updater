"use client";

import type { ContactInfo } from "@/lib/default-resume";

interface Props {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

const fields: { key: keyof ContactInfo; label: string; placeholder: string }[] =
  [
    { key: "name", label: "Full Name", placeholder: "John Doe" },
    { key: "title", label: "Title", placeholder: "Senior Engineer" },
    { key: "email", label: "Email", placeholder: "john@example.com" },
    { key: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
    { key: "location", label: "Location", placeholder: "San Francisco, CA" },
    {
      key: "linkedin",
      label: "LinkedIn",
      placeholder: "linkedin.com/in/johndoe",
    },
    { key: "github", label: "GitHub", placeholder: "github.com/johndoe" },
    { key: "website", label: "Website", placeholder: "johndoe.dev" },
  ];

export default function Contact({ data, onChange }: Props) {
  const handleChange = (key: keyof ContactInfo, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-3">
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label
            htmlFor={`contact-${key}`}
            className="mb-1 block text-xs font-medium text-muted-foreground"
          >
            {label}
          </label>
          <input
            id={`contact-${key}`}
            type="text"
            value={data[key] ?? ""}
            placeholder={placeholder}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      ))}
    </div>
  );
}