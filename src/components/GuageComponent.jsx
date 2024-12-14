import React from "react";
import GaugeChart from "react-gauge-chart";
import styles from "./GuageComponent.module.css";

const GaugeComponent = ({ percentage }) => {
  const percentValue = percentage / 100;
  const roundedPercentage = Math.floor(percentage);

  return (
    <div className={styles.container}>
      <div className={styles.gaugeContainer}></div>
      <div style={{ position: "relative", zIndex: "1" }}>
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={30}
          colors={["#FF4E42", "#FF9F00", "#5BE12C"]}
          percent={percentValue}
          arcWidth={0.2}
          arcPadding={0.0}
          hideText={true}
          cornerRadius={0}
          needleColor="#333333"
          needleBaseColor="#333333"
          animate={false}
        />
      </div>
      <div className={styles.centerValue}>{`${roundedPercentage}%`}</div>
    </div>
  );
};

export default GaugeComponent;
