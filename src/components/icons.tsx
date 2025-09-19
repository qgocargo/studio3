import type { SVGProps } from 'react';

export function QgoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
        fill="currentColor"
      />
      <path
        d="M128,72a56,56,0,1,0,56,56A56,56,0,0,0,128,72Zm0,96a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"
        fill="currentColor"
        opacity="0.5"
      />
      <line
        x1="184"
        y1="184"
        x2="224"
        y2="224"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}
