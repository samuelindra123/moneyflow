declare namespace Express {
  interface User {
    id: string;
    email: string;
    username?: string | null;
    full_name?: string | null;
    avatar_url?: string | null;
    age?: number | null;
    onboarding_complete: boolean;
    onboarding_step: string;
  }
}
