'use client'
import Link from "next/link";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardProfileForm from "@/components/onboard-profile-form";
import Image from 'next/image';

export default function OnboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<ProfileShape | null>(null);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
        });

        if (response.status === 401) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          const message = body?.error || response.statusText;
          console.error('Profile bootstrap API error:', message);
          setBootstrapError(message);
          // Keep user on the onboard page instead of redirecting in a loop.
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        const body = await response.json();
        const apiProfile = body?.profile;
        if (!apiProfile) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setProfile({
          id: apiProfile.id,
          github_username: apiProfile.github_username ?? 'newuser',
          display_name: apiProfile.display_name ?? 'New User',
          bio: apiProfile.bio ?? '',
          skills: apiProfile.skills ?? '',
          role_preference: apiProfile.role_preference ?? '',
          interests: apiProfile.interests ?? '',
          avatar_url: apiProfile.avatar_url ?? '',
          is_onboarded: Boolean(apiProfile.is_onboarded),
        });
      } catch (err) {
        console.error('Profile bootstrap request failed:', err);
        setBootstrapError(err instanceof Error ? err.message : 'Unknown error');
        setIsAuthenticated(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    getSessionAndProfile();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (!loading && profile?.is_onboarded) {
      router.replace('/dashboard');
      router.refresh();
    }
  }, [loading, profile, router]);

  // Define the expected profile type
  interface ProfileShape {
    id: string;
    github_username: string;
    display_name: string;
    bio: string;
    skills: string;
    role_preference: string;
    interests: string;
    avatar_url?: string;
    is_onboarded?: boolean;
  }

  function isProfileShape(obj: unknown): obj is ProfileShape {
    if (!obj || typeof obj !== 'object') return false;
    const o = obj as Record<string, unknown>;
    return (
      typeof o.id === 'string' &&
      typeof o.github_username === 'string' &&
      typeof o.display_name === 'string' &&
      typeof o.bio === 'string' &&
      typeof o.skills === 'string' &&
      typeof o.role_preference === 'string' &&
      typeof o.interests === 'string'
    );
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>You must be logged in to onboard. Redirecting...</p>
      </div>
    );
  }
  if (bootstrapError) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-6 rounded-xl border border-red-300 bg-red-50 text-red-700">
        <p className="font-semibold mb-2">Unable to load profile</p>
        <p className="text-sm mb-4">{bootstrapError}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }
  if (!profile && !loading) return <p className="text-center mt-10 text-red-500">Profile not found or error loading profile.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-800 transition-colors">
        <h1 className="text-4xl font-extrabold mb-2 text-brand-blue tracking-tight">Welcome to funcKode Onboarding 🚀</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step-by-Step Visual Guidelines</h2>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              <span className="font-semibold">How to Fork:</span> <br />
              <span className="text-sm">Visit our <a href="https://github.com/func-Kode/site" className="text-brand-blue underline">GitHub repo</a> and click <span className="bg-gray-200 px-2 py-1 rounded">Fork</span> at the top right.</span>
            </li>
            <li>
              <span className="font-semibold">How to Contribute:</span> <br />
              <span className="text-sm">Clone your fork, create a new branch, make changes, and open a pull request. See our <a href="/CONTRIBUTING" className="text-brand-blue underline">Contributing Guide</a>.</span>
            </li>
            <li>
              <span className="font-semibold">Join Sprints:</span> <br />
              <span className="text-sm">Check the <Link href="/events" className="text-brand-blue underline">Events</Link> page for upcoming sprints and join the fun!</span>
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start Checklist</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Login to your account</li>
            <li>Star our <a href="https://github.com/func-Kode/site" className="text-brand-blue underline">GitHub repo</a></li>
            <li>Join our <a href="https://discord.gg/nnkA8xJ3JU" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline">Discord community</a> for help and discussions</li>
            <li>Introduce yourself in the <a href="/discussion" className="text-brand-blue underline">community discussion</a></li>
            <li>Join the next sprint via <Link href="/events" className="text-brand-blue underline">Events</Link></li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">How do I participate?</h3>
              <p className="text-sm">Fork the repo, make changes, and submit a pull request. Join sprints and discussions for more collaboration.</p>
            </div>
            <div>
              <h3 className="font-semibold">Troubleshooting</h3>
              <p className="text-sm">Check our <a href="/CONTRIBUTING" className="text-brand-blue underline">Contributing Guide</a> and <a href="/discussion" className="text-brand-blue underline">community discussion</a> for help. If you encounter issues, open a GitHub issue or ask in the chat.</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Information</h3>
              <p className="text-sm">Reach out via <a href="mailto:hello@funckode.com" className="text-brand-blue underline">hello@funckode.com</a> or join our <a href="https://discord.gg/nnkA8xJ3JU" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline">Discord community</a>.</p>
            </div>
          </div>
        </section>
        <h2 className="text-2xl font-bold mb-4">Set up your profile</h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400 text-lg">Complete your profile to get the best experience and connect with the community.</p>
        <div className="mb-8 flex items-center gap-4">
          <Image
            src={profile?.avatar_url || '/raccoon.png'}
            alt="Avatar"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full border-4 border-primary-500 shadow-md bg-zinc-100 dark:bg-zinc-800 object-cover"
          />
          <div>
            <div className="text-xl font-semibold text-zinc-900 dark:text-white">{profile?.display_name}</div>
            <div className="text-zinc-500 dark:text-zinc-400 text-sm">@{profile?.github_username}</div>
          </div>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 mb-6 border border-zinc-100 dark:border-zinc-700">
          {profile && isProfileShape(profile) && (
            <OnboardProfileForm initialProfile={profile} />
          )}
        </div>
        <div className="text-center text-zinc-400 text-xs mt-6">
          Your information is private and secure.
        </div>
      </div>
    </div>
  );
}
