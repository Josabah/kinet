import { useId } from 'react';
import { cn } from '@/lib/utils';

type BrandIconProps = { className?: string };

/** Stripe app icon — purple squircle with white slanted mark */
export const StripeIcon = ({ className }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5.5" fill="#635BFF" />
    <path
      fill="#FFFFFF"
      d="M7.25 16.25 8.1 8.75 15.9 10.1 15.05 17.6 Z"
    />
  </svg>
);

/** REST API — cloud + gear mark */
export const RestApiIcon = ({ className }: BrandIconProps) => (
  <img
    src="/icons/rest-api.png"
    alt=""
    className={cn(className, 'object-contain')}
    aria-hidden
    draggable={false}
  />
);

/** CI/CD — interlocking infinity loops with CI / CD labels (monochrome, thin stroke) */
export const CiCdIcon = ({ className }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    {/* Left loop — CI */}
    <path
      d="M 12 12 C 12 5.1, 3.9 5.1, 3.9 12 C 3.9 18.9, 12 18.9, 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Right loop — CD */}
    <path
      d="M 12 12 C 12 18.9, 20.1 18.9, 20.1 12 C 20.1 5.1, 12 5.1, 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <text
      x="8.05"
      y="12.45"
      textAnchor="middle"
      fontSize="3"
      fontWeight="600"
      fill="currentColor"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      CI
    </text>
    <text
      x="15.95"
      y="12.45"
      textAnchor="middle"
      fontSize="3"
      fontWeight="600"
      fill="currentColor"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      CD
    </text>
  </svg>
);

export const CloudflareIcon = ({ className }: BrandIconProps) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.16 23h21.177v-5.86l-4.023-2.307-.694-.3-16.46.113z"
      fill="#fff"
    />
    <path
      d="M22.012 22.222c.197-.675.122-1.294-.206-1.754-.3-.422-.807-.666-1.416-.694l-11.545-.15c-.075 0-.14-.038-.178-.094s-.047-.13-.028-.206c.038-.113.15-.197.272-.206l11.648-.15c1.38-.066 2.88-1.182 3.404-2.55l.666-1.735a.38.38 0 0 0 .02-.225c-.75-3.395-3.78-5.927-7.4-5.927-3.34 0-6.17 2.157-7.184 5.15-.657-.488-1.5-.75-2.392-.666-1.604.16-2.9 1.444-3.048 3.048a3.58 3.58 0 0 0 .084 1.191A4.84 4.84 0 0 0 0 22.1c0 .234.02.47.047.703.02.113.113.197.225.197H21.58a.29.29 0 0 0 .272-.206l.16-.572z"
      fill="#F38020"
    />
    <path
      d="M25.688 14.803l-.32.01c-.075 0-.14.056-.17.13l-.45 1.566c-.197.675-.122 1.294.206 1.754.3.422.807.666 1.416.694l2.457.15c.075 0 .14.038.178.094s.047.14.028.206c-.038.113-.15.197-.272.206l-2.56.15c-1.388.066-2.88 1.182-3.404 2.55l-.188.478c-.038.094.028.188.13.188h8.797a.23.23 0 0 0 .225-.169A6.41 6.41 0 0 0 32 21.106a6.32 6.32 0 0 0-6.312-6.302"
      fill="#FAAE40"
    />
  </svg>
);

/** Google Play colorful triangle — play.google.com brand mark */
export const GooglePlayIcon = ({ className }: BrandIconProps) => (
  <svg viewBox="30 336.7 120.9 129.2" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FFD400"
      d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
    />
    <path
      fill="#FF3333"
      d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
    />
    <path
      fill="#32A071"
      d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
    />
    <path
      fill="#3BCCFF"
      d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
    />
  </svg>
);

/** App Store blue icon — Apple App Store (iOS) marketing asset */
export const AppStoreIcon = ({ className }: BrandIconProps) => {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 800 800" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="400.05"
          y1="798.7717"
          x2="400.05"
          y2="-1.2283"
          gradientTransform="matrix(1 0 0 -1 0 798.7717)"
        >
          <stop offset="0" stopColor="#18BFFB" />
          <stop offset="1" stopColor="#2072F3" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M638.4,0H161.6C72.3,0,0,72.3,0,161.6v476.9C0,727.7,72.3,800,161.6,800h476.9c89.2,0,161.6-72.3,161.6-161.6V161.6C800,72.3,727.7,0,638.4,0z"
      />
      <path
        fill="#FFFFFF"
        d="M396.6,183.8l16.2-28c10-17.5,32.3-23.4,49.8-13.4s23.4,32.3,13.4,49.8L319.9,462.4h112.9c36.6,0,57.1,43,41.2,72.8H143c-20.2,0-36.4-16.2-36.4-36.4c0-20.2,16.2-36.4,36.4-36.4h92.8l118.8-205.9l-37.1-64.4c-10-17.5-4.1-39.6,13.4-49.8c17.5-10,39.6-4.1,49.8,13.4L396.6,183.8L396.6,183.8z M256.2,572.7l-35,60.7c-10,17.5-32.3,23.4-49.8,13.4S148,614.5,158,597l26-45C213.4,542.9,237.3,549.9,256.2,572.7L256.2,572.7z M557.6,462.6h94.7c20.2,0,36.4,16.2,36.4,36.4c0,20.2-16.2,36.4-36.4,36.4h-52.6l35.5,61.6c10,17.5,4.1,39.6-13.4,49.8c-17.5,10-39.6,4.1-49.8-13.4c-59.8-103.7-104.7-181.3-134.5-233c-30.5-52.6-8.7-105.4,12.8-123.3C474.2,318.1,509.9,380,557.6,462.6L557.6,462.6z"
      />
    </svg>
  );
};
