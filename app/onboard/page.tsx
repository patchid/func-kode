'use client'
import Link from "next/link";

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import OnboardProfileForm from "@/components/onboard-profile-form";
import Image from 'next/image';

export default function OnboardPage() {
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileShape | null>(null);

  useEffect(() => {
    // Listen for auth state changes to restore session
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });

    const getSessionAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        setSession(null);
        return;
      }
      setSession({ user } as Session);

      type DBProfile = {
        id: string;
        github_username?: string | null;
        display_name?: string | null;
        bio?: string | null;
        skills?: string | null;
        role_preference?: string | null;
        interests?: string | null;
        avatar_url?: string | null;
        is_onboarded?: boolean | null;
      } | null;

      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle<DBProfile>();

      const github_username = user.user_metadata?.user_name || user.user_metadata?.preferred_username || 'newuser';
      const avatar_url = user.user_metadata?.avatar_url || '';
      const display_name = user.user_metadata?.name || github_username || 'New User';

      const fallbackProfile: ProfileShape = {
        id: user.id,
        github_username,
        display_name,
        bio: (userProfile?.bio as string) || '',
        skills: (userProfile?.skills as string) || '',
        role_preference: (userProfile?.role_preference as string) || '',
        interests: (userProfile?.interests as string) || '',
        avatar_url,
      };

      if (!userProfile) {
        await supabase.from('users').insert([{ ...fallbackProfile, is_onboarded: false }]);
        setProfile(fallbackProfile);
      } else {
        await supabase.from('users').update({ ...fallbackProfile }).eq('id', user.id);
        setProfile({ ...fallbackProfile });
      }

      setLoading(false);
    };
    getSessionAndProfile();
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth/login');
    }
  }, [loading, session, router]);

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
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>You must be logged in to onboard. Redirecting...</p>
      </div>
    );
  }
  if (!profile && !loading) return <p className="text-center mt-10 text-red-500">Profile not found or error loading profile. Check your Supabase users table and triggers.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700 transition-colors">
        <h1 className="text-3xl font-bold mb-2 text-brand-blue dark:text-white tracking-tight">Welcome to funcKode Onboarding 🚀</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step-by-Step Visual Guidelines</h2>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              <span className="font-semibold">How to Fork:</span> <br />
              <span>Visit our <a href="https://github.com/func-Kode/site" className="text-brand-blue dark:text-brand-green underline">GitHub repo</a> and click <span className="bg-gray-200 dark:bg-zinc-700 dark:text-white px-2 py-1 rounded">Fork</span> at the top right.</span>
            </li>
            <li>
              <span className="font-semibold">How to Contribute:</span> <br />
              <span>Clone your fork, create a new branch, make changes, and open a pull request. See our <a href="/CONTRIBUTING" className="text-brand-blue dark:text-brand-green underline">Contributing Guide</a>.</span>
            </li>
            <li>
              <span className="font-semibold">Join Sprints:</span> <br />
              <span>Check the <Link href="/events" className="text-brand-blue dark:text-brand-green underline">Events</Link> page for upcoming sprints and join the fun!</span>
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start Checklist</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Login to your account</li>
            <li>Star our <a href="https://github.com/func-Kode/site" className="text-brand-blue dark:text-brand-green underline">GitHub repo</a></li>
            <li>Join our <a href="https://discord.gg/nnkA8xJ3JU" target="_blank" rel="noopener noreferrer" className="text-brand-blue dark:text-brand-green underline">Discord community</a> for help and discussions</li>
            <li>Introduce yourself in the <a href="/discussion" className="text-brand-blue dark:text-brand-green underline">community discussion</a></li>
            <li>Join the next sprint via <Link href="/events" className="text-brand-blue dark:text-brand-green underline">Events</Link></li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">How do I participate?</h3>
              <p>Fork the repo, make changes, and submit a pull request. Join sprints and discussions for more collaboration.</p>
            </div>
            <div>
              <h3 className="font-semibold">Troubleshooting</h3>
              <p>Check our <a href="/CONTRIBUTING" className="text-brand-blue dark:text-brand-green underline">Contributing Guide</a> and <a href="/discussion" className="text-brand-blue dark:text-brand-green underline">community discussion</a> for help. If you encounter issues, open a GitHub issue or ask in the chat.</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Information</h3>
              <p>Reach out via <a href="mailto:hello@funckode.com" className="text-brand-blue dark:text-brand-green underline">hello@funckode.com</a> or join our <a href="https://discord.gg/nnkA8xJ3JU" target="_blank" rel="noopener noreferrer" className="text-brand-blue dark:text-brand-green underline">Discord community</a>.</p>
            </div>
          </div>
        </section>
        <h2 className="text-2xl font-bold mb-4">Set up your profile</h2>
        <p className="mb-6 text-muted-foreground text-lg">Complete your profile to get the best experience and connect with the community.</p>
        <div className="mb-8 flex items-center gap-4">
          <Image
            src={profile?.avatar_url || '/landing/logo.png'}
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
        <div className="text-center text-muted-foreground text-sm mt-6">
          Your information is private and secure.
        </div>
      </div>
    </div>
  );
}
