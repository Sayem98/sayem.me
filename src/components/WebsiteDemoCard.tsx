import { ExternalLink } from "lucide-react";

interface Props {
  demoUrl: string;
}

const WebsiteDemoCard = ({ demoUrl }: Props) => {
  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border group shadow-sm">
      {/* Iframe preview */}
      <iframe
        src={demoUrl}
        loading="lazy"
        className="absolute inset-0 w-full h-full pointer-events-none scale-[1.01]"
        style={{ filter: "brightness(0.85) saturate(0.9)" }}
        title="Website Preview"
      />

      {/* Gradient overlay always visible at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Hover overlay with CTA */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-100 transition shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} />
          Visit Site
        </a>
      </div>

      {/* Default hint label */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1 text-white/60 text-xs group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
        <ExternalLink size={10} />
        <span>Live preview</span>
      </div>
    </div>
  );
};

export default WebsiteDemoCard;
