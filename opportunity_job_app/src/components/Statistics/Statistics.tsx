import "./Statistics.scss";

type Employee = {
  number: number;
  text: string;
  type: "employee" | "employer";
};

const statisticsData: Employee[] = [
  { number: 23, text: "potražioci posla", type: "employee" },
  { number: 45, text: "poslodavaca", type: "employer" },
];

const Statistics = () => {
  return (
    <div className="statistics">
      <div className="statistics__container">
        <h3 className="statistics__title">KORISNICI NAŠE APLIKACIJE</h3>
        <div className="statistics__holder">
          {statisticsData.map((data, index) => (
            <div key={index} className="statistics__box">
              <span className="statistics__box-number">{data.number}</span>
              <span className="statistics__box-text p">{data.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;