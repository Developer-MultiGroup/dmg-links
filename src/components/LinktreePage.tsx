import Image from 'next/image';
import { LinkButton } from './LinkButton';
import type { LinksMain } from '@/types/contentful';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface LinktreePageProps {
  linksMain: LinksMain;
}

export function LinktreePage({ linksMain }: LinktreePageProps) {
  const { title, bio, avatar, instagram, linkedIn, twitter, youtube, links } = linksMain.fields;
  
  const pageStyle = {
    backgroundColor: '#f8fafc',
    color: '#1f2937',
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start py-8 px-4"
      style={pageStyle}
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-8">
          {avatar?.fields && (
            <div className="mb-4">
              <Image
                src={`https:${avatar.fields.file.url}`}
                alt={avatar.fields.title}
                width={120}
                height={120}
                className="rounded-full mx-auto border-4 border-white shadow-lg"
                priority
              />
            </div>
          )}
          
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {bio && (
            <p className="text-lg opacity-80 mb-4">{bio}</p>
          )}

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-6">
            {instagram && (
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors duration-200">
                <FaInstagram size={24} />
              </a>
            )}
            {linkedIn && (
              <a href={`https://linkedin.com/in/${linkedIn}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <FaLinkedin size={24} />
              </a>
            )}
            {twitter && (
              <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors duration-200">
                <FaXTwitter size={24} />
              </a>
            )}
            {youtube && (
              <a href={`https://youtube.com/@${youtube}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                <FaYoutube size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-2">
          {links
            .filter(link => link.fields.active)
            .sort((a, b) => a.fields.displayOrder - b.fields.displayOrder)
            .map((link) => (
              <LinkButton
                key={link.sys.id}
                link={link}
                theme={{
                  backgroundColor: '#ffffff',
                  textColor: '#000000',
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
