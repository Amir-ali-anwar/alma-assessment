"use client";
import { useRouter } from "next/navigation";
import styles from "./dashbaord.module.scss";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";

import Button from "@/app/shared/Button/Button";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

import { Loader } from "@/app/shared/Loader/Loader";
export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpenSidebar, setOpenSidebar] = useState<boolean>(false);
  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };
  const getData = async () => {
    try {
      const res = await fetch("/api/leads");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleStatusUpdate = async (id: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Reached Out" }),
      });
      const result = await res.json();
      if (result.success) {
        getData(); // Refresh the table after status update
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // const logout = async () => {
  //   try {
  //     const res = await fetch("/api/logout", { method: "POST" });
  //     const json = await res.json();
  //     console.log({json})
  //     if (json.success) {
  //       router.push("/login");
  //     }
  //   } catch (err) {
  //     console.error("Logout failed:", err);
  //   }
  // };
  return (
    <section className={`${styles["dashbaord-main"]}`}>
      <div className="container">
        <div className={`${styles["dashbaord-inner"]}`}>
          <div
            className={`${styles["dashbaord-left"]}  ${
              isOpenSidebar ? styles["dashbaord-left-open"] : ""
            }`}
          >
            <div className={`${styles["dashbaord-left-inner"]}`}>
              <div className={`${styles["site--logo"]}`}>
                <Image
                  src="/images/site-logo.png"
                  width={100}
                  height={100}
                  alt="site logo"
                />
                <div
                  className={`${styles["cross-icon"]}`}
                  onClick={toggleSidebar}
                >
                  <FaTimes />
                </div>
              </div>

              <div className={`${styles["dashbaord-left-secs"]}`}>
                <ul>
                  <li>Leads</li>
                  <li>Settings</li>
                  <li>{/* <button onClick={logout}>Logout</button> */}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles["dashbaord-admin-block"]}`}>
              <span>A</span>
              <h5>Admin</h5>
            </div>
          </div>
          <div className={`${styles["dashbaord-right"]}`}>
            <div
              className={`${styles["dashbaord-right--icon"]}`}
              onClick={toggleSidebar}
            >
              <RxHamburgerMenu />
            </div>
            <div className={`${styles["dashbaord-info-sec"]}`}>
              <h4>Leads</h4>
              <div className={`${styles["dashbaord_info-search"]}`}>
                <form action="">
                  <div className={`${styles["search-input"]}`}>
                    <CiSearch />
                    <input type="text" placeholder="Search" />
                  </div>
                  <Button className={`${styles["btn-status"]}`}>Status</Button>
                </form>
              </div>
            </div>
            <div className={`${styles["dashbaord__table-sec"]}`}>
              <div className={styles["table-scroll-wrapper"]}>
                <table cellPadding={0} cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>
                        <div className={`${styles["tbl-head-set"]}`}>
                          Name <FaArrowDown />
                        </div>
                      </th>
                      <th>
                        <div className={`${styles["tbl-head-set"]}`}>
                          Submitted <FaArrowDown />
                        </div>
                      </th>
                      <th>
                        <div className={`${styles["tbl-head-set"]}`}>
                          Status <FaArrowDown />
                        </div>
                      </th>
                      <th>
                        <div className={`${styles["tbl-head-set"]}`}>
                          Country <FaArrowDown />
                        </div>
                      </th>
                      <th>
                        <div className={`${styles["tbl-head-set"]}`}>
                          Mark as Reached Out
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5}>
                          <Loader />
                        </td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td colSpan={3}>No applications found.</td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item.firstName} {item.lastName}
                          </td>
                          <td>
                            {/* {item.submittedAt} */}
                            {/* {new Date(item.submittedAt).toLocaleDateString()} */}
                            {new Date(item.submittedAt).toLocaleString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </td>
                          <td>{item?.status}</td>
                          <td>{item?.country}</td>
                          <td>
                            {item.status === "Pending" ||
                            item.status === "PENDING" ? (
                              <button
                                onClick={() => handleStatusUpdate(item._id)}
                                className={`${styles["btn-update"]}`}
                              >
                                Mark as Reached Out
                              </button>
                            ) : (
                              <span>✅ Marked as Reached Out</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                    <tr>
                      <td colSpan={5}>
                        <div className={`${styles["paginaiton-main"]}`}>
                          <a href="#">&laquo;</a>
                          <a href="#">1</a>
                          <a href="#">2</a>
                          <a href="#" className={`${styles["active"]}`}>
                            3
                          </a>
                          <a href="#">4</a>
                          <a href="#">5</a>
                          <a href="#">6</a>
                          <a href="#">&raquo;</a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
