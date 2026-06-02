"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaRegUser } from "react-icons/fa";
import { GrUserAdmin, GrNext } from "react-icons/gr";
import { IoStorefrontSharp } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";

const ROLES = [
  {
    label: "User",
    value: "user",
    icon: <FaRegUser size={30} />,
  },
  {
    label: "Vendor",
    value: "vendor",
    icon: <IoStorefrontSharp size={30} />,
  },
  {
    label: "Admin",
    value: "admin",
    icon: <GrUserAdmin size={30} />,
  },
];

function EditRoleandPhone() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const [adminExist, setAdminExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/admin/check-admin");

        if (res.data?.exists) {
          setAdminExist(true);
        }
      } catch (error) {
        console.error("Admin check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!role) {
      alert("Please select a role.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        "/api/user/edit-role-phone",
        {
          phone,
          role,
        }
      );

      console.log(res.data);

      alert("Profile updated successfully!");

      // Example redirect
      router.push("/home");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Something went wrong."
        );
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-900
      via-black
      to-gray-900
      text-white
      p-6
    "
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="
            w-full
            max-w-lg
            bg-white/10
            backdrop-blur-md
            rounded-3xl
            border
            border-white/20
            shadow-2xl
            p-8
            text-center
          "
        >
          <h1 className="text-4xl font-bold mb-3">
            Choose Your{" "}
            <span className="text-yellow-300">
              Role
            </span>
          </h1>

          <p className="text-blue-300 mb-8">
            Select your role and enter your mobile
            number to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={phone}
              maxLength={10}
              required
              onChange={(e) =>
                setPhone(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10)
                )
              }
              className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <div className="grid grid-cols-3 gap-4">
              {ROLES.map((item) => {
                const isAdminBlocked =
                  item.value === "admin" &&
                  adminExist;

                return (
                  <motion.button
                    key={item.value}
                    type="button"
                    whileHover={
                      !isAdminBlocked
                        ? { scale: 1.03 }
                        : {}
                    }
                    whileTap={
                      !isAdminBlocked
                        ? { scale: 0.95 }
                        : {}
                    }
                    onClick={() => {
                      if (isAdminBlocked) {
                        alert(
                          "Admin already exists."
                        );
                        return;
                      }

                      setRole(item.value);
                    }}
                    className={`
                      p-4
                      rounded-xl
                      border
                      transition-all
                      duration-300
                      flex
                      flex-col
                      items-center
                      gap-3
                      shadow-lg

                      ${
                        role === item.value
                          ? "bg-white/30 border-blue-500"
                          : "bg-white/10 border-white/20"
                      }

                      ${
                        isAdminBlocked
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer hover:bg-white/20"
                      }
                    `}
                  >
                    <div className="text-yellow-300">
                      {item.icon}
                    </div>

                    <span className="font-medium">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={
                !submitting
                  ? { scale: 1.03 }
                  : {}
              }
              whileTap={
                !submitting
                  ? { scale: 0.95 }
                  : {}
              }
              className="
                mx-auto
                px-8
                py-3
                rounded-xl
                bg-blue-500
                hover:bg-blue-600
                font-medium
                flex
                items-center
                justify-center
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {submitting ? (
                "Saving..."
              ) : (
                <>
                  Next
                  <GrNext className="ml-2" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EditRoleandPhone;