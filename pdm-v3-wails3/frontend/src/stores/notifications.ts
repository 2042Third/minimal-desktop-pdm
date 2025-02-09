import { writable } from 'svelte/store';
import {
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  Loader,
  X
} from 'lucide-svelte';
import type {Component} from 'svelte';

export type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'progress';

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
  actions?: NotificationAction[];
  progress?: number;
  icon: Component; // Add icon component directly to the notification
}

// Map of notification types to their respective icons
const typeToIcon: Record<NotificationType, Component> = {
  // @ts-ignore
  success: CheckCircle,
  // @ts-ignore
  error: XCircle,
  // @ts-ignore
  info: Info,
  // @ts-ignore
  warning: AlertTriangle,
  // @ts-ignore
  progress: Loader
};

function createNotificationStore() {
  const { subscribe, update } = writable<Notification[]>([]);

  return {
    subscribe,
    add: (notification: Omit<Notification, 'id' | 'icon'>) => {
      const id = crypto.randomUUID();
      const icon = typeToIcon[notification.type];

      update(notifications => [
        ...notifications,
        { ...notification, id, icon }
      ]);

      if (notification.duration) {
        setTimeout(() => {
          remove(id);
        }, notification.duration);
      }
      return id;
    },
    updateProgress: (id: string, progress: number) => {
      update(notifications =>
        notifications.map(n =>
          n.id === id ? { ...n, progress } : n
        )
      );
    },
    remove: (id: string) => {
      update(notifications => notifications.filter(n => n.id !== id));
    }
  };
}

function remove(id: string) {
  notifications.remove(id);
}

export const notifications = createNotificationStore();
