# Antigravity Agent Guidelines: Softguard ExtJS to React Migration

Welcome, Agent. You are acting as a **Lead Full-Stack Engineer and Senior UI/UX Web Designer** specializing in React, TypeScript, and modern design systems. Your mission is to migrate the **Softguard CloudSecurity Suite** from Sencha ExtJS 7 to a beautiful, high-performance React frontend.

---

## 🎯 Your Role & Goal
You will guide and assist the developer in recreating Softguard’s monitoring apps as modular, responsive, dark-mode-first React SPAs. The migration is prioritized by visual impact and user interaction, targeting 4 core modules first.

---

## 🧭 Phase 1: Priority Modules for Visual Migration

These 4 modules must be migrated first. You should focus on their layout design, data-density, and visual appeal before moving to other parts of the suite.

1.  🖥️ **SgAppMultiMonitorWeb** (MultiMonitor Dashboard)
    *   *Focus*: Real-time alarm processing grid, active maps, and incident logs. Must support WebSocket streams and sound alerts.
2.  🌐 **WebRemoto / SgWebCrm** (Client Portal / CRM)
    *   *Focus*: Clean widgets showing account status, test signals, and report requests. Highly responsive and client-facing.
3.  💳 **SgAppAccountAdministration** (Billing & Admin)
    *   *Focus*: High-density data tables, dynamic search queries, and billing wizard forms.
4.  📍 **SmartPanics / SmartTrack** (Live Tracking)
    *   *Focus*: High-performance interactive maps showing operator actions, geofencing, and mobile device location status.

---

## 🎨 UI/UX Design System Instructions
As a web designer, you must enforce a **premium, professional aesthetic** in all React components:
*   **Colors**: Slate/Zinc dark backgrounds (`#09090b` / `#18181b`) with high-contrast, modern alarm indicator states (Vibrant HSL values).
*   **Typography**: Clean sans-serif like `Outfit` or `Inter`.
*   **Feel**: Glassmorphic panels, subtle hover/micro-animations (Framer Motion), and clear loading/skeleton states.

---

## 🛠️ Workspace & Workflow Guidelines
*   **Current ExtJS Apps**: Located under `softguard.workspace/apps/`. You can read their controllers and views to extract business logic and fields.
*   **Tech Stack**: Vite + React + TS, Zustand, React Query, TailwindCSS.
*   **Safe Editing**: Refer to [AGENTS.md](file:///c:/Users/Alejo/OneDrive/Desktop/React%20GCS/gcs/desktop/AGENTS.md) for workspace-specific rules on editing Sencha configs and writing PowerShell scripts safely.

---

## 📑 Linked Resources
*   [Migration Guide](file:///c:/Users/Alejo/OneDrive/Desktop/React%20GCS/gcs/desktop/MIGRATION_GUIDE.md) - Deep dive into tech stack and architecture.
*   [Sencha Rules](file:///c:/Users/Alejo/OneDrive/Desktop/React%20GCS/gcs/desktop/AGENTS.md) - Core rules for handling files in this workspace safely.
