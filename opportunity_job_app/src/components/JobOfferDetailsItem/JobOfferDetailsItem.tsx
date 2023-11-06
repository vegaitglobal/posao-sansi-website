import "./job-offer-details-item.scss";

interface JobOfferDetailsItemProps {
  label: string;
  value: string;
  url?: string;
  isColumn?: boolean;
}

export default function JobOfferDetailsItem({ label, value, url, isColumn }: JobOfferDetailsItemProps) {
  return (
    <div className={ isColumn ? "job-offer__column-field" : "job-offer__row-field" }>
      <p className={ isColumn ? "job-offer__column-field-label" : "job-offer__row-field-label" }>
        { label }
      </p>
      { url ? (
        <a className="job-offer__field-value" href={ url }>{ value }</a>
      ) : (
        <p className="job-offer__field-value">{ value }</p>
      ) }
    </div>
  );
}
