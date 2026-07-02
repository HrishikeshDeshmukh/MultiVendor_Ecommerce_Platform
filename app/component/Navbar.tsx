"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { IconType } from "react-icons";
import { signOut } from "next-auth/react";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { useState, useEffect, useRef } from "react";

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
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = (path: string) => router.push(path);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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

          <div ref={menuRef} className="relative">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={40}
                height={40}
                className="cursor-pointer rounded-full border border-gray-700 object-cover"
                onClick={() => setOpenMenu((prev) => !prev)}
              />
            ) : (
              <IconBtn
                Icon={AiOutlineUser}
                onClick={() => setOpenMenu((prev) => !prev)}
              />
            )}

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 top-12 w-48 rounded-xl border bg-[#6a69693c] backdrop-blur-lg shadow-lg"
                >
                  <DropDownBtn
                    Icon={AiOutlineUser}
                    label="Profile"
                    onClick={() => {
                      navigate("/profile");
                      setOpenMenu(false);
                    }}
                  />

                  <DropDownBtn
                    Icon={AiOutlineUser}
                    label="Sign In"
                    onClick={() => {
                      navigate("/login");
                      setOpenMenu(false);
                    }}
                  />

                  <DropDownBtn
                    Icon={AiOutlineUser}
                    label="Sign Out"
                    onClick={() => {
                      signOut()
                      setOpenMenu(false);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {user?.role=="user" && (<CartBtn router={router} count={5} />)}
          </div>
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
      className="transition-colors hover:text-gray-300 cursor-pointer"
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
      className="transition-transform cursor-pointer"
    >
      <Icon size={24} />
    </motion.button>
  );
}

interface DropDownBtnProps {
  Icon: IconType;
  label: string;
  onClick: () => void;
}

const DropDownBtn = ({ Icon, label, onClick }: DropDownBtnProps) => (

  <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left cursor-pointer"
    onClick={() => {
      onClick();
      close()
    }}>
    <Icon size={18} />{label}
  </button>
)

const CartBtn = ({ router, count }: { router: ReturnType<typeof useRouter>; count: number }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={() => router.push("/cart")}
      className="transition-transform cursor-pointer relative"
    >
      <AiOutlineShoppingCart size={24} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </motion.button>
  );
}