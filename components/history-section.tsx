"use client";

import { useState, useRef, useEffect } from "react";
import { Session } from "@/services/name-ai/types";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquare, Search, Plus, Trash2 } from "lucide-react";
import { isToday, isYesterday, isSameYear, isSameMonth } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useSessions, useDeleteSession } from "@/lib/queries/chat-queries";
import { cn } from "@/lib/utils";

type GroupedSessions = {
  recent: Session[];
  today: Session[];
  yesterday: Session[];
  thisMonth: Session[];
  older: Session[];
};

// Client Component for the search functionality
function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const router = useRouter();

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  return (
    <div className="px-2 sticky top-2 z-10 pb-6 space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            ref={searchInputRef}
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-zinc-800/50 border-zinc-700 text-zinc-200 placeholder:text-zinc-400"
          />
        </div>
        <Button
          onClick={() => router.push("/")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Client Component for session groups
function SessionGroup({
  sessions,
  title,
}: {
  sessions: Session[];
  title: string;
}) {
  const { mutate: deleteSession, isPending } = useDeleteSession();
  const router = useRouter();
  const pathname = usePathname();

  if (sessions.length === 0) return null;

  const handleDelete = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    deleteSession(sessionId);
  };

  const handleSessionClick = (sessionId: string) => {
    router.push(`/chat/${sessionId}`);
  };

  const truncateMessage = (message: string) => {
    if (!message) return "New chat";
    if (message.length <= 25) return message;
    return `${message.substring(0, 25).trim()}...`;
  };

  return (
    <div key={title} className="space-y-1">
      <h3 className="px-2 py-2 text-sm font-medium text-zinc-400 uppercase">
        {title}
      </h3>
      <div className="space-y-1">
        {sessions.map((session) => (
          <div
            key={session.session_id}
            onClick={() => handleSessionClick(session.session_id)}
            className={cn(
              "group/session flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors cursor-pointer",
              pathname === `/chat/${session.session_id}`
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-zinc-200 hover:bg-zinc-800/50"
            )}
          >
            <MessageSquare
              className={cn(
                "h-4 w-4 flex-shrink-0",
                pathname === `/chat/${session.session_id}`
                  ? "text-primary"
                  : "text-zinc-400"
              )}
            />
            <span className="truncate flex-1 text-left">
              {truncateMessage(session.first_message || "")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover/session:opacity-100 hover:bg-red-500/10 cursor-pointer hover:text-red-500"
              onClick={(e) => handleDelete(e, session.session_id)}
              disabled={isPending}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Client Component
export function HistorySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: sessions = [], isLoading } = useSessions(debouncedSearchQuery);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  const groupSessions = (sessions: Session[]): GroupedSessions => {
    const now = new Date();
    return sessions.reduce(
      (acc: GroupedSessions, session) => {
        if (!session.first_message_time) {
          acc.recent.push(session);
          return acc;
        }

        const date = new Date(session.first_message_time);
        if (isToday(date)) {
          acc.today.push(session);
        } else if (isYesterday(date)) {
          acc.yesterday.push(session);
        } else if (isSameMonth(date, now) && isSameYear(date, now)) {
          acc.thisMonth.push(session);
        } else {
          acc.older.push(session);
        }
        return acc;
      },
      { recent: [], today: [], yesterday: [], thisMonth: [], older: [] }
    );
  };

  if (isInitialLoad) {
    return (
      <div className="space-y-2 p-2">
        <div className="h-8 w-full animate-pulse rounded bg-zinc-800" />
        <div className="h-8 w-full animate-pulse rounded bg-zinc-800" />
        <div className="h-8 w-full animate-pulse rounded bg-zinc-800" />
      </div>
    );
  }

  const groupedSessions = groupSessions(sessions);

  return (
    <div className="space-y-4">
      <SearchBar onSearch={setSearchQuery} />
      <div className="overflow-y-auto">
        <SessionGroup sessions={groupedSessions.recent} title="Recent" />
        <SessionGroup sessions={groupedSessions.today} title="Today" />
        <SessionGroup sessions={groupedSessions.yesterday} title="Yesterday" />
        <SessionGroup sessions={groupedSessions.thisMonth} title="This Month" />
        <SessionGroup sessions={groupedSessions.older} title="Older" />
      </div>
    </div>
  );
}
