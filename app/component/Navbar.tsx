"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { IconType } from "react-icons";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlinePhone,
} from "react-icons/ai";
import {useState} from "react"

import logo from "@/public/logo.png";

interface NavbarUser {
  name?: string;
  image?: string;
  role: "user" | "vendor" | "admin";
  phone?: string;
}

interface NavbarProps {
  user: NavbarUser;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false)

  const navigate = (path: string) => router.push(path);

  return (
    <nav
      className="
        fixed top-0 left-0 z-50
        h-20 w-full
        bg-black text-white
        shadow-lg
      "
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-2"
        >
          <Image
            src={logo}
            alt="Vendora Logo"
            width={40}
            height={40}
            priority
          />

          <span className="-ml-2 hidden text-2xl md:block">
            endora
          </span>
        </div>

        {/* Desktop Navigation */}
        {user.role === "user" && (
          <div className="hidden items-center gap-8 md:flex">
            <NavItem
              label="Home"
              onClick={() => navigate("/")}
            />
            <NavItem
              label="Categories"
              onClick={() => navigate("/category")}
            />
            <NavItem
              label="Shop"
              onClick={() => navigate("/shop")}
            />
            <NavItem
              label="Orders"
              onClick={() => navigate("/orders")}
            />
          </div>
        )}

        {/* Desktop Actions */}
        <div className="hidden items-center gap-6 md:flex">
          {user.role === "user" && (
            <IconBtn
              Icon={AiOutlineSearch}
              onClick={() => navigate("/category")}
            />
          )}

          <IconBtn
            Icon={AiOutlinePhone}
            onClick={() => navigate("/support")}
          />

          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="
                cursor-pointer rounded-full
                border border-gray-700
                object-cover
              "
              onClick={() => setOpenMenu(!openMenu)}
            />
          ) : (
            <IconBtn
              Icon={AiOutlineUser}
              onClick={() => navigate("/profile")}
            />
          )}

          <AnimatePresence>
           {openMenu && <motion.div className ="absolute right-0 mt-3 w-48
           backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c]">

            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  label: string;
  onClick: () => void;
}

function NavItem({ label, onClick }: NavItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="transition-colors hover:text-gray-300"
    >
      {label}
    </motion.button>
  );
}

interface IconBtnProps {
  Icon: IconType;
  onClick: () => void;
}

function IconBtn({ Icon, onClick }: IconBtnProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className="transition-transform"
    >
      <Icon size={24} />
    </motion.button>
  );
}