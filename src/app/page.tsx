import { LinktreePage } from '@/components/LinktreePage';
import { getLinksMain } from '@/lib/contentful';

export default async function Home() {
  const linksMain = await getLinksMain();

  if (!linksMain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Links Found
          </h1>
          <p className="text-gray-600">
            Please check your Contentful configuration.
          </p>
        </div>
      </div>
    );
  }

  return <LinktreePage linksMain={linksMain} />;
}
