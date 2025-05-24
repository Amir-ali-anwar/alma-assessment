"use client";
import { useRouter } from "next/navigation";
import styles from "./dashbaord.module.scss";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import Button from "@/app/shared/Button/Button";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { Loader } from "@/app/shared/Loader/Loader";
export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(data);
  useEffect(() => {
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

    getData();
  }, []);
  const handleStatusUpdate = async (id: string) => {
  await fetch(`/api/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'Reached Out' }),
    headers: { 'Content-Type': 'application/json' },
  });
  // Refresh UI or update local state
};

  const logout = () => {
    document.cookie = "token=; max-age=0; path=/"; // clear cookie
    router.push("/login");
  };
  return (
    <section className={`${styles["dashbaord-main"]}`}>
      <div className="container">
        <div className={`${styles["dashbaord-inner"]}`}>
          <div className={`${styles["dashbaord-left"]}`}>
            <div className={`${styles["dashbaord-left-inner"]}`}>
              <div className={`${styles["site--logo"]}`}>
                <Image
                  src="/images/logo.png"
                  width={100}
                  height={100}
                  alt="site logo"
                />
              </div>

              <div className={`${styles["dashbaord-left-secs"]}`}>
                <ul>
                  <li>Leads</li>
                  <li>Settings</li>
                </ul>
              </div>
            </div>
            <div className={`${styles["dashbaord-admin-block"]}`}>
              <span>A</span>
              <h5>Admin</h5>
            </div>
          </div>
          <div className={`${styles["dashbaord-right"]}`}>
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
                      <Loader />
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
                          {new Date(item.submittedAt).toLocaleDateString()}
                        </td>
                        <td>{item?.status}</td>
                        <td>{item?.country}</td>
                        <td>
                          {item.status === "Pending" || item.status === "PENDING" ? (
                            <button onClick={() => handleStatusUpdate(item.id)} className={`${styles["btn-update"]}`}>
                              Mark as Reached Out
                            </button>
                          ) : (
                            <span>✅</span>
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
    </section>
  );
}
