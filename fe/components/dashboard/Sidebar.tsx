"use client";

import { useEffect, useState } from "react";
import { LogOut, Trash2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "sonner";
import DashLoader from "../loaders/DashLoader";

interface ChatSession {
  id: string;
  date: string;
  chats: {
    id: string;
    prompt: string;
    responce: string;
    genUrl: string;
  }[];
}

// Fake data
// const fakeChatSessions: ChatSession[] = Array.from({ length: 20 }).map((_, i) => ({
//   id: `${i + 1}`,
//   date: `2023-03-${(i + 1).toString().padStart(2, "0")}`,
//   chats: [
//     {
//       id: `${i + 1}`,
//       prompt: `What is the capital of Country #${i + 1}?`,
//       responce: `Capital #${i + 1}`,
//       genUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     },
//   ],
// }));

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function Sidebar() {
  const { data: session } = useSession();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_BASE_URL}/sessions`, {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setChatSessions(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        toast.error("Failed to load chat sessions");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.accessToken) {
      fetchSessions();
    }
  }, [session?.user?.accessToken]);

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove from fake data
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    toast.success("Session deleted successfully");
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="h-full bg-neutral-800 border-r border-neutral-800 flex flex-col md:min-w-64">
      
      {/* Sessions */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-sm font-semibold text-neutral-300">Sessions</h3>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="scale-75">
              <DashLoader />
            </div>
          </div>
        ) : chatSessions.length > 0 ? (
          chatSessions.map((session) => (
            <Link
              key={session.id}
              href={`/dashboard/${session.id}`}
              className="flex items-center justify-between p-2 rounded-md bg-neutral-700 hover:bg-neutral-600 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  {session.chats[0]?.prompt || "New Session"}
                </p>
                <p className="text-xs text-neutral-400">
                  {new Date(session.date).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => handleDeleteSession(session.id, e)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Link>
          ))
        ) : (
          <p className="text-sm text-neutral-400">No sessions found.</p>
        )}
      </div>

      {/* User Info */}
      <div className="p-1 px-2 border-b border-neutral-800">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{session?.user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="p-2 border-t border-neutral-800">
        <Button
          className="w-full justify-start text-neutral-200 border border-neutral-700 bg-neutral-800 hover:bg-neutral-800"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
