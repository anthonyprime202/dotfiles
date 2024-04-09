
const Hyprland = await Service.import("hyprland");
const workspaceCount = 10;

// Each workspace button
const WorkspaceButton = (i: number) =>
    Widget.Button({
        setup: (self) => {
            self.hook(
                Hyprland,
                () => {
                    // Checks if the workspace as clients
                    const workspace = Hyprland.getWorkspace(i);
                    self.toggleClassName("active-workspace", Boolean(workspace?.windows));
                },
                "changed",
            );
        },

        // Add focused class if workspace is focused
        className: Hyprland.active.workspace
            .bind("id")
            .transform((id) => `${id === i ? "focused" : ""}`),

        // shape inside the workspace button
        child: Widget.Box({
            hpack: "center",
            vpack: "center",
        }),

        onPrimaryClick: async () =>
            await Hyprland.messageAsync(`dispatch workspace ${i}`).catch(printerr),
    });

export default () =>
    Widget.Box({

        // Make workspaces according to `workspaceCount`
        children: Array.from(
            { length: workspaceCount },
            (_, i) => i + 1,
        ).map((i) => WorkspaceButton(i)),
    });
