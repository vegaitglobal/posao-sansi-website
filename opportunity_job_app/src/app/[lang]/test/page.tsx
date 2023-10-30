// TODO: remove this file (page) before completing the project

import { ENV } from "@/data/env";
import { ReactElement } from "react";


export default function TestPage() {
  const renderEnvItem = (key: string, value: string | Object): ReactElement => {
    return (
      <p style={ { padding: "10px 20px" } } key={ key }>
        { key } (<span style={ typeof value !== "string" ? { color: "red" } : {} }>{ typeof value }</span>):
        &quot;{ value.toString() }&quot;
        [{ value ? <span style={ { color: "green" } }>truthy</span> : <span style={ { color: "red" } }>falsy</span> }]
      </p>
    );
  };

  return Object.entries(ENV).map(([ key, value ]) => renderEnvItem(key, value));
}
