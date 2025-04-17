// // app/providers.tsx
// "use client";

// import { SessionProvider } from "next-auth/react";
// import { SearchProvider } from "./components/SearchContext";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider>
//       <SearchProvider>
//         {children}
//       </SearchProvider>
//     </SessionProvider>
//   );
// }


// // app/providers.tsx
// 'use client';

// import { SessionProvider } from "next-auth/react";
// import { ReactNode } from "react";

// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <SessionProvider>
//       {children}
//     </SessionProvider>
//   );
// }


'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SearchProvider } from "./components/SearchContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </SessionProvider>
  );
}
