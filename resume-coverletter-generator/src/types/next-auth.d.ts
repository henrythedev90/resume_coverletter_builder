import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email?: string | null;
      name?: string | null;
    };
  }
}
