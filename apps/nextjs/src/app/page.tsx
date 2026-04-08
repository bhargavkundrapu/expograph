import { redirect } from 'next/navigation';

/** Root URL always sends visitors to the ExpoGraph product deck. */
export default function HomePage() {
  redirect('/presentation');
}
