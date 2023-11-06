interface HeadProps {
  title: string;
  description?: string;
}

export default function Head({ title, description }: HeadProps) {
  return (
    <head>
      <title>{ title }</title>
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico"/>
      { description && <meta name="description" content={ description }/> }
    </head>
  );
}
