import React from "react";
import { Profile } from "./types";
import Image from "next/image";

function ProfileCard({ profile }: { profile: Profile }) {
  const imageSrc = profile.image || "";
  return (
    <div className="border border-solid border-darkgray2 p-2 tbt:h-1/2 tbt:mr-4 tbt:w-1/2 md:w-2/5 lg:w-1/4 2xl:w-1/5">
      <div>
        <p className="text-center text-sm">{profile.username || "unknown"}</p>
        <p className="text-center text-sm mb-2">{profile.email || "email"}</p>
        <div className="grid place-items-center mb-2 w-full h-25">
          <Image className="rounded-full" width="100" height="100" src={imageSrc} alt={profile.username ?? "profile"} />
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* <button onClick={handleButtonClick} className="mb-2 text-lightblack text-sm bg-primary hover:bg-darkprimary active:bg-darkprimary2 rounded-lg w-1/2 tbt:w-3/4 h-11">
          Upload New Photo
        </button> */}
        {/* <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" /> */}
      </div>
      {/* <p className="text-center text-sm">Since {formattedDate}</p> */}
    </div>
  );
}

export default ProfileCard;
