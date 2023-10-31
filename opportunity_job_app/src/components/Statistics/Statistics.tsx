"use client";

import "./Statistics.scss";
import { useDictionary } from "@/hooks/useDictionary";

interface StatisticsProps {
  applicantCount: number;
  employerCount: number;
}

const Statistics = ({ applicantCount, employerCount }: StatisticsProps) => {
  const { dict } = useDictionary();

  return (
    <div className="statistics">
      <div className="statistics__container">
        <h3 className="statistics__title">{ dict.statistics.title }</h3>
        <div className="statistics__holder">
          <div className="statistics__box">
            <span className="statistics__box-text">{ dict.statistics.applicantsLabel }</span>
            <span className="statistics__box-number">{ applicantCount }</span>
          </div>
          <div className="statistics__box">
            <span className="statistics__box-text">{ dict.statistics.employerLabel }</span>
            <span className="statistics__box-number">{ employerCount }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
