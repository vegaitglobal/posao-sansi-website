import "./Statistics.scss";

type Employees = {
 number: number;
 text: string;
};

type Employeers = {
 number: number;
 text: string;
};

const employees: Employees[] = [
 { number: 23, text: "potražioci posla" },
];

const employeers: Employeers[] = [{ number: 45, text: "poslodavaca" }];

const Statistics = () => {
 return (
    <div className="statistics">
        <div className="statistics__container">
            <h3 className="statistics__title">KORISNICI NAŠE APLIKACIJE</h3>
            <div className="statistics__holder">
                {employees.map((employee, index) => (
                <div key={index}  className="statistics__box">
                    <span className="statistics__box-number">{employee.number}</span>
                    <span className="statistics__box-text p">{employee.text}</span>
                </div>
                 ))}
                 {employeers.map((employer, index) => (
                <div key={index} className="statistics__box">
                    <span className="statistics__box-number">{employer.number}</span>
                    <span className="statistics__box-text p">{employer.text}</span>
                </div>
                ))}
            </div>
        </div>
    </div>
 );
}
export default Statistics;