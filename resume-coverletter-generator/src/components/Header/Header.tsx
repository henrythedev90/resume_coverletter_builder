"use client";
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import classes from "./Header.module.css";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const headerFunc = () => {
      if (headerRef.current) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        headerRef.current.classList.toggle(
          classes.header_shrink,
          scrollTop > 5
        );
      }
    };
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle(`${classes.menu_active}`);
    }
  };

  const handleLogout = async () => {
    try {
      const { signOut } = await import("next-auth/react");
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return session ? (
    <header className={classes.header} ref={headerRef}>
      <div className={classes.nav_wrapper}>
        <div className={classes.logo}>
          <Link href="/dashboard">
            <h1>
              <span>R</span>esume & Cover Letter
              <span>Generator</span>
            </h1>
          </Link>
        </div>
        <div
          className={`${classes.navigation}`}
          onClick={toggleMenu}
          ref={menuRef}
        >
          <div className={classes.nav_menu}>
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
            <div className={`${classes.mobile_logo}`}>
              <Link href="/dashboard">
                <h1 className={classes.mobile_logo_title}>
                  <span>R</span>esume & Cover Letter
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  ) : null;
};

export default Header;
