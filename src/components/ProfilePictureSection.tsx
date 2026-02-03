"use client";

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
  if (!hasProfileSupport) {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onUpdate({
        url: base64,
        base64: base64,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onUpdate(null);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 transition-shadow hover:shadow-xl">
      <h2 className="text-xl font-bold text-slate-900 mb-4 font-montserrat flex items-center space-x-2">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Camera className="w-5 h-5 text-slate-900" />
        </div>
        <span>Profile Picture</span>
      </h2>
      
      {profile ? (
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={profile.url}
              alt="Profile"
              className="w-full h-full object-cover rounded-lg shadow-md border-2 border-slate-200"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profile-file-change"
            />
            <button
              onClick={() => (document.getElementById('profile-file-change') as HTMLInputElement)?.click()}
              className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200 px-4 py-2 rounded-lg font-medium font-poppins transition-colors"
            >
              Change Photo
            </button>
          </label>
        </div>
      ) : (
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-file-input"
          />
          <button
            onClick={() => (document.getElementById('profile-file-input') as HTMLInputElement)?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-500 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Camera className="w-8 h-8 text-slate-900 mx-auto mb-2" />
            <p className="text-slate-700 font-poppins font-medium">Upload Profile Photo</p>
            <p className="text-sm text-slate-500 font-poppins">PNG, JPG, or GIF (Max 5MB)</p>
          </button>
        </label>
      )}
    </div>
  );
}
