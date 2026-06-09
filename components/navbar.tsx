"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  GitFork,
  Github,
  LayoutDashboard,
  LogOut,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANDING_ASSETS } from "@/lib/landing-assets";
import { GITHUB_REPO } from "@/lib/github-stats";

const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;
const RELEASE_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const LANDING_NAV_ITEMS: readonly NavItem[] = [
  { label: "func(kode)", href: "/#func-kode" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Teams & Platforms", href: "/#for-teams" },
  { label: "For Developers", href: "/#for-developers" },
  { label: "Contact Us", href: "/#contact-us" },
];

const APP_NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  {
    label: "Discord",
    href: "https://discord.gg/nnkA8xJ3JU",
    external: true,
  },
];

const NAV_LINK_CLASS =
  "shrink-0 whitespace-nowrap text-sm font-bold tracking-[-0.56px] text-white transition-opacity hover:opacity-80";

const NAV_LINK_MOBILE_CLASS =
  "flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-bold tracking-[-0.56px] text-white transition-colors hover:bg-white/10";

function NavLink({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export type NavbarProps = {
  forkCount?: number | null;
  variant?: "landing" | "app";
};

function getDisplayName(user: User) {
  const githubUsername =
    user.user_metadata?.user_name || user.user_metadata?.preferred_username;
  if (githubUsername) return `@${githubUsername}`;

  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  if (fullName) return fullName;

  if (user.email) return user.email.split("@")[0];

  return "User";
}

function GitHubForkButton({
  forkCount,
  className,
  onClick,
}: {
  forkCount: number | null | undefined;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`GitHub repository — ${forkCount ?? "…"} forks`}
      onClick={onClick}
    >
      <span className="flex items-center justify-center bg-white/5 px-3 py-2 text-white">
        <Github className="h-4 w-4" />
      </span>
      <span className="flex items-center gap-1.5 bg-white/10 px-3 py-2 text-sm font-bold text-white">
        <GitFork className="h-3.5 w-3.5 text-[#00C9B7]" />
        {forkCount != null ? forkCount.toLocaleString() : "—"}
      </span>
    </a>
  );
}

function UserMenuDropdown({
  user,
  profileHref,
  onLogout,
}: {
  user: User;
  profileHref: string;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="hidden h-10 min-h-[44px] max-w-[11rem] items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 text-sm font-bold text-white outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/30 sm:inline-flex"
          aria-label="Account menu"
        >
          <UserIcon className="h-4 w-4 shrink-0 text-white/70" />
          <span className="truncate">{getDisplayName(user)}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-white/60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[11rem] border-white/15 bg-[#111B34] p-1 text-white shadow-xl"
      >
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-white focus:bg-white/10 focus:text-white"
        >
          <Link href={profileHref} className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-white focus:bg-white/10 focus:text-white"
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          className="cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-white/90 focus:bg-white/10 focus:text-white"
          onSelect={() => onLogout()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar({ forkCount = null, variant = "app" }: NavbarProps) {
  const navItems = variant === "landing" ? LANDING_NAV_ITEMS : APP_NAV_ITEMS;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [needsOnboard, setNeedsOnboard] = useState(false);
  const userIdRef = useRef<string | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const profileHref = needsOnboard ? "/onboard" : "/profile";

  const handleLogout = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setNeedsOnboard(false);
    router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async (nextUser: User | null) => {
      const nextId = nextUser?.id ?? null;
      userIdRef.current = nextId;
      setUser(nextUser);

      if (!nextUser) {
        setNeedsOnboard(false);
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("is_onboarded")
        .eq("id", nextUser.id)
        .maybeSingle();

      setNeedsOnboard(!profile?.is_onboarded);
    };

    supabase.auth.getUser().then(({ data }) => loadUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      const nextId = nextUser?.id ?? null;
      if (nextId === userIdRef.current) return;
      loadUser(nextUser);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <header className="relative z-50 w-full px-5 pt-[41px] sm:px-8 lg:px-[122px]">
      <div className="relative flex min-h-10 items-center justify-between gap-3 lg:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <Link href="/" className="relative z-10 shrink-0" onClick={close}>
            <Image
              src={LANDING_ASSETS.logo}
              alt="func(kode) logo"
              width={57}
              height={51}
              className="h-10 w-auto sm:h-[51px]"
              priority
            />
          </Link>

          {RELEASE_VERSION ? (
            <span className="hidden shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-bold tracking-[-0.36px] text-white/90 sm:inline-flex">
              {RELEASE_VERSION}
            </span>
          ) : null}

          <nav
            className="hidden min-w-0 items-center gap-4 overflow-hidden xl:flex xl:gap-6 2xl:gap-8"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                className={NAV_LINK_CLASS}
              />
            ))}
          </nav>
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
          <GitHubForkButton
            forkCount={forkCount}
            className="hidden overflow-hidden rounded-full border border-white/20 sm:flex"
          />

          {user ? (
            <UserMenuDropdown
              user={user}
              profileHref={profileHref}
              onLogout={handleLogout}
            />
          ) : (
            <Link
              href="/auth/login"
              className="hidden h-10 min-h-[44px] items-center justify-center rounded-full bg-white px-5 text-sm font-bold tracking-[-0.42px] text-black transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Connect
            </Link>
          )}

          <button
            type="button"
            className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[#040710]/90 backdrop-blur-sm transition-opacity duration-200 xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={close}
      >
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col gap-1 bg-[#111B34] px-6 pb-8 pt-24 shadow-2xl transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile primary"
          onClick={(e) => e.stopPropagation()}
        >
          {RELEASE_VERSION ? (
            <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-white/50">
              {RELEASE_VERSION}
            </p>
          ) : null}

          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              className={NAV_LINK_MOBILE_CLASS}
              onClick={close}
            />
          ))}

          <GitHubForkButton
            forkCount={forkCount}
            className="mt-2 flex overflow-hidden rounded-full border border-white/20"
            onClick={close}
          />

          {user ? (
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-white/50">
                Account
              </p>
              <Link
                href={profileHref}
                className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-3 text-base font-bold text-white hover:bg-white/10"
                onClick={close}
              >
                <UserIcon className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/dashboard"
                className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-3 text-base font-bold text-white hover:bg-white/10"
                onClick={close}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                type="button"
                className="flex min-h-[44px] w-full items-center gap-2 rounded-lg px-3 py-3 text-base font-bold text-white/90 hover:bg-white/10"
                onClick={() => {
                  close();
                  handleLogout();
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="mt-4 inline-flex h-11 min-h-[44px] w-full items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black transition-opacity hover:opacity-90"
              onClick={close}
            >
              Connect
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
