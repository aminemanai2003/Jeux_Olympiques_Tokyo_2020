'use client';

export default function PowerBIEmbed() {
  return (
    <div className="w-full" style={{ height: '600px' }}>
      <iframe
        title="Olympics"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/reportEmbed?reportId=d93535cb-c56f-47c2-b958-bc45f1a323cd&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"
        frameBorder="0"
        allowFullScreen={true}
        className="rounded-lg"
      />
    </div>
  );
}
