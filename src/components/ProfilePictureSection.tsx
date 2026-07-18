"use client";

import { useRef } from "react";
import { Camera, X } from "lucide-react";
import type { ProfilePicture } from "./types";

interface ProfilePictureSectionProps {
  profile: ProfilePicture | null;
  hasProfileSupport: boolean;
  onUpdate: (profile: ProfilePicture | null) => void;
}

export default function ProfilePictureSection({
  profile,
  hasProfileSupport,
  onUpdate,
}: ProfilePictureSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (PNG, JPG, or GIF).");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onUpdate({
        url: base64,
        base64: base64,
      });
    };
    reader.onerror = () => {
      alert("Could not read that image. Please try another file.");
    };
    reader.readAsDataURL(file);
    // Allow selecting the same file again later
    e.target.value = "";
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onUpdate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {!hasProfileSupport && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 font-poppins">
          This template does not show a profile photo. You can still upload one, and it will appear if you switch to a photo-supported template.
        </p>
      )}

      {profile ? (
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={profile.url}
              alt="Profile"
              className="w-full h-full object-cover rounded-lg shadow-md border-2 border-slate-200"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full p-1 transition-colors"
              aria-label="Remove profile photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={openFilePicker}
            className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200 px-4 py-2 rounded-lg font-medium font-poppins transition-colors"
          >
            Change Photo
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={openFilePicker}
          className="w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-500 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <Camera className="w-8 h-8 text-slate-900 mx-auto mb-2" />
          <p className="text-slate-700 font-poppins font-medium">Upload Profile Photo</p>
          <p className="text-sm text-slate-500 font-poppins">PNG, JPG, or GIF (Max 5MB)</p>
        </button>
      )}
    </div>
  );
}
