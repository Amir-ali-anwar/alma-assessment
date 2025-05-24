"use client";
import { useRouter } from "next/navigation";
import styles from "./dashbaord.module.scss";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import Button from "@/app/shared/Button/Button";
import { useEffect, useState } from "react";

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
  const logout = () => {
    document.cookie = "token=; max-age=0; path=/"; // clear cookie
    router.push("/login");
  };

  return (
    <section className={`${styles["dashbaord-main"]}`}>
      <div className="container">
        <div className={`${styles["dashbaord-inner"]}`}>
          <div className={`${styles["dashbaord-left"]}`}>
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
            <div className={`${styles["dashbaord-admin-block"]}`} >
                <span>A</span>
                <h5>Admin</h5>
            </div>
          </div>
          <div className={`${styles["dashbaord-right"]}`}>
            <div className={`${styles["dashbaord-info-sec"]}`}>
              <h4>Leads</h4>
              <div className={`${styles["dashbaord_info-search"]}`}>
                <form action="">
                  <div  className={`${styles["search-input"]}`}>
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
                    <th>Name</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{new Date(item.submittedAt).toLocaleDateString()}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
