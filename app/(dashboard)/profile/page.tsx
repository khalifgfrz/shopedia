"use client";

import ProfileCard from "@/components/profile/profile-card";
import { Profile } from "@/components/profile/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null); // Changed to hold a single profile
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        router.push(`/auth/login`);
        return;
      }

      console.log(token);

      try {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;
        const res = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {profile && <ProfileCard key={profile.userId} profile={profile} />} {/* Render ProfileCard if profile exists */}
    </div>
  );
}
