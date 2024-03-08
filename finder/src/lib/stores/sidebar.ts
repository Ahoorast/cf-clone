import { writable } from "svelte/store";

type SidebarOpts = {
    problem?: {
        title: string,
        statement: string,
    }
}

export const sidebar = writable<SidebarOpts>({});
