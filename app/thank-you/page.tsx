import Button from "../shared/Button/Button";
import styles from "./thankyou.module.scss";
export default function ThankYouPage() {
  return (
    <div className={`${styles["thankyou__main"]}`}>
      <div className="container">
      <div className={`${styles["icon"]}`}>
        <img src="./images/icon.png" alt="" />
      </div>
      <div className={`${styles["thankyou--textset"]}`}>
        <h3>Thank you</h3>
        <p>
          Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.
        </p>
      </div>
    </div>
    <Button className={`${styles['btn-submit']}`}>Go Back to Homepage</Button>
    </div>
  );
}
