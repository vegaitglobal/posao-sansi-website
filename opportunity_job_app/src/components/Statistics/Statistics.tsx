"use client"

import "./Statistics.scss";
import { useEffect, useState } from "react";
import { StatisticService } from "@/api/statisticService";


const Statistics = () => {
    const [applicantCount, setApplicantCount] = useState<number>(0)
    const [employerCount, setEmployerCount] = useState<number>(0)

    useEffect(() => {
        async function getStatistics() {
            const statistics = await StatisticService.getStatistics()
            setApplicantCount(statistics.applicant_count)
            setEmployerCount(statistics.employer_count)
        }

        getStatistics()
    }, []);

    return (
        <div className="statistics">
            <div className="statistics__container">
                <h3 className="statistics__title">KORISNICI NAŠE APLIKACIJE</h3>
                <div className="statistics__holder">
                    <div className="statistics__box">
                        <span className="statistics__box-number">{ applicantCount }</span>
                        <span className="statistics__box-text p">aplikanata</span>
                    </div>
                    <div className="statistics__box">
                        <span className="statistics__box-number">{ employerCount }</span>
                        <span className="statistics__box-text p">poslodavaca</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;